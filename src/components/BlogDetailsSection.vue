<template>
  <div class="blog-detail">
    <div class="container">
      <div class="result">
        <div class="result-top">
          <h2 class="title">{{ blog?.title }}</h2>
          <p class="tags">
            <span>{{ blog?.tags }}</span>
          </p>
          <div class="auth">
            <div class="img">
              <img :src="users[blog?.idUser]?.avatar" alt="" />
            </div>
            <div class="text">
              <div class="text-top">
                <span class="name">{{ users[blog?.idUser]?.name }}</span>
                | <span class="type">{{ blog?.industry }}</span>
              </div>
              <div class="date">{{ blog?.createdAt }}</div>
            </div>
          </div>
        </div>
        <div class="content-editor" ref="contentEle"></div>
        <div class="result-bottom">
          <div class="reaction">
            <span class="icon heart" @click="onReaction"
              ><i class="fas fa-heart"></i
              ><span>{{ blog?.reaction }}</span></span
            >
            <span class="icon comment"
              ><i class="fas fa-comment"></i
              ><span>{{ Object.keys(blog?.comments).length }}</span></span
            >
          </div>
          <div id="comments" class="lesson-detail">
            <form @submit.prevent="onComment" class="form-comment">
              <input
                v-model="comment"
                placeholder="Write your comment..."
                type="text"
                required
              />
              <button type="submit"><i class="fas fa-paper-plane"></i></button>
            </form>
            <div
              class="comment-group"
              v-if="Object.keys(blog?.comments).length > 0"
            >
              <div
                class="comment-item"
                v-for="(comment, key) in blog?.comments"
                :key="key"
              >
                <div class="comment-top">
                  <div class="comment-auth">
                    <h4>{{ comment?.auth }}</h4>
                  </div>
                  <span class="comment-time">{{ comment?.createdAt }}</span>
                </div>

                <div class="comment-text">
                  <p>
                    {{ comment?.comment }}
                  </p>
                </div>
              </div>
            </div>
            <div v-else>
              <small><i>Empty comments!</i></small>
            </div>
          </div>
          <div class="relate-blogs" v-if="Object.keys(blogsByAuth).length > 0">
            <h3>The others by Author</h3>
            <div class="relate-list">
              <Carousel :breakpoints="breakpointsblogs">
                <Slide v-for="(blogByAuth, key) in blogsByAuth" :key="key">
                  <div class="card-item">
                    <div class="thumbnail">
                      <img :src="blogByAuth.imgUrl" :alt="blogByAuth.title" />
                    </div>
                    <div class="card-right bg-primary">
                      <h3 class="multiline-ellipsis-1">
                        {{ blogByAuth.title }}
                      </h3>
                      <div>
                        <button @click="onReadMore(blogByAuth)">
                          Read more...
                        </button>
                      </div>
                    </div>
                  </div>
                </Slide>

                <template #addons>
                  <Navigation />
                  <Pagination />
                </template>
              </Carousel>
            </div>
          </div>
          <!-- <div class="relate-blogs">
            <h3>#Related</h3>
            <div class="relate-list">
              <Carousel :breakpoints="breakpointsblogs">
                <Slide v-for="slide in 10" :key="slide">
                  <div class="card-item">
                    <div class="thumbnail">
                      <img
                        src="/src/images/jackson-sophat-wUbNvDTsOIc-unsplash.jpg"
                        alt=""
                      />
                    </div>
                    <div class="card-right bg-primary">
                      <h3 class="multiline-ellipsis-1">
                        Lorem islem posile delao adipisicing elit!
                      </h3>
                      <p class="multiline-ellipsis-2">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Amet eos voluptatem iusto delectus, minus sapiente!
                        Distinctio atque dolore reprehenderit laboriosam? Sit et
                        possimus assumenda! Quas aspernatur dolore nulla cumque
                        odio.
                      </p>
                      <div class="card-auth">
                        <div class="wrapper-img">
                          <img src="/src/images/peep-82.png" alt="" />
                        </div>

                        <span>Jclahi</span>
                      </div>
                      <div><button>Read more...</button></div>
                    </div>
                  </div>
                </Slide>

                <template #addons>
                  <Navigation />
                  <Pagination />
                </template>
              </Carousel>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useBlogsStore } from "../composable/useBlogs";
import { useUserStore } from "../composable/useUser";
import { useUpdateBlogStore } from "../composable/useFirebaseStore";
const blogsStore = useBlogsStore();
const route: any = useRoute();
const userStore = useUserStore();
const users: any = userStore.users;
// console.log(route.params.id);
const blog = blogsStore.blogs[route.params.id];
const blogs = blogsStore.blogs;
const blogsByAuth = ref<any>({});
onMounted(() => {
  const content: any = document.querySelector(".content-editor");
  content.innerHTML = blogsStore.blogs[route.params.id].content;
  const images: any = content.querySelectorAll(".image-uploading");
  for (let i = 0; i < images.length; i++) {
    let children = images[i].querySelector("img");
    if (children != null) {
      children.src =
        blogsStore.blogs[route.params.id].images[children.classList.value];
    }
  }


  for (const key in blogs) {
    if (blogs[key].idUser === blog.idUser && key !== route.params.id) {
      blogsByAuth.value[key] = blogs[key];
    }
  }
});
const comment = ref("");
const onReaction = () => {
  blog.reaction += 1;
  useUpdateBlogStore({ reaction: blog.reaction }, route.params.id);
};
const onComment = () => {
  const data = ref({
    createdAt: new Date().toLocaleDateString(),
    auth: userStore.user.name,
    comment: comment.value,
    id: new Date().getTime() + userStore.user.name,
  });
  blog.comments[data.value.id] = data.value;
  useUpdateBlogStore({ comments: blog.comments }, route.params.id);
  comment.value = "";
};
const router = useRouter();
const onReadMore = (blog: any) => {
  router.push(`/blogs/${blog.id}`);
  setTimeout(() => {
    window.location.reload();
  }, 100);
};

const breakpointsblogs = ref({
  0: {
    itemsToShow: 1,
    snapAlign: "start",
    autoplay: 3000,
    pauseAutoplayOnHover: true,
  },
  534: {
    itemsToShow: 3,
    snapAlign: "start",
    autoplay: 3000,
    pauseAutoplayOnHover: true,
  },
  734: {
    itemsToShow: 3,
    snapAlign: "start",
    autoplay: 3000,
    pauseAutoplayOnHover: true,
  },
  1024: {
    autoplay: 4000,
    itemsToShow: 3,
    pauseAutoplayOnHover: true,
    snapAlign: "start",
  },
});
</script>

<style lang="scss" scoped>
.blog-detail {
  padding: 0.8rem;
  padding-top: 2rem;
  .result {
    max-width: 889px;
    margin: 0 auto;
    .result-top {
      margin-top: 1rem;
      .title {
        font-size: 3rem;
        letter-spacing: 1.5px;
        line-height: 3.3rem;
      }
      .tags {
        span {
          font-size: 0.8rem;
        }
      }
      .auth {
        margin: 2rem 0;
        display: flex;
        align-items: center;
        .img {
          padding: 0.2rem;

          border: 1px solid;
          border-radius: 50%;
          img {
            padding-bottom: 0.3rem;
            width: 40px;
            height: 40px;
            object-fit: cover;
          }
        }
        .text {
          padding-left: 0.5rem;
          .text-top {
            display: flex;
            align-items: center;
            span {
              padding: 0 0.2rem;
            }
            .name {
              font-weight: bold;
              font-size: 1.1rem;
            }
            .type {
              font-weight: 400;
              font-size: 0.9rem;
            }
          }
          .date {
            padding: 0 0.2rem;
            font-size: 0.7rem;
            opacity: 0.7;
          }
        }
      }
    }
    .empty-post {
      font-style: italic;
      margin-bottom: 1rem;
      opacity: 0.7;
    }
    .content-editor {
      margin-bottom: 1rem;
      margin-left: 0.2rem;
    }
    .result-bottom {
      .reaction {
        display: flex;
        align-items: center;
        span.icon {
          padding: 0.3rem 0.5rem;
          cursor: pointer;
          span {
            padding: 0 0.3rem;
          }
        }
        .heart {
          i {
            color: red;
          }
        }
        .comment {
          i {
            color: aqua;
          }
        }
      }
      .relate-blogs {
        margin: 1rem 0;
        .card-item {
          display: flex;
          flex-direction: column;
          cursor: pointer;
          padding-bottom: 2rem;
          padding-top: 0;
          .thumbnail {
            width: 100%;
            height: 100%;
            padding: 0.5rem;
            border-radius: 5px;
            overflow: hidden;
            filter: grayscale(1);
            img {
              transition: all 0.9s ease;

              object-fit: cover;
              width: 100%;
              min-height: 180px;
              height: 100%;
              border-radius: 5px;
            }
          }
          .card-right {
            width: 100%;
            text-align: start;
            transition: all 0.8s ease;
            padding: 0 1rem;
            h3 {
              font-size: 1.3rem;
              line-height: 1.8rem;
              margin-bottom: 0.2rem;
            }
          }
        }
        .card-item:hover .card-right {
          transform: translateY(1.5rem);
          border-radius: 5px;
        }
        .card-item:hover .thumbnail {
          filter: grayscale(0);
        }
      }
    }
    #comments {
      .form-comment {
        border: 1px solid;
        border-left: 1px solid;
        border-bottom: 3px solid;
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0.6rem 0.2rem;
        margin-top: 1rem;
        border-radius: 5px;
        input {
          background-color: transparent;
          border: none;
          outline: none;
          width: 90%;
          color: inherit;
          padding-left: 0.5rem;
          font-size: 0.8rem;
        }
        button {
          margin: 0;
          background-color: transparent;
          border: none;
          i {
            font-size: 1rem;
          }
        }
      }
      .comment-group {
        .comment-item {
          background-color: var(--bg-secondary);
          padding: 1rem;
          border-radius: 5px;
          margin: 1rem 0;
          .comment-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .comment-time {
              font-size: 0.6rem;
              opacity: 0.8;
            }
          }
          .comment-text {
            margin: 0.3rem 0;
            padding: 1rem;
            border-radius: 5px;
            border: 1px solid;
            p {
              font-size: 0.8rem;
            }
          }
          .comment-react {
            margin-left: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            div {
              display: flex;
              align-items: center;
            }
            i {
              color: red;
              margin-right: 0.2rem;
            }
            span {
              font-size: 0.8rem;
              font-weight: bold;
              margin-right: 0.4rem;
              opacity: 0.7;
            }
            span:hover {
              opacity: 1;
              cursor: pointer;
            }
          }
          .comment-reply {
            margin-left: 1rem;
            .comment-item {
              background-color: var(--bg-reply);
              padding: 0.5rem 1rem;
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 534px) {
  .title {
    font-size: 2.4rem !important;
  }
}
</style>

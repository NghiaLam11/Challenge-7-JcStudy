<template>
  <div class="blog-detail">
    <div class="container">
      <div class="result">
        <div class="result-top">
          <h2 class="title">{{ blog.title }}</h2>
          <p class="tags">
            <span>{{ blog.tags }}</span>
          </p>
          <div class="auth">
            <div class="img">
              <img :src="users[blog.idUser].avatar" alt="" />
            </div>
            <div class="text">
              <div class="text-top">
                <span class="name">{{ users[blog.idUser].name }}</span>
                | <span class="type">{{ blog.industry }}</span>
              </div>
              <div class="date">{{ blog.createdAt }}</div>
            </div>
          </div>
        </div>
        <div class="content-editor" ref="contentEle"></div>
        <div class="result-bottom">
          <div class="reaction">
            <span class="icon heart"
              ><i class="fas fa-heart"></i><span>1</span></span
            >
            <span class="icon comment"
              ><i class="fas fa-comment"></i><span>1</span></span
            >
          </div>
          <div class="relate-blogs">
            <h3>The others by Author</h3>
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
          </div>
          <div class="relate-blogs">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useBlogsStore } from "../composable/useBlogs";
import { useUserStore } from "../composable/useUser";
const blogsStore = useBlogsStore();
const route: any = useRoute();
const userStore = useUserStore();
const users: any = userStore.users;
// console.log(route.params.id);
const blog = computed(() => {
  return blogsStore.unApprovedBlogs[route.params.id];
});

onMounted(() => {
  const content: any = document.querySelector(".content-editor");
  console.log(content, "After");
  content.innerHTML = blogsStore.unApprovedBlogs[route.params.id].content;
  const images: any = content.querySelectorAll(".image-uploading");
  for (let i = 0; i < images.length; i++) {
    let children = images[i].querySelector("img");
    if (children != null) {
      console.log(children.classList.value, "CHILD");
      children.src =
        blogsStore.unApprovedBlogs[route.params.id].images[
          children.classList.value
        ];
    }
  }
});

const breakpointsblogs = ref({
  0: {
    itemsToShow: 1,
    snapAlign: "start",
    autoplay: 3000,
    pauseAutoplayOnHover: true,
  },
  534: {
    itemsToShow: 2,
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
            p {
              font-size: 0.8rem;
              line-height: 1.2rem;
              opacity: 0.7;
            }

            .card-auth {
              display: inline-flex;
              align-items: center;
              padding: 0.2rem;
              margin: 0.5rem 0;
              .wrapper-img {
                width: 35px;
                height: 35px;
                padding: 0.2rem;
                position: relative;
                padding-bottom: 0.4rem;
                img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                  transition: all 0.35s ease;
                }
              }

              .wrapper-img::after {
                content: "";
                position: absolute;
                z-index: 2;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                scale: 1.03;
                border-radius: 50%;
                border: 1px dashed;
                transition: all 0.35s ease;
              }
              span {
                margin-left: 0.3rem;
                font-weight: bold;
                font-size: 1.1rem;
              }
            }
            .card-auth:hover .wrapper-img img {
              scale: 1.05;
            }
            .card-auth:hover .wrapper-img::after {
              scale: 1.1;
              animation: spinAni 10s ease-in-out infinite;
            }
            @keyframes spinAni {
              from {
                transform: rotate(0);
              }
              to {
                transform: rotate(360deg);
              }
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
  }
}
@media screen and (max-width: 534px) {
  .title {
    font-size: 2.4rem !important;
  }
}
</style>

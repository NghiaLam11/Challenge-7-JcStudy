<template>
  <div class="censorship">
    <div class="container">
      <div class="censorship-moderate">
        <div class="content-moderate">
          <div class="courses">
            <div class="topic">Blogs Moderation</div>
            <div>
              <Carousel
                :items-to-show="2"
                :snap-align="'start'"
                :breakpoints="breakpoints"
              >
                <Slide
                  v-for="(blog, key) in blogsStore.unApprovedBlogs"
                  :key="key"
                >
                  <div class="card-item">
                    <div class="remove" @click="onRemove(key)">&#128465;</div>
                    <div class="thumbnail">
                      <img :src="blog.imgUrl" alt="" />
                    </div>
                    <div class="card-right bg-primary">
                      <p class="related">
                        <span>{{ blog.createdAt }}</span> |
                        <span>{{ blog.industry }}</span>
                      </p>
                      <h3 class="multiline-ellipsis-1">
                        {{ blog.title }}
                      </h3>
                      <div class="card-auth">
                        <div class="wrapper-img">
                          <img :src="users[blog.idUser].avatar" alt="" />
                        </div>
                        <div class="name-auth">
                          <span>{{ users[blog.idUser].name }}</span>
                          <span>{{ blog.industry }}</span>
                        </div>
                      </div>
                      <div class="btn-group">
                        <button @click="onApprove(blog)">Approve</button>
                        <span @click="onMoreDetails(blog)">
                          More details...
                        </span>
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
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { useBlogsStore } from "../../composable/useBlogs";
import { useUserStore } from "../../composable/useUser";
import { useRouter } from "vue-router";
import {
  useDeleteBlogStore,
  useUpdateBlogStore,
} from "../../composable/useFirebaseStore";
const router = useRouter();
const blogsStore = useBlogsStore();
const userStore = useUserStore();
const users: any = userStore.users;
const onMoreDetails = (blog: any) => {
  router.push(`/blogs/${blog.id}`);
};
const onApprove = (blog: any) => {
  console.log(blog);
  useUpdateBlogStore({ isApproved: true }, blog.id);
};
const onRemove = (key: any) => {
  if (confirm("Are you sure!") == true) {
    useDeleteBlogStore(key);
  } else {
    return "";
  }
};
const breakpoints = ref({
  0: {
    itemsToShow: 1,
    snapAlign: "center",
  },
  534: {
    autoplay: 3000,
    itemsToShow: 2,
    snapAlign: "start",
    pauseAutoplayOnHover: true,
  },
  768: {
    autoplay: 3000,
    itemsToShow: 3,
    snapAlign: "start",
    pauseAutoplayOnHover: true,
  },
  1068: {
    autoplay: 3000,
    itemsToShow: 4,
    snapAlign: "start",
    pauseAutoplayOnHover: true,
  },
});
</script>
<style lang="scss" scoped>
.censorship {
  .btn-censorship {
    margin-top: 3rem;
    padding: 2rem 1rem;
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.4);
    border-radius: 50px;

    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: inherit;
      p {
        font-size: 1.1rem;
        font-weight: 500;
        transition: all 0.3s ease;
      }
      .plus {
        margin-left: 2rem;
        margin-right: 1rem;
        transform: scale(1.5);
        font-weight: 400;
        transition: all 0.2s ease;
      }
    }
  }
  .btn-censorship:hover {
    cursor: pointer;
    color: var(--primary-color);

    .plus {
      transform: scale(2);
      font-weight: 200;
    }
    p:last-child {
      transform: translateX(10px);
      font-weight: 500;
    }
  }
  .censorship-moderate {
    margin: 3rem 0;
    padding: 1rem;
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.4);
    border-radius: 40px;
    .topic {
      margin: 0.7rem 1rem;
    }
    .courses {
      margin-bottom: 0.5rem;
      margin-top: 0;
      .topic {
        margin-left: 1rem;
        font-weight: 500;
      }
      .card-item {
        position: relative;
        display: flex;
        flex-direction: column;
        cursor: pointer;
        padding-bottom: 2rem;
        padding-top: 0;
        .remove {
          position: absolute;
          top: 10px;
          right: 15px;
          z-index: 10;
          font-size: 1.3rem;
        }
        .remove:hover {
          color: red;
        }
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
            height: 160px;
            border-radius: 5px;
          }
        }
        .card-right {
          width: 100%;
          text-align: start;
          transition: all 0.8s ease;
          padding: 0 1rem;
          .related {
            font-size: 0.7rem;
            color: var(--primary-color);
          }
          .btn-group {
            display: flex;
            align-items: center;
            button {
              font-size: 0.7rem !important;
              margin-top: 0 !important;
            }
            span {
              margin-left: 0.5rem;
              font-size: 0.8rem;
              opacity: 0.6;
            }
            span:hover {
              color: var(--primary-color);
              opacity: 1 !important;
            }
          }
          h3 {
            font-size: 1.3rem;
            line-height: 1.8rem;
            margin-bottom: 0rem;
          }

          .card-auth {
            display: inline-flex;
            align-items: center;
            padding: 0.2rem;
            margin: 0.5rem 0;
            .name-auth {
              display: flex;
              flex-direction: column;
              span {
                font-size: 0.9rem;
              }
              span:last-child {
                font-size: 0.5rem;
                opacity: 0.7;
              }
            }
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
        transform: translateY(0.1rem);
        border-radius: 5px;
      }
      .card-item:hover .thumbnail {
        filter: grayscale(0);
      }
    }
  }
}
</style>

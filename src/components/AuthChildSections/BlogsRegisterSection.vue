<template>
  <div class="registration">
    <div class="container">
      <div class="btn-regis">
        <router-link to="/create-blog">
          <p class="plus">+</p>
          <p>Create your blog!</p>
        </router-link>
      </div>
      <div
        v-if="Object.keys(blogsStore.blogsRegister).length > 0"
        class="regis-moderate"
      >
        <div class="content-moderate">
          <div class="courses">
            <div class="topic">Blogs Moderation</div>
            <div>
              <Carousel
                :breakpoints="breakpoints"
              >
                <Slide
                  v-for="(blog, key) in blogsStore.blogsRegister"
                  :key="key"
                >
                  <div class="card-item">
                    <div class="thumbnail">
                      <img :src="blog?.imgUrl" alt="" />
                    </div>
                    <div class="card-right bg-primary">
                      <p class="related">
                        <span>{{ blog.createdAt }}</span> |
                        <span>{{ blog.industry }}</span>
                      </p>
                      <h3 class="multiline-ellipsis-1">
                        {{ blog.title }}
                      </h3>
                      <p class="multiline-ellipsis-2">
                        {{ blog.desc }}
                      </p>
                      <div class="checking">
                        <b
                          ><span v-if="blog.isApprove === false"
                            >Censoring...</span
                          ><span v-else>Approved</span></b
                        >
                        <span @click="onReadMore">
                          | <u><small>Read more...</small></u>
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
import { useRouter } from "vue-router";
const blogsStore = useBlogsStore();
const router = useRouter();
const onReadMore = (blog: any) => {
  router.push(`/blogs/${blog.id}`);
};
// breakpoint of slide vue-carousel
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
.registration {
  .btn-regis {
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
  .btn-regis:hover {
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
  .regis-moderate {
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
          .related {
            font-size: 0.7rem;
            color: var(--primary-color);
          }
          .checking {
            font-size: 0.9rem;
            color: var(--primary-color);
          }
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
        }
      }
      .card-item:hover .card-right {
        transform: translateY(0.2rem);
        border-radius: 5px;
      }
      .card-item:hover .thumbnail {
        filter: grayscale(0);
      }
    }
  }
}
@media screen and (max-width: 738px) {
  .btn-regis {
    margin-top: 1rem !important;
    padding: 0.5rem !important;
    a {
      p {
        font-size: 0.8rem !important;
      }
    }
  }
}
@media screen and (max-width: 538px) {
  .regis-moderate {
    margin: 1rem 0 !important;
  }
}
</style>

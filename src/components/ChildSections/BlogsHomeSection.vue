<template>
  <div class="blogs">
    <div class="topic">
      <h3>Blogs</h3>
    </div>
    <Carousel
      :items-to-show="2"
      :snap-align="'start'"
      :breakpoints="breakpointsblogs"
    >
      <Slide v-for="(blog, key) in blogsStore.blogsApproved" :key="key">
        <div class="card-item">
          <router-link :to="`/blogs/${blog.id}`">
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
                  <span>Software</span>
                </div>
              </div>
            </div></router-link
          >
        </div>
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { useBlogsStore } from "../../composable/useBlogs";
import { useUserStore } from "../../composable/useUser";
const blogsStore = useBlogsStore();
const userStore = useUserStore();
const users: any = userStore.users;

const breakpointsblogs = ref({
  0: {
    itemsToShow: 1,
    snapAlign: "center",
  },
  534: {
    itemsToShow: 2,
    snapAlign: "start",
    autoplay: 3000,
    pauseAutoplayOnHover: true,
  },
  768: {
    itemsToShow: 3,
    snapAlign: "start",
    autoplay: 3000,
    pauseAutoplayOnHover: true,
  },
  1024: {
    autoplay: 4000,
    itemsToShow: 4,
    pauseAutoplayOnHover: true,
    snapAlign: "start",
  },
});
</script>
<style lang="scss" scoped>
// ------------------------------- START NEW CSS STYLE----------------------------
.blogs {
  margin: 2rem 0;
  .topic {
    margin-left: 1rem;
  }
  .card-item {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    padding-bottom: 2rem;
    padding-top: 0;
    a {
      text-decoration: none;
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
// ------------------------------- END Blogs CSS STYLE------------------------------------------------
</style>

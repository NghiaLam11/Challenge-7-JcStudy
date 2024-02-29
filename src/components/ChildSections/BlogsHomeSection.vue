<template>
  <div class="blogs">
    <div class="topic">
      <h3>Blogs</h3>
    </div>
    <Carousel :breakpoints="breakpointsblogs">
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
const blogsStore = useBlogsStore();
const breakpointsblogs = ref({
  0: {
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
      transition: all 0.25s ease;
      img {
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

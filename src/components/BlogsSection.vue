<template>
  <div class="blogs">
    <BlogsSearchSection />
    <div class="blogs-container container">
      <div
        class="card-item"
        v-for="(blog, key) in blogsStore.blogsApproved"
        :key="key"
      >
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
          <div><button @click="onReadMore(blog)">Read more...</button></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BlogsSearchSection from "./ChildSections/BlogsSearchSection.vue";
import { useBlogsStore } from "../composable/useBlogs";
import { useRouter } from "vue-router";
const blogsStore = useBlogsStore();
const router = useRouter();
const onReadMore = (blog: any) => {
  router.push(`/blogs/${blog.id}`);
};
</script>

<style lang="scss" scoped>
.blogs {
  min-height: 100vh;
  .blogs-container {
    display: flex;
    flex-wrap: wrap;
    .card-item {
      width: 25%;
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
          max-height: 140px;
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
        h3 {
          font-size: 1.3rem;
          line-height: 1.8rem;
          margin-bottom: 0.2rem;
        }
      }
    }
    .card-item:hover .card-right {
      transform: translateY(0.5rem);
      border-radius: 5px;
    }
    .card-item:hover .thumbnail {
      filter: grayscale(0);
    }
  }
}
@media screen and (min-width: 734px) and (max-width: 889px) {
  .blogs {
    .blogs-container {
      .card-item {
        width: calc(100% / 3);
      }
    }
  }
}
@media screen and (min-width: 534px) and (max-width: 734px) {
  .blogs {
    .blogs-container {
      .card-item {
        width: calc(100% / 2);
      }
    }
  }
}
@media screen and (max-width: 534px) {
  .blogs {
    .blogs-container {
      .card-item {
        width: calc(100% / 2);
        button {
          font-size: 0.6rem !important;
        }
      }
    }
  }
}
</style>

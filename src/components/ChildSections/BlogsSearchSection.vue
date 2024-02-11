<template>
  <div class="blog-search container">
    <div class="search">
      <form class="form-search">
        <input
          @input="onSearch"
          placeholder="Ex: Software"
          type="text"
          v-model="textSearch"
        />
        <button @click="onSearch">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
      <div class="search-result" v-if="blogsSearch.length > 0">
        <h5>Results</h5>
        <div class="results">
          <div class="card-item" v-for="blog in blogsSearch" :key="blog?.id">
            <div class="thumbnail">
              <img :src="blog?.imgUrl" alt="" />
            </div>
            <div class="card-right bg-primary">
              <h3 class="multiline-ellipsis-1">{{ blog?.title }}</h3>

              <button @click="onReadMore(blog)">Read more...</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useBlogsStore } from "../../composable/useBlogs";
import { useRouter } from "vue-router";
const blogsStore = useBlogsStore();
const textSearch = ref();
const blogsSearch = ref<any>([]);
const onSearch = () => {
  if (textSearch.value.length > 0) {
    blogsSearch.value = blogsStore.blogsArray.filter((blog: any) => {
      const tags = blog.tags + " " + blog.title + " " + blog.industry;
      if (tags.toLowerCase().includes(textSearch.value.toLowerCase())) {
        return blog;
      }
    });
  } else {
    blogsSearch.value = [];
  }
};
const router = useRouter();
const onReadMore = (blog: any) => {
  router.push(`/blogs/${blog.id}`);
};
</script>

<style lang="scss" scoped>
.blog-search {
  .search {
    margin: 0 0.5rem;
    margin-bottom: 2rem;
    .form-search {
      display: flex;
      justify-content: space-between;
      font-size: 1.1rem;
      padding: 0.5rem;
      border-right: 0.5px solid var(--border-color);
      border-top: 1px solid var(--border-color);
      border-left: 2px solid var(--border-color);
      border-bottom: 5px solid var(--border-color);
      border-radius: 5px;
      input {
        width: 90%;
        max-width: 95%;
        background-color: transparent;
        outline: none;
        border: none;
        color: var(--text-color);
      }
      button {
        margin: 0;
        border: none;
        background-color: transparent;
        i {
          font-size: 1.05rem;
        }
      }
    }
    .search-result {
      h5 {
        margin-top: 1rem;
        margin-left: 1rem;
        font-size: 1.2rem;
      }
      .results {
        display: flex;
        flex-wrap: wrap;
        .card-item {
          width: 25%;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          .thumbnail {
            width: 100%;
            height: 100%;
            padding: 0.7rem;
            transition: all 0.9s ease;
            filter: grayscale(1);
            img {
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
            transition: all 0.35s ease;
            padding: 0 1rem;
            h3 {
              font-size: 1.3rem;
              line-height: 1.8rem;
              margin-bottom: 0.2rem;
            }
          }
        }
        .card-item:hover .thumbnail {
          filter: grayscale(0);
          transform: rotateY(360deg);
        }
      }
    }
  }
}
@media screen and (min-width: 734px) and (max-width: 889px) {
  .blog-search {
    .search {
      .search-result {
        .results {
          .card-item {
            width: calc(100% / 3);
          }
        }
      }
    }
  }
}
@media screen and (min-width: 534px) and (max-width: 734px) {
  .blog-search {
    .search {
      .search-result {
        .results {
          .card-item {
            width: calc(100% / 2);
          }
        }
      }
    }
  }
}
@media screen and (max-width: 534px) {
  .blog-search {
    .search {
      .search-result {
        .results {
          .card-item {
            flex-direction: row;
            width: calc(100% / 1);
            .card-right {
              padding-left: 0;
              padding-top: 1rem;
              button {
                font-size: 0.6rem !important;
              }
            }
          }
          .card-item:hover .card-right {
            transform: translateY(0);
            padding-left: 0.5rem;
          }
        }
      }
    }
  }
}
</style>

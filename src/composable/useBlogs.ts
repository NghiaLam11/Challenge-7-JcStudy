import { defineStore } from "pinia";
import { ref } from "vue";
// import { User } from "../types/types";
export const useBlogsStore = defineStore("blogs", () => {
  const blogs = ref<any>({});
  const unApprovedBlogs = ref<any>({});
  const newBlogs = ref<any>({});
  return {
    blogs,
    unApprovedBlogs,
    newBlogs
  };
});

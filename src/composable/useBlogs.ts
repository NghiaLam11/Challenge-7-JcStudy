import { defineStore } from "pinia";
import { ref } from "vue";
export const useBlogsStore = defineStore("blogs", () => {
  const blogs = ref<any>();
  const blogsRegister = ref<any>({});
  const blogsArray = ref<any>([]);
  const blogsApproved = ref<any>({});
  const unApprovedBlogs = ref<any>({});
  const newBlogs = ref<any>({});
  return {
    blogs,
    blogsArray,
    blogsApproved,
    unApprovedBlogs,
    newBlogs,
    blogsRegister,
  };
});

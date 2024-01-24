import { defineStore } from "pinia";
import { ref } from "vue";
// import { User } from "../types/types";
export const useCoursesStore = defineStore("courses", () => {
  const courses: any = ref({});
  const unApprovedCourses = ref<any>({});
  return {
    courses,
    unApprovedCourses
  };
});

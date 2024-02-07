import { defineStore } from "pinia";
import { ref } from "vue";
// import { User } from "../types/types";
export const useCoursesStore = defineStore("courses", () => {
  const coursesApproved: any = ref({});
  const courses: any = ref({});
  const coursesTrend: any = ref({});
  const unApprovedCourses = ref<any>({});
  const newCourses = ref<any>({});
  return {
    coursesApproved,
    unApprovedCourses,
    newCourses,
    coursesTrend,
    courses,
  };
});

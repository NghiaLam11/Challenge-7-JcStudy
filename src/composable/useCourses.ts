import { defineStore } from "pinia";
import { ref } from "vue";
// import { User } from "../types/types";
export const useCoursesStore = defineStore("courses", () => {
  const coursesApproved: Object = ref({});
  const courses: any = ref({});
  const coursesRegister: any = ref({});
  const coursesArray: any = ref([]);
  const coursesTrend: any = ref({});
  const unApprovedCourses = ref<any>({});
  const newCourses = ref<any>({});
  return {
    coursesApproved,
    coursesArray,
    unApprovedCourses,
    newCourses,
    coursesTrend,
    courses,
    coursesRegister,
  };
});

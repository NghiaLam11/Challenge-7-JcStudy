import { defineStore } from "pinia";
import { ref } from "vue";
// import { User } from "../types/types";
export const useUserStore = defineStore("user", () => {
  const users = ref({});
  const user: any = ref();
  const studyTime = ref<any>([]);
  return {
    user,
    users,
    studyTime,
  };
});

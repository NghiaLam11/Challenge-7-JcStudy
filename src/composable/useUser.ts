import { defineStore } from "pinia";
import { ref } from "vue";
export const useUserStore = defineStore("user", () => {
  const users = ref<any>();
  const user = ref<any>();
  const studyTime = ref<number[]>([]);
  return {
    user,
    users,
    studyTime,
  };
});

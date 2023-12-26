import { defineStore } from "pinia";
import { ref } from "vue";
// import { User } from "../types/types";
export const useUserStore = defineStore("user", () => {
  const user: any = ref();
  
  return {
    user,
  };
});

import { defineStore } from "pinia";
import { ref } from "vue";
export const useTheme = defineStore("theme", () => {
  const theme = ref(localStorage.getItem("theme"));
  return { theme };
});

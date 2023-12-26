import { defineStore } from "pinia";
import { ref } from "vue";
export const useErrorStore = defineStore("error", () => {
  const errorMessage = ref("");
  const isError = ref(false);
  const onToggleError = () => {
    isError.value = !isError.value;
  }
  return {
    errorMessage,
    onToggleError,
    isError
  };
});

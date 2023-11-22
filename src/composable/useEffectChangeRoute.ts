import { defineStore } from "pinia";
import { ref } from "vue";

export const useEffectChangeRoute = defineStore("change-route", () => {
  const isChange = ref(false);
  const onChange = () => {
    isChange.value = true;
    setTimeout(() => {
      isChange.value = false;
    }, 4000);
  };
  return {
    onChange,
    isChange,
  };
});

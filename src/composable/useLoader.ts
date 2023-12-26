import { defineStore } from "pinia";
import { ref } from "vue";
export const useLoaderStore = defineStore("loader", () => {
    const isLoading = ref(false);
    const onToggleLoading = () => {
        isLoading.value = !isLoading.value;
    }
     return {
        isLoading,
        onToggleLoading,
     }
});
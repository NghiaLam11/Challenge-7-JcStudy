import { defineStore } from "pinia";
import { ref } from "vue";
export const useLoaderStore = defineStore("loader", () => {
  const isLoading = ref(false);
  const onToggleLoading = () => {
    isLoading.value = !isLoading.value;
  };
  return {
    isLoading,
    onToggleLoading,
  };
});

export const useUploaderStore = defineStore("uploader", () => {
  const isUploading = ref(false);
  const onToggleUploading = () => {
    isUploading.value = !isUploading.value;
  };
  return {
    isUploading,
    onToggleUploading,
  };
});

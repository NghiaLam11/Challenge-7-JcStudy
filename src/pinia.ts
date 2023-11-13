import { defineStore } from "pinia";
import { ref } from "vue";
export const useTheme = defineStore("theme", () => {
  const theme = ref(localStorage.getItem("theme"));
  return { theme };
});

export const useSound = defineStore("theme", () => {
  let beat = new Audio("/src/sounds/shooting-sound-fx-159024.mp3");

  const playSound = () => {
    beat.play();
  };
  return { playSound };
});

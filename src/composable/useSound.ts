import { defineStore } from "pinia";

export const useSound = defineStore("theme", () => {
  let beat = new Audio("/src/sounds/shooting-sound-fx-159024.mp3");

  const playSound = () => {
    beat.play();
  };
  return { playSound };
});
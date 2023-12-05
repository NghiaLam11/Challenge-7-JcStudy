<template>
  <div class="edit-profile">
    <div class="edit-container">
      <form class="edit-form">
        <div class="input-form">
          <input placeholder="New name..." type="text" />
          <input placeholder="New bio..." type="text" />
        </div>

        <div class="select-character">
          <i @click="onPrevCharacter" class="fa-solid fa-angle-left"></i>
          <img ref="characterElement" src="/src/images/peep-54.png" alt="" />
          <i @click="onNextCharacter" class="fa-solid fa-angle-right"></i>
        </div>
      </form>
      <button><i class="fas fa-tools"></i></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const characterElement = ref();
const characters = ref([
  "/src/images/peep-82.png",
  "/src/images/peep-94.png",
  "/src/images/peep-96.png",
  "/src/images/peep-54.png",
]);
let presentCharacter = ref(0);
let beat = new Audio("/src/sounds/shooting-sound-fx-159024.mp3");
const onNextCharacter = () => {
  beat.play();
  characterElement.value.src = characters.value[presentCharacter.value];
  presentCharacter.value++;
  console.log("character");
  if (presentCharacter.value >= characters.value.length - 1) {
    console.log("000");
    presentCharacter.value = 0;
  }
};

const onPrevCharacter = () => {
  beat.play();
  characterElement.value.src = characters.value[presentCharacter.value];
  presentCharacter.value--;
  console.log("character");
  if (presentCharacter.value <= 0) {
    console.log("000");
    presentCharacter.value = characters.value.length - 1;
  }
};
</script>

<style lang="scss" scope>
.edit-profile {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  .edit-container {
    background-color: var(--footer-color);
    padding: 2rem;
    button {
      width: 80px !important;
      padding: 0.2rem 0.1rem;
    }
    .edit-form {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 60vw;

      .input-form {
        display: flex;
        flex-direction: column;
        width: 50%;

        input {
          background-color: transparent;
          color: inherit;
          border: none;
          outline: none;
          padding: 0.4rem 0.2rem;
          margin: 0.3rem 0;
          font-size: 0.8rem;
          border-bottom: 1px solid var(--border-color);
          width: 100%;
        }
      }

      .select-character {
        display: flex;
        align-items: center;
        height: 150px;
        width: 50%;
        img {
          height: 100%;
          transform: scaleX(-1);
        }
        i {
          cursor: pointer;
          margin: 0 2rem;
          opacity: 0.7;
        }
        i:hover {
          opacity: 1;
          scale: 1.1;
        }
      }
    }
  }
}
</style>

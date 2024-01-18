<template>
  <div class="unlock-form">
    <div class="container form-container">
      <div class="blur"></div>
      <div class="confirm-unlock">
        <p>You really want to unlock this course, right?</p>
        <button @click="onUnlock" class="btn-unlock" type="button">
          Unlock
        </button>
        <button @click="onToggleUnlock" type="button">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Course } from "../../types/types";
const emit = defineEmits(["onToggleUnlock"]);
const props = defineProps<{
  course?: Course;
}>();
const onUnlock = () => {
  console.log(props.course);
};
const onToggleUnlock = () => {
  emit("onToggleUnlock");
};
</script>

<style lang="scss" scope>
.unlock-form {
  .form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 100;
    .blur {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.8);
      z-index: -1;
    }
    .confirm-unlock {
      border: 1px solid;
      padding: 2rem;
      border-radius: 3px;
      button {
        border-left: 1px solid;
        border-bottom: 1px solid;
        margin: 0 0.5rem;
        margin-top: 1rem;
      }
      button:hover {
        scale: 1.01;
      }
    }
  }
}
</style>

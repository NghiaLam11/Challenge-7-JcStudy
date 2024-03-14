<template>
  <div class="details-form">
    <div class="container form-container">
      <div class="blur"></div>
      <div class="confirm-details">
        <div class="message">
          <textarea
            v-model="notificationText"
            cols="2"
            rows="4"
            placeholder="The reason to deny it?"
            required
          ></textarea>
        </div>
        <div class="btn-group">
          <button @click="onRemove" class="btn-remove" type="button">
            Send & Remove
          </button>
          <button @click="onToggleRemove" type="button">Back</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import { ref } from "vue";
import "vue3-carousel/dist/carousel.css";
import { ref } from "vue";

const emit = defineEmits(["onToggleRemove", "onRemove"]);

const props = defineProps<{
  course?: any;
}>();

const course = props.course;
const notificationText = ref();
const onRemove = () => {
  console.log(course);
  emit("onRemove", notificationText.value, course);
};
const onToggleRemove = () => {
  emit("onToggleRemove");
};
</script>

<style lang="scss" scope>
.details-form {
  .form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    z-index: 100;
    .blur {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.6);
      z-index: -1;
    }
    .confirm-details {
      background-color: var(--bg-secondary);
      width: 75vw;
      border: 1px solid;
      padding: 2rem;
      border-radius: 3px;
      .message {
        textarea {
          width: 100%;
          height: 100%;
          padding: 0.2rem 0.3rem;
        }
        textarea::placeholder {
          color: inherit;
          opacity: 0.5;
        }
      }
      .btn-group {
        margin-top: 1rem;
        .btn-remove {
          margin-right: 1rem;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .confirm-details {
    width: 95vw !important;
    padding: 1rem !important;
  }
}
</style>
../../types/Course

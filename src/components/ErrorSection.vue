<template>
  <div class="error-fixed">
    <div class="error">{{ errorStore.errorMessage }}</div>
    <div class="btn-error"><button type="button" @click="onBack">Back</button></div>
  </div>
</template>

<script setup lang="ts">
import { useErrorStore } from "../composable/useError";
const errorStore = useErrorStore();
const onBack = () => {
    errorStore.onToggleError();
}
</script>

<style lang="scss" scoped>
.error-fixed {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 999;
  background-color: var(--bg-secondary);
  .btn-error {
    text-align: center;
  }
}
</style>

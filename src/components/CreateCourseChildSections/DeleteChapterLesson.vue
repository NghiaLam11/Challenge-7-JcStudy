<template>
  <div class="add-lesson">
    <div class="container add-container">
      <div class="blur"></div>
      <div class="form-delete">
        <div class="form-btn">
          <button @click="onDelete" type="button">Delete</button>
          <button type="button" @click="onCancel">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const emit = defineEmits(["onCancel", "onDelete"]);
const onCancel = () => {
  emit("onCancel");
};
const onDelete = () => {
  emit("onDelete");
};
</script>
<style lang="scss" scoped>
.add-lesson {
  .add-container {
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
      background-color: rgba(0, 0, 0, 0.8);
      z-index: -1;
    }
    .form-delete {
      width: 100%;
      transform: translateY(-10px);
      text-align: center;
      .form-btn {
        margin: 0 auto;

        button {
          border-left: 1px solid;
          width: 100px;
          margin: 0 1rem;
          padding: 0.4rem;
        }
        button:active {
          transform: translateY(4px);
        }
      }
    }
  }
}
@media screen and (max-width: 734px) {
  .form-btn {
    width: 100% !important;
  }
}
</style>

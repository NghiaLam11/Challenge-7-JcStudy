<template>
  <div class="create-note">
    <div class="create-note-container">
      <div class="blur"></div>
      <form class="form-create">
        <input v-model="title" type="text" placeholder="Title..." />
        <textarea
          v-model="text"
          cols="10"
          rows="12"
          placeholder="Note"
        ></textarea>
        <div class="btn-group">
          <button type="button" @click="onComplete">Complete</button>
          <button @click="onCancel" type="button">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useUpdateUserStore } from "../../composable/useFirebaseStore";
import { useUserStore } from "../../composable/useUser";
const emit = defineEmits(["onCancel"]);
const props = defineProps<{ note: any }>();
const userStore = useUserStore();
const title = ref(props.note.title || "");
const text = ref(props.note.text || "");
const onCancel = () => {
  emit("onCancel", props.note);
};
const onComplete = async () => {
  console.log("COMPLETE", text.value);
  const idUser = localStorage.getItem("idUser");
  if (props.note === "") {
    console.log("CREATE");
    const data = ref({
      title: title.value,
      text: text.value,
      idUser: idUser,
      createdAt: new Date().toLocaleDateString(),
      id: new Date().getTime().toString() + Math.random() * 10,
    });
    userStore.user.notes[data.value.id] = data.value;
    useUpdateUserStore({ notes: userStore.user.notes });
  } else {
    console.log("UPDATE");
    const data = ref({
      title: title.value,
      text: text.value,
      idUser: idUser,
      createdAt: props.note.createdAt,
      id: props.note.id,
    });
    userStore.user.notes[data.value.id] = data.value;
    useUpdateUserStore({ notes: userStore.user.notes });
  }
  emit("onCancel", props.note);
};
</script>

<style lang="scss" scoped>
.create-note {
  .create-note-container {
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
      background-color: rgba(0, 0, 0, 0.4);
      z-index: -1;
    }
    .form-create {
      background-color: var(--bg-secondary);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      min-width: 70%;
      transform: translateY(-10px);
      padding: 2rem;
      input,
      textarea {
        width: 100%;
        padding: 0.5rem;
        background-color: rgb(255, 255, 255, 0.1);
        color: inherit;
        margin-bottom: 0.8rem;
        border: 1px solid;
        border-radius: 3px;
        border-bottom: 0.3rem solid;
        font-size: 0.9rem;
        outline: none;
        transition: border 0.35s ease;
      }
      input:focus,
      textarea:focus {
        border-bottom: 1px solid;
      }
      .btn-group {
        margin-right: auto;
        button {
          margin-right: 1rem;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .form-create {
    min-width: 95% !important;
  }
}
  

</style>

<template>
  <div class="create-flashcard">
    <div class="create-flashcard-container">
      <div class="blur"></div>
      <div class="form-create">
        <input v-model="title" type="text" placeholder="Title..." />
        <div class="flashcard-list">
          <div class="flashcard-item" v-for="(card, key) in cards">
            <div class="content">
              <i
                class="fa-solid fa-trash-can flashcard-remove"
                @click="onRemoveCard(key)"
              ></i>
              <i
                class="fa-solid fa-hammer flashcard-edit"
                @click="onEditCard(card, key)"
              ></i>
              <div class="front">{{ card.front }}</div>
              <div class="back">{{ card.back }}</div>
            </div>
          </div>
        </div>
        <form @submit.prevent="onAddFlashcard" class="flashcard-add">
          <input type="text" placeholder="Front" v-model="newFrontCard" />
          <input type="text" placeholder="Back" v-model="newBackCard" />
          <button type="submit">Add</button>
        </form>
        <div class="btn-group">
          <button type="button" @click="onComplete">Complete</button>
          <button @click="onCancel" type="button">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useUpdateUserStore } from "../../composable/useFirebaseStore";
import { useUserStore } from "../../composable/useUser";
import { Flashcard } from "../../types/Utilities";
const emit = defineEmits(["onCancel"]);
const props = defineProps<{ flashcard: any }>();
const title = ref(props.flashcard.title || "");
const newFrontCard = ref("");
const newBackCard = ref("");
const cards = ref<any>(props.flashcard.cards || {});
const onRemoveCard = (id: any) => {
  delete cards.value[id];
};
const onEditCard = (card: any, id: any) => {
  delete cards.value[id];
  newBackCard.value = card.back;
  newFrontCard.value = card.front;
};
const onCancel = () => {
  emit("onCancel", props.flashcard);
};
const onAddFlashcard = () => {
  const id = new Date().getTime() + Math.random() * 10;
  cards.value[id] = {
    front: newFrontCard.value,
    back: newBackCard.value,
  };
  newFrontCard.value = "";
  newBackCard.value = "";
};
const userStore = useUserStore();
const onComplete = async () => {
  const idUser = localStorage.getItem("idUser");

  if (props.flashcard === "") {
    console.log("CREATE");
    const data = ref<Flashcard>({
      title: title.value,
      cards: cards.value,
      idUser: idUser,
      createdAt: new Date().toLocaleDateString(),
      id: new Date().getTime().toString() + Math.random() * 10,
    });
    userStore.user.flashcards[data.value.id] = data.value;
    useUpdateUserStore({ flashcards: userStore.user.flashcards });
  } else {
    console.log("UPDATE");
    const data = ref({
      title: title.value,
      cards: cards.value,
      idUser: idUser,
      createdAt: props.flashcard.createdAt,
      id: props.flashcard.id,
    });
    userStore.user.flashcards[data.value.id] = data.value;
    useUpdateUserStore({ flashcards: userStore.user.flashcards });
  }
  emit("onCancel", props.flashcard);
};
</script>

<style lang="scss" scoped>
.create-flashcard {
  .create-flashcard-container {
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
    .form-create {
      background-color: var(--bg-secondary);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      min-width: 85%;
      transform: translateY(-10px);
      padding: 2rem;
      .flashcard-list {
        width: 100%;
        height: 100%;
        min-height: 250px;
        border: 1px solid var(--border-color);
        margin-bottom: 0.5rem;
        overflow-y: scroll;
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        padding: 0.5rem;
        .flashcard-item {
          padding: 0.5rem;

          .content {
            width: 170px;
            height: 250px;
            position: relative;
            transition: all 0.7s ease;
            border: 1px solid var(--border-color);
            i {
              position: absolute;
              top: 10px;
              font-size: 0.9rem;
              opacity: 0.5;
            }
            i:hover {
              opacity: 1;
            }
            i.flashcard-edit {
              right: 30px;
              transform: rotateY(180deg);
            }
            i.flashcard-remove {
              right: 10px;
            }
            .front,
            .back {
              border-radius: 3px;
              position: absolute;
              display: flex;
              justify-content: center;
              align-items: center;
              top: 0;
              left: 0;
              bottom: 0;
              right: 0;
              font-size: 0.9rem;
              z-index: -1;
            }
            .front {
              background-color: var(--bg-secondary);
            }
            .back {
              display: none;
              background-color: var(--bg-reply);
            }
          }
          .content:hover {
            transform: rotateX(360deg);
            .front {
              display: none;
            }
            .back {
              display: flex;
            }
          }
        }
      }
      .flashcard-add {
        display: flex;
        bottom: 0;
        left: 0;
        gap: 0.3rem;
        width: 100%;
        input,
        button {
          margin-bottom: 0;
        }
        input::placeholder {
          opacity: 0.5;
        }
        button {
          margin-top: 0;
        }
      }
      input {
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
      input:focus {
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

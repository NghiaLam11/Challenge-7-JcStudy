<template>
  <div class="edit-profile">
    <div class="blur" @click="onBack"></div>
    <div class="edit-container">
      <form class="edit-form">
        <div class="input-form">
          <input v-model="name" placeholder="New name..." type="text" />
          <input v-model="bio" placeholder="New bio..." type="text" />
        </div>

        <div class="select-character">
          <i @click="onPrevCharacter" class="fa-solid fa-angle-left"></i>
          <img ref="characterElement" src="https://firebasestorage.googleapis.com/v0/b/jcstudyy.appspot.com/o/avatars%2Fpeep-100.png?alt=media&token=db5e92e5-c9bd-4c07-b7de-ae04eb62cb0e" alt="" />
          <i @click="onNextCharacter" class="fa-solid fa-angle-right"></i>
        </div>
      </form>
      <button type="button" @click="onEdit">
        <i class="fas fa-tools"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUpdateUserStore } from "../../composable/useFirebaseStore";
import { useUserStore } from "../../composable/useUser";
const userStore = useUserStore();
const emits = defineEmits(["onOpen"]);
const name = ref(userStore.user?.name);
const bio = ref(userStore.user?.bio);
const onBack = () => {
  emits("onOpen");
};

const characterElement = ref();
const characters = ref([
  "https://firebasestorage.googleapis.com/v0/b/jcstudyy.appspot.com/o/avatars%2Fpeep-100.png?alt=media&token=db5e92e5-c9bd-4c07-b7de-ae04eb62cb0e",
  "https://firebasestorage.googleapis.com/v0/b/jcstudyy.appspot.com/o/avatars%2Fpeep-38.png?alt=media&token=14348c41-5e69-421a-8238-131f1e0e88c7",
  "https://firebasestorage.googleapis.com/v0/b/jcstudyy.appspot.com/o/avatars%2Fpeep-45.svg?alt=media&token=8eee9c4a-645f-45fa-b35a-d3743469a5a7",
  "https://firebasestorage.googleapis.com/v0/b/jcstudyy.appspot.com/o/avatars%2Fpeep-51.svg?alt=media&token=e29bfffb-9d2e-4bac-be00-7cc01eda0e76",
  "https://firebasestorage.googleapis.com/v0/b/jcstudyy.appspot.com/o/avatars%2Fpeep-54.svg?alt=media&token=7ed7acf3-2601-4ef1-9a49-3ec7b95bc909",
  "https://firebasestorage.googleapis.com/v0/b/jcstudyy.appspot.com/o/avatars%2Fpeep-69.svg?alt=media&token=00be572a-cefa-487a-886a-46cbb157f8db",
  "https://firebasestorage.googleapis.com/v0/b/jcstudyy.appspot.com/o/avatars%2Fpeep-73.png?alt=media&token=7b92e3ea-e22c-4ca2-981d-70cdf3f4b38f",
  "https://firebasestorage.googleapis.com/v0/b/jcstudyy.appspot.com/o/avatars%2Fpeep-76.png?alt=media&token=793c0ed3-49bf-4866-af10-a8a81d8cd690",
  "https://firebasestorage.googleapis.com/v0/b/jcstudyy.appspot.com/o/avatars%2Fpeep-79.svg?alt=media&token=8ed4df84-fdef-4220-802b-fddd5b73c002",
]);
let presentCharacter = ref(0);
let beat = new Audio("/src/sounds/shooting-sound-fx-159024.mp3");
const onNextCharacter = () => {
  presentCharacter.value++;
  beat.play();
  characterElement.value.src = characters.value[presentCharacter.value];

  console.log("character");
  console.log(presentCharacter.value, "NEXT");

  if (presentCharacter.value >= characters.value.length - 1) {
    console.log("000");
    presentCharacter.value = 0;
  }
};

const onPrevCharacter = () => {
  beat.play();
  presentCharacter.value--;
  characterElement.value.src = characters.value[presentCharacter.value];

  console.log(presentCharacter.value, "PREV");
  console.log("character");
  if (presentCharacter.value <= 0) {
    console.log("000");
    presentCharacter.value = characters.value.length - 1;
  }
};
const onEdit = () => {
  const data = ref({
    name: name.value,
    bio: bio.value,
    avatar: characters.value[presentCharacter.value],
  });
  console.log(data.value);
  useUpdateUserStore(data.value);
  onBack();
};
</script>

<style lang="scss" scoped>
.edit-profile {
  display: flex;
  justify-content: center;
  align-items: center;

  .blur {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 99;
  }
  .edit-container {
    background-color: var(--footer-color);
    padding: 2rem;
    position: fixed;
    top: calc(50% - 253px / 2);
    z-index: 100;
    animation: fadeIn 0.7s ease;
    transition: all 0.4s ease;
    @keyframes fadeIn {
      from {
        opacity: 0.2;
        transform: scale(0.1);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
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
@media screen and (min-width: 534px) and (max-width: 889px) {
  .edit-container {
    top: 25% !important;
  }
}
@media screen and (max-width: 534px) {
  .edit-form {
    flex-direction: column !important;
    .select-character,
    .input-form {
      width: 100% !important;
    }
    .select-character {
      i {
        margin: 0 1rem !important;
      }
    }
  }
  .edit-profile .edit-container button {
    width: 100% !important;
    border-left: 1px solid;
  }
  .edit-profile .edit-container button:active {
    transform: translateY(4px) !important;
    margin-bottom: 4px;
  }
}
</style>

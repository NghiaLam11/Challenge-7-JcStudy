<template>
  <div class="auth">
    <div class="register">
      <form @submit.prevent="onSubmit" class="form-register">
        <div class="form-group">
          <h2 class="gradient-color-text">Sign Up</h2>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            required
            v-model="email"
            type="email"
            placeholder="Ex: jcstudy123@gmail.com"
            class="email"
            id="email"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            required
            ref="passwordElement"
            v-model="password"
            type="password"
            placeholder="Ex: jcstudy123"
            class="password"
            id="password"
          />
          <div class="toggle-password">
            <input
              v-model="isTogglePassword"
              @change="onTogglePassword"
              type="checkbox"
              id="checkbox"
              class="checkbox"
            />
            <label for="checkbox">Reveal password!</label>
          </div>
        </div>
        <div class="btn-group">
          <button class="btn-submit" type="submit">Sign Up</button>
        </div>
        <div class="signin">
          <router-link to="/signin"
            ><span class="nav-link"
              >I already have an account!</span
            ></router-link
          >
          <i> or </i>
          <span @click="onAnonymus"
            ><span class="nav-link">Visit and go!</span></span
          >
        </div>
      </form>
      <div class="form-greet">
        <img class="blob" src="../images/sent.png" alt="" />
        <div class="greet-group">
          <h3>
            <p>Hello!</p>
            <div>
              Welcome to
              <strong class="jcstudy gradient-color-text">JcStudy</strong>
            </div>
            first time &#127881;!
          </h3>
          <div class="select-character">
            <i @click="onPrevCharacter" class="fa-solid fa-angle-left"></i>
            <img ref="characterElement" src="../images/peep-54.png" alt="" />
            <i @click="onNextCharacter" class="fa-solid fa-angle-right"></i>
          </div>
          <form @submit.prevent="onSubmit" class="form-name">
            <input
              required
              v-model="name"
              type="text"
              placeholder="JcLearn-er"
            />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useSignupAuth, useAnonymusAuth } from "../composable/useFirebaseAuth";
import { useAddUserStore } from "../composable/useFirebaseStore";
// import { User } from "../types/types";
const router = useRouter();

const email = ref("");
const password = ref("");
const name = ref("JcLearn-er");
const onSubmit = () => {
  console.log(name.value, password.value, email.value);
  useSignupAuth(email.value, password.value);
  const user = ref<any>({
    name: name.value,
    bio: "This is bio",
    password: password.value,
    email: email.value,
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/jcstudyy.appspot.com/o/avatars%2Fpeep-76.png?alt=media&token=793c0ed3-49bf-4866-af10-a8a81d8cd690",
    streak: 0,
    isAdmin: false,
    studyTime: [0, 0, 0, 0, 0],
    coursesCompleted: [],
    coursesRegister: [],
    coursesUnlock: [],
    blogsRegister: [],
  });

  useAddUserStore(user.value);
};

const onAnonymus = () => {
  useAnonymusAuth();
  router.push("/");
};
// Feature reveal the password
const isTogglePassword = ref(false);
const passwordElement = ref();
const onTogglePassword = () => {
  if (isTogglePassword.value) {
    passwordElement.value.type = "text";
  } else {
    passwordElement.value.type = "password";
  }
};
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

<style scoped lang="scss">
.auth {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  .register {
    display: flex;
    align-items: center;
    width: 80%;
    height: 100%;
    overflow: hidden;
    padding: 4rem;
    box-shadow: 1px 1px 20px 1px rgb(0, 0, 0, 0.3);
    background-color: inherit;
    color: inherit;
    .form-register {
      width: 50%;
      padding-right: 2rem;
      .signin {
        a,
        span {
          font-size: 0.9rem;
          font-weight: bold;
          color: inherit;
          opacity: 0.8;
          text-decoration: underline;
          cursor: pointer;
        }
        span:hover {
          opacity: 1;
        }
        i {
          font-size: 0.9rem;
        }
      }
      .btn-group {
        padding: 0.3rem 0;

        .btn-submit {
          cursor: pointer;
          padding: 0.2rem 1rem;
          margin-top: 0;
          background-color: rgb(255, 255, 255, 0.1);
          color: inherit;
          border: 1px solid;
          border-radius: 3px;
          border-bottom: 0.3rem solid;
          border-color: var(--border-color);
          transition: all 0.2s linear;
        }
        .btn-submit:hover {
          border-bottom: 0.1rem solid;
        }
      }
      .form-group {
        padding: 0.3rem 0;
        display: flex;
        flex-direction: column;
        .toggle-password {
          display: flex;
          align-items: center;
          label {
            font-size: 0.9rem;
            opacity: 0.8;
            margin-left: 0.1rem;
          }
          label,
          input {
            cursor: pointer;
          }
        }
        h2 {
          font-size: 2.5rem;
        }
        input {
          padding: 0.2rem 0.3rem;
          color: inherit;
          background-color: transparent;
          border: 1px solid;
          border-bottom: 0.3rem solid;
          border-color: var(--border-color);
          border-radius: 4px;
          outline: none;
          transition: all 0.1s ease-in-out;
        }
        input:focus {
          border-bottom: 0.1rem solid;
          font-size: 0.9rem;
        }
        input::placeholder {
          font-size: 0.9rem;
          opacity: 0.8;
          color: inherit;
        }
      }
    }
    .form-greet {
      position: relative;
      width: 50%;
      .blob {
        position: absolute;
        z-index: -1;
        scale: 2;
        rotate: 15deg;
        opacity: 0.8;
        transition: animation 0.8s linear;
        animation: blobAni linear 1.3s forwards;
      }
      @keyframes blobAni {
        from {
          transform: translateX(-300%) translateY(180%);
        }
        to {
          transform: translateX(200%) translateY(-160%);
        }
      }
      .greet-group {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        h3 {
          font-size: 1.5rem;
          text-align: end;
          color: inherit;
          p {
            font-size: 3rem;
            line-height: 3.5rem;
          }
          .jcstudy {
            font-size: 2.5rem;
            font-weight: bold;
          }
        }
        .select-character {
          display: flex;
          align-items: center;
          height: 150px;
          justify-content: flex-end;
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
        .form-name {
          text-align: end;
          input {
            border: none;
            border-bottom: 1px solid rgb(96, 95, 95);
            background-color: transparent;
            outline: none;
            color: inherit;
          }
        }
      }
    }
  }
}
@media screen and (min-width: 0px) and (max-width: 789px) {
  .register {
    padding: 2rem !important;
  }
  .form-register {
    width: 100% !important;
    padding-right: 0 !important;
  }
  .form-greet {
    display: none;
  }
}
</style>

<template>
  <div class="auth">
    <div class="register">
      <form @submit.prevent="onSubmit" class="form-register">
        <div class="form-group">
          <h2 class="gradient-color-text">Sign In</h2>
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
          <button class="btn-submit" type="submit">Sign In</button>
        </div>
        <div class="signup">
          <router-link to="/signup"
            ><span class="nav-link">I don't have an account!</span></router-link
          >
        </div>
      </form>
      <div class="form-greet">
        <img class="blob" src="../images/sent.png" alt="" />
        <div class="greet-group">
          <h3>
            <p>Hi!</p>
            <div>
              Welcome back to
              <strong class="jcstudy gradient-color-text">JcStudy</strong>
            </div>
            <div>Let's explore together &#x1F60D;!</div>
          </h3>
          <div class="select-character">
            <img src="../images/peep-94.png" alt="" />
          </div>
          <form @submit.prevent="onSubmit" class="form-name">
            <span>JcStudy Admin</span>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useSigninAuth } from "../composable/useFirebaseAuth";
import { useErrorStore } from "../composable/useError";
import { useRouter } from "vue-router";
const errorStore = useErrorStore();
const email = ref("");
const password = ref("");
const name = ref("JcLearn-er");
const router = useRouter();
const onSubmit = async () => {
  console.log(name.value, password.value, email.value);
  await useSigninAuth(email.value, password.value);
  if (!errorStore.isError && errorStore.errorMessage === "") {
    await router.push("/");
  }
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
      .signup {
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
          margin-top: 0;
          padding: 0.2rem 1rem;
          background-color: rgb(255, 255, 255, 0.1);
          color: inherit;
          border: 1px solid;
          border-bottom: 0.3rem solid;
          border-radius: 4px;
          transition: all 0.2s linear;
          border-color: var(--border-color);
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
          border-radius: 4px;
          border-color: var(--border-color);
          outline: none;
          transition: all 0.1s ease-in-out;
        }
        input:focus {
          border-bottom: 0.1rem solid;
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
        scale: -1.5;
        rotate: 20deg;
        opacity: 0.8;
        transition: animation 0.8s linear;
        animation: blobAni linear 1s forwards;
      }
      @keyframes blobAni {
        from {
          transform: translateX(-200%) translateY(150%);
        }
        to {
          transform: translateX(200%) translateY(-130%);
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
            border-bottom: 1px solid black;
            background-color: transparent;
            outline: none;
          }
        }
      }
    }
  }
}
@media screen and (min-width: 0px) and (max-width: 789px) {
  .register {
    padding: 1rem !important;
    width: 100% !important;
    box-shadow: none !important;
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

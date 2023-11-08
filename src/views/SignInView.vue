<template>
  <div class="auth">
    <div class="register">
      <form @submit.prevent="onSubmit" class="form-register">
        <div class="form-group">
          <h2>Sign In</h2>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            required
            v-model="email"
            type="email"
            id="email"
            class="email"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            required
            ref="passwordElement"
            v-model="password"
            type="password"
            id="password"
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
            ><span>I don't have an account!</span></router-link
          >
        </div>
      </form>
      <div class="form-greet">
        <img class="blob" src="../images/sent.png" alt="" />
        <div class="greet-group">
          <h3>
            <p>Hi!</p>
            <div>Welcome back to <strong class="jcstudy">JcStudy</strong></div>
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
const email = ref("");
const password = ref("");
const name = ref("JcLearn-er");
const onSubmit = () => {
  console.log(name.value, password.value, email.value);
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
@use "../styles/variable";
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
          color: variable.$primary-color;
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
          background-color: rgb(255, 255, 255, 0.1);
          color: inherit;
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
          background: -webkit-linear-gradient(
            variable.$primary-color,
            rgb(15, 197, 225)
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        input {
          padding: 0.2rem 0.3rem;
          color: inherit;
          background-color: rgb(255, 255, 255, 0.1);
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
            background: -webkit-linear-gradient(#facc15, #f97316);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
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

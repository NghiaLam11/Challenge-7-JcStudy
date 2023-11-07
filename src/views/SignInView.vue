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
        <svg
          class="blob"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#F2F4F8"
            d="M46,-79C60.1,-71.6,72.4,-60.2,79.1,-46.4C85.9,-32.6,87.2,-16.3,87.4,0.1C87.7,16.6,86.8,33.1,80.3,47.4C73.8,61.6,61.6,73.5,47.2,81.5C32.9,89.5,16.4,93.6,0,93.7C-16.5,93.8,-33.1,89.9,-46.5,81.3C-59.9,72.8,-70.1,59.6,-78.3,45.3C-86.6,30.9,-92.7,15.5,-93,-0.2C-93.3,-15.8,-87.8,-31.6,-78.9,-44.9C-70.1,-58.1,-58,-68.8,-44.3,-76.5C-30.6,-84.2,-15.3,-88.8,0.3,-89.4C16,-90,31.9,-86.4,46,-79Z"
            transform="translate(100 100)"
          />
        </svg>
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
    .form-register {
      width: 50%;
      padding-right: 2rem;
      .signup {
        a,
        span {
          font-size: 0.9rem;
          font-weight: bold;
          color: variable.$primary-light-text;
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
        }
      }
    }
    .form-greet {
      position: relative;
      width: 50%;
      .blob {
        position: absolute;
        z-index: -1;
        scale: 6;
        transform: translateX(0px) translateY(-50px);
        transition: animation 0.8s linear;
        animation: blobAni linear 0.8s;
      }
      @keyframes blobAni {
        from {
          transform: translateX(100%) translateY(-50px);
        }
        to {
          transform: translateX(0px) translateY(-50px);
        }
      }
      .greet-group {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        h3 {
          font-size: 1.5rem;
          text-align: end;
          color: #333;
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

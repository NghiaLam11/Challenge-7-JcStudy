<template>
  <div class="auth">
    <div class="signup">
      <form @submit.prevent="onSubmit" class="form-signup">
        <div class="form-group">
          <h2>Sign Up</h2>
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
            v-model="password"
            type="password"
            id="password"
            class="password"
          />
          <div class="toggle-password">
            <input type="checkbox" id="checkbox" class="checkbox" />
            <label for="checkbox">Reveal password!</label>
          </div>
        </div>
        <div class="btn-group">
          <button class="btn-submit" type="submit">Sign Up</button>
        </div>
      </form>
      <div class="form-greet">
        <svg
          class="blob"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#BAE6FF"
            d="M45.6,-80.2C58.3,-71.6,67.2,-57.8,75.1,-43.5C83.1,-29.3,90,-14.6,91.2,0.7C92.4,16,87.8,32,79.1,45C70.5,58,57.8,68,43.9,75.3C30,82.5,15,87,0,86.9C-15,86.9,-29.9,82.3,-43.7,75C-57.4,67.7,-70,57.7,-78.6,44.7C-87.2,31.8,-91.9,15.9,-90.9,0.6C-89.9,-14.8,-83.4,-29.6,-75.1,-43.1C-66.8,-56.6,-56.9,-68.9,-44.1,-77.4C-31.3,-85.9,-15.6,-90.6,0.4,-91.3C16.5,-92,32.9,-88.7,45.6,-80.2Z"
            transform="translate(100 100)"
          />
        </svg>
        <div class="greet-group">
          <h3>
            <p>Hello!</p>
            <div>Welcome to <strong>JcStudy</strong></div>
            first time!
          </h3>
          <div class="select-character">
            <i class="fa-solid fa-angle-left"></i>
            <img src="../images/peep-54.png" alt="" />
            <i class="fa-solid fa-angle-right"></i>
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
const email = ref("");
const password = ref("");
const name = ref("JcLearn-er");
const onSubmit = () => {
  console.log(name.value, password.value, email.value);
};
</script>

<style scoped lang="scss">
.auth {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  .signup {
    display: flex;
    align-items: center;
    width: 80%;
    height: 70vh;
    overflow: hidden;
    padding: 2rem 4rem;
    box-shadow: 1px 1px 20px 1px rgb(0, 0, 0, 0.3);
    .form-signup {
      width: 50%;
      padding-right: 2rem;
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
        scale: 2;
        transform: translateX(60px) translateY(-50px);
      }
      .greet-group {
        display: flex;
        flex-direction: column;
        align-items: center;
        h3 {
          font-size: 1.5rem;
          text-align: end;
          p {
            font-size: 3rem;
            line-height: 3.5rem;
          }
          strong {
            font-size: 3rem;
            font-weight: bold;
            color: rgb(249, 129, 0);
          }
        }
        .select-character {
          display: flex;
          align-items: center;
          height: 150px;
          img {
            height: 100%;
          }
          i {
            cursor: pointer;
            margin: 0 2rem;
          }
        }
        .form-name {
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
</style>

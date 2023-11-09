<template>
  <section class="header">
    <nav class="nav container">
      <ul class="nav-list">
        <li class="nav-logo"><a href="" class="logo">JcStudy</a></li>
      </ul>
      <ul class="nav-list">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/" class="nav-link">Courses</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/" class="nav-link">News</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/" class="nav-link">Blogs</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/" class="nav-link">Contact</router-link>
        </li>
      </ul>
      <ul class="nav-list">
        <li class="nav-theme">
          <div class="theme">
            <img
              v-if="isToggleMode"
              @click="onLightMode"
              src="../images/full-moon (1).png"
              alt=""
            />
            <img v-else @click="onDarkMode" src="../images/sun.png" alt="" />
          </div>
        </li>
        <li class="nav-auth">
          <router-link to="/"
            ><img src="../images/peep-82.png" alt=""
          /></router-link>
        </li>
      </ul>
    </nav>
  </section>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
const isToggleMode = ref(false);
const htmlElements = document.querySelector("html");
const onDarkMode = () => {
  console.log("onDarkMode");
  isToggleMode.value = true;
  htmlElements?.classList.add("dark");
  localStorage.setItem("theme", "dark");
};
const onLightMode = () => {
  console.log("onLightMode");
  isToggleMode.value = false;
  htmlElements?.classList.remove("dark");
  localStorage.removeItem("theme");
};

onMounted(() => {
  const cat = localStorage.getItem("theme");
  if (cat === "dark") {
    onDarkMode();
  } else {
    onLightMode();
  }
});
</script>

<style scoped lang="scss">
@use "../styles/variable";
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  animation: headerAni 1s ease-in-out;
  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .nav-list {
      list-style: none;
      .nav-item,
      .nav-logo,
      .nav-theme {
        padding: 1rem;
        .nav-link {
          text-decoration: none;
          color: inherit;
          padding: 0 1rem;
        }
        .theme {
          img {
            width: 45px;
            cursor: pointer;
            animation: themeAni 2s ease-in-out;
          }
          @keyframes themeAni {
            from {
              transform: translateY(-100px) translateX(30px) rotate(90deg);
            }
            to {
              transform: translateY(0px) translateX(0px) rotate(0);
            }
          }
        }
      }
      .nav-auth {
        padding: 0.5rem;
        img {
          width: 35px;
          cursor: pointer;
          transform: scaleX(-1);
        }
      }
      .nav-logo {
        font-size: 1.5rem;
        font-weight: bold;
        .logo {
          font-family: monospace;
          background: -webkit-linear-gradient(
            variable.$primary-color,
            variable.$primary-color-light
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-decoration: none;
          color: inherit;
          padding: 0 1rem;
        }
      }
      .nav-item:hover {
        cursor: pointer;
        transform: translateX(-5px);
      }
    }
    .nav-list:nth-child(2) {
      display: flex;
      align-items: center;
      padding: 1rem 0;
    }
    .nav-list:nth-child(3) {
      display: flex;
      align-items: center;
      padding: 1rem 0;
    }
  }
}
@keyframes headerAni {
  from {
    top: -10%;
  }
  to {
    top: 0;
  }
}
</style>

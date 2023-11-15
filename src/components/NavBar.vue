<template>
  <div>
    <section class="header">
      <nav class="nav container">
        <ul class="nav-list">
          <li class="nav-logo"><a href="" class="logo">JcStudy</a></li>
        </ul>
        <ul class="nav-list">
          <li class="nav-item">
            <router-link to="/" active-class="active" class="nav-link"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/courses" active-class="active" class="nav-link"
              >Courses</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/news" active-class="active" class="nav-link"
              >News</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/blogs" active-class="active" class="nav-link"
              >Blogs</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/contact" active-class="active" class="nav-link"
              >Contact</router-link
            >
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
          <li class="nav-auth" @click="onAuth">
            <router-link to="/"
              ><img src="../images/peep-82.png" alt=""
            /></router-link>
          </li>
        </ul>
      </nav>
    </section>
    <section class="nav-mobile">
      <ul class="nav-list">
        <i @click="onOpenNavMobile" class="fas fa-bars"></i>
        <li class="nav-auth" @click="onAuth">
          <router-link to="/"
            ><img src="../images/peep-82.png" alt=""
          /></router-link>
        </li>
      </ul>
    </section>
    <section ref="hiddenNavMobileElement" class="nav-hidden bg-primary">
      <nav class="nav-wrapper">
        <div class="logo-mobile">
          <h3 class="logo">JcStudy</h3>
        </div>
        <ul class="nav-list-mobile">
          <li class="nav-item-mobile">
            <router-link to="/" active-class="active" class="nav-link"
              ><i class="fas fa-laptop-house"></i> Home</router-link
            >
          </li>
          <li class="nav-item-mobile">
            <router-link to="/courses" active-class="active" class="nav-link"
              ><i class="fas fa-book"></i> Courses</router-link
            >
          </li>
          <li class="nav-item-mobile">
            <router-link to="/news" active-class="active" class="nav-link"
              ><i class="far fa-newspaper"></i> News</router-link
            >
          </li>
          <li class="nav-item-mobile">
            <router-link to="/blogs" active-class="active" class="nav-link"
              ><i class="fab fa-blogger-b"></i> Blogs</router-link
            >
          </li>
          <li class="nav-item-mobile">
            <router-link to="/contact" active-class="active" class="nav-link"
              ><i class="fas fa-splotch"></i> Contact</router-link
            >
          </li>
        </ul>
        <div class="theme">
          <img
            v-if="isToggleMode"
            @click="onLightMode"
            src="../images/full-moon (1).png"
            alt=""
          />
          <img v-else @click="onDarkMode" src="../images/sun.png" alt="" />
        </div>
        <div ref="navCloseElement" class="nav-close">
          <i @click="onCloseNavMobile" class="fas fa-angle-double-left"></i>
        </div>
      </nav>
    </section>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
const isToggleMode = ref(false);
const htmlElements = document.querySelector("html");
const onDarkMode = () => {
  console.log("onDarkMode");
  isToggleMode.value = true;
  htmlElements?.classList.remove("light");
  htmlElements?.classList.add("dark");
  localStorage.setItem("theme", "dark");
  // light Icon CAROUSEL when dark mode
  const iconNext: any = document.querySelector(".carousel__next");
  const iconPrev: any = document.querySelector(".carousel__prev");
  if (iconNext != null && iconPrev != null) {
    iconNext.style.color = "white";
    iconPrev.style.color = "white";
  }
};
const onLightMode = () => {
  console.log("onLightMode");
  isToggleMode.value = false;
  htmlElements?.classList.remove("dark");
  htmlElements?.classList.add("light");
  localStorage.setItem("theme", "light");

  // Dark Icon CAROUSEL when light mode
  const iconNext: any = document.querySelector(".carousel__next");
  const iconPrev: any = document.querySelector(".carousel__prev");
  if (iconNext != null && iconPrev != null) {
    iconNext.style.color = "black";
    iconPrev.style.color = "black";
  }
};
const hiddenNavMobileElement = ref();
const navCloseElement = ref();
const onCloseNavMobile = () => {
  hiddenNavMobileElement.value.style.left = -100 + "%";
  setTimeout(() => {
    navCloseElement.value.style.transform = "scaleX(-1)";
  }, 600);
};
const onOpenNavMobile = () => {
  setTimeout(() => {
    navCloseElement.value.style.transform = "scaleX(1)";
  }, 600);
  hiddenNavMobileElement.value.style.left = 0;
};

const onAuth = () => {
  let beat = new Audio("/src/sounds/digital-beeping-151921.mp3");
  beat.play();
};

onMounted(() => {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
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
  z-index: 99;
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
            width: 35px;
            height: 35px;
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
        transition: all 0.5s linear;
        img {
          width: 35px;
          cursor: pointer;
          transform: scaleX(-1);
        }
      }
      .nav-auth:active {
        img {
          transform: scaleX(-0.8) scaleY(0.8);
        }
      }
      .nav-logo {
        font-size: 1.5rem;
        font-weight: bold;
        .logo {
          font-family: monospace;
          background: -webkit-linear-gradient(
            variable.$primary-color-dark,
            variable.$primary-color-light
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-decoration: none;
        }
      }
      .nav-item:hover {
        cursor: pointer;
        transform: translateX(-5px);
        transition: all 0.3s ease-in-out;
      }
    }
    .nav-list:first-child {
      padding-left: 0;
      width: 10%;
    }
    .nav-list:nth-child(2) {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      padding: 1rem 0;
      width: 75%;
    }
    .nav-list:last-child {
      display: flex;
      align-items: center;
      justify-content: end;
      padding: 1rem 0;
      width: 15%;
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
.nav-hidden {
  display: none;
}
.nav-mobile {
  display: none;
}

@media screen and (max-width: 889px) {
  .header {
    display: none;
  }
  .nav-hidden {
    display: block;
    position: fixed;
    top: 0;
    left: -100%;
    right: 0;
    bottom: 0;
    z-index: 99;
    max-width: 100vw;
    transition: all 0.5s linear;
    .nav-wrapper {
      .logo {
        font-size: 2.5rem;
        padding: 1rem;
        padding-left: 0.5rem;
        margin-left: 1rem;
        font-family: monospace;
        background: -webkit-linear-gradient(
          variable.$primary-color-dark,
          variable.$primary-color-light
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .nav-list-mobile {
        list-style: none;
        padding: 0;
        padding-left: 1rem;
        .nav-item-mobile {
          padding: 0.5rem;
          .nav-link {
            color: inherit;
            text-decoration: none;
            font-size: 1.1rem;
          }
        }
        .nav-item-mobile:hover {
          cursor: pointer;
          transform: translateX(-10px);
          transition: all 0.3s ease-in-out;
        }
      }
      .theme {
        padding: 0.5rem 0;
        margin-left: 1.5rem;
        img {
          width: 35px;
          height: 35px;
          cursor: pointer;
          animation: themeAni 2s ease-in-out;
        }
        @keyframes themeAni {
          from {
            transform: translateX(-100px) translateY(-30px) rotate(90deg);
          }
          to {
            transform: translateX(0px) translateY(0px) rotate(0);
          }
        }
      }
      .nav-close {
        position: absolute;
        top: 10px;
        right: 15px;
        font-size: 1.5rem;
        opacity: 0.6;
        transform: scaleX(-1);
      }
      .nav-close:hover {
        opacity: 1;
      }
    }
  }
  .nav-mobile {
    display: block;
    .nav-list {
      display: flex;
      align-items: center;
      justify-content: space-between;
      list-style: none;
      padding: 1rem 2rem;
      i {
        font-size: 1.5rem;
      }
      .nav-auth {
        padding: 0;
        padding-left: 2rem;
        img {
          transform: scaleX(-1);
          width: 35px;
        }
      }
    }
  }
}
@media screen and (max-width: 534px) {
  .nav-mobile .nav-list {
    padding: 0.5rem 1rem;
  }
}
</style>

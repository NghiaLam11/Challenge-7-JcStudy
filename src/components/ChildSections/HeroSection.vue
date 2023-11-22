<template>
  <div class="hero">
    <div class="hero-left">
      <h2>Let's study with JcStudy!</h2>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet itaque
        quos accusamus voluptatibus perspiciatis est blanditiis aut rem. Numquam
        optio distinctio a similique eos incidunt vel ut aliquam quae facilis.
      </p>
      <button @click="onDiscover" class="btn-hero">
        <span v-if="isDiscover">Discover</span
        ><i v-else class="fas fa-motorcycle"></i>
      </button>
    </div>
    <div class="hero-right">
      <img src="/src/images/peep-94.png" alt="" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useSound } from "../../../src/composable/useSound.ts";
import { useEffectChangeRoute } from "../../../src/composable/useEffectChangeRoute";

// ------------------------- START HERO SECTION -----------------------
const soundStore = useSound();
const effectStore = useEffectChangeRoute();
const router = useRouter();
const isDiscover = ref(true);
const onDiscover = () => {
  isDiscover.value = !isDiscover.value;
  soundStore.playSound();
  effectStore.onChange();
  setTimeout(() => {
    router.push("/courses");
  }, 2000);
};

// ------------------------- END HERO SECTION -----------------------
</script>
<style scoped lang="scss">
// ---------------------------------------------- START HERO SCSS STYLE
.hero {
  display: flex;
  align-items: center;
  .hero-right {
    img {
      transform: scaleX(-1);
      height: 500px;
      padding: 3rem;
      margin: 0 auto;
    }
  }
  .hero-left {
    padding: 0 1rem 0 4rem;
    h2 {
      font-size: 3rem;
      line-height: 3.5rem;
    }
    p {
      line-height: 1.5rem;
    }
  }
  .btn-hero {
    cursor: pointer;
    padding: 0.2rem 1rem;
    width: 100px;
    background-color: rgb(255, 255, 255, 0.1);
    color: inherit;
    margin-top: 1rem;
    border: 1px solid;
    border-radius: 3px;
    border-bottom: 0.3rem solid;
    transition: all 0.2s linear;
    overflow: hidden;
    position: relative;
    i {
      animation: SlideIn 3s ease-in-out;
    }
    @keyframes SlideIn {
      0% {
        transform: translateY(40px);
      }
      20% {
        transform: translateY(0px);
      }
      40% {
        transform: translateX(-10px);
      }
      60% {
        transform: translateX(100px);
      }
      80% {
        transform: scaleX(-1);
      }
      100% {
        transform: translateX(0px);
      }
    }
  }
  .btn-hero::after {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    right: 100%;
    bottom: 0;
    // transform: translateX(100px);
    background-color: rgba(134, 133, 133, 0.2);
    transition: all 0.3s linear;
  }
  .btn-hero:hover.btn-hero::after {
    right: 0;
    z-index: -1;
  }
  .btn-hero:hover {
    border-bottom: 0.1rem solid;
    box-shadow: 0 0 2rem 1px rgb(255, 255, 255, 0.2);
  }
  .hero-right,
  .hero-left {
    width: 50%;
  }
}

// ------------------------------- END HERO CSS STYLE----------------------------
@media screen and (min-width: 538px) and (max-width: 889px) {
  .hero-right,
  .hero-left {
    width: 50%;
  }
  .hero-right {
    img {
      transform: scaleX(-1);
      width: 100%;
      object-fit: cover;
      margin: 0 auto;
    }
  }
  .hero-left {
    padding: 0 0rem 0 2rem;
    h2 {
      font-size: 2.5rem;
      line-height: 2.8rem;
    }
    p {
      font-size: 0.9rem;
      line-height: 1.3rem;
    }
  }
}
@media screen and (max-width: 538px) {
  .hero {
    flex-direction: column-reverse;
  }
  .hero-right,
  .hero-left {
    width: 100%;
  }
  .hero-right {
    img {
      transform: scaleX(-1);
      height: 300px;
      padding: 2rem;
      margin: 0 auto;
    }
  }
  .hero-left {
    padding: 0 1rem 0 1rem;
  }
}
</style>

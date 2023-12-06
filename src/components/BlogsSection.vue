<template>
  <div class="blogs">
    <CoursesSearchSection />
    <div class="blogs-container container">
      <div class="card-item" v-for="n in 8" :key="n">
        <div class="thumbnail">
          <img
            src="/src/images/jackson-sophat-wUbNvDTsOIc-unsplash.jpg"
            alt=""
          />
        </div>
        <div class="card-right bg-primary">
          <h3 class="multiline-ellipsis-1">
            Lorem islem posile delao adipisicing elit!
          </h3>
          <p class="multiline-ellipsis-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet eos
            voluptatem iusto delectus, minus sapiente! Distinctio atque dolore
            reprehenderit laboriosam? Sit et possimus assumenda! Quas aspernatur
            dolore nulla cumque odio.
          </p>
          <div class="card-auth">
            <div class="wrapper-img">
              <img src="/src/images/peep-82.png" alt="" />
            </div>

            <span>Jclahi</span>
          </div>
          <div><button @click="onUnlock">Read more...</button></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CoursesSearchSection from "./ChildSections/CoursesSearchSection.vue";
import { useSound } from "../composable/useSound.ts";

// Play sound when btn is clicked
const soundStore = useSound();
const onUnlock = () => {
  soundStore.playSound();
};
</script>

<style lang="scss">
.blogs {
  .blogs-container {
    display: flex;
    flex-wrap: wrap;
    .card-item {
      width: 25%;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      padding-bottom: 2rem;
      padding-top: 0;
      .thumbnail {
        width: 100%;
        height: 100%;
        padding: 0.5rem;
        border-radius: 5px;
        overflow: hidden;
        filter: grayscale(1);
        img {
          transition: all 0.9s ease;

          object-fit: cover;
          width: 100%;
          min-height: 180px;
          height: 100%;
          border-radius: 5px;
        }
      }
      .card-right {
        width: 100%;
        text-align: start;
        transition: all 0.8s ease;
        padding: 0 1rem;
        h3 {
          font-size: 1.3rem;
          line-height: 1.8rem;
          margin-bottom: 0.2rem;
        }
        p {
          font-size: 0.8rem;
          line-height: 1.2rem;
          opacity: 0.7;
        }

        .card-auth {
          display: inline-flex;
          align-items: center;
          padding: 0.2rem;
          margin: 0.5rem 0;
          .wrapper-img {
            width: 35px;
            height: 35px;
            padding: 0.2rem;
            position: relative;
            padding-bottom: 0.4rem;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              transition: all 0.35s ease;
            }
          }

          .wrapper-img::after {
            content: "";
            position: absolute;
            z-index: 2;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            scale: 1.03;
            border-radius: 50%;
            border: 1px dashed;
            transition: all 0.35s ease;
          }
          span {
            margin-left: 0.3rem;
            font-weight: bold;
            font-size: 1.1rem;
          }
        }
        .card-auth:hover .wrapper-img img {
          scale: 1.05;
        }
        .card-auth:hover .wrapper-img::after {
          scale: 1.1;
          animation: spinAni 10s ease-in-out infinite;
        }
        @keyframes spinAni {
          from {
            transform: rotate(0);
          }
          to {
            transform: rotate(360deg);
          }
        }
      }
    }
    .card-item:hover .card-right {
      transform: translateY(1.5rem);
      border-radius: 5px;
    }
    .card-item:hover .thumbnail {
      filter: grayscale(0);
    }
  }
}
@media screen and (min-width: 734px) and (max-width: 889px) {
  .blogs {
    .blogs-container {
      .card-item {
        width: calc(100% / 3);
      }
    }
  }
}
@media screen and (min-width: 534px) and (max-width: 734px) {
  .blogs {
    .blogs-container {
      .card-item {
        width: calc(100% / 2);
      }
    }
  }
}
@media screen and (max-width: 534px) {
  .blogs {
    .blogs-container {
      .card-item {
        width: calc(100% / 1);
        button {
          font-size: 0.6rem !important;
        }
      }
    }
  }
}
</style>

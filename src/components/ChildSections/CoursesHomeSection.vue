<template>
  <div class="courses">
    <div class="topic">
      <h3>Courses</h3>
    </div>
    <Carousel
      :items-to-show="2"
      :snap-align="'start'"
      :breakpoints="breakpoints"
    >
      <Slide v-for="slide in 10" :key="slide">
        <div class="card-item">
          <div class="thumbnail">
            <img
              src="/src/images/jackson-sophat-wUbNvDTsOIc-unsplash.jpg"
              alt=""
            />
          </div>
          <div class="card-right bg-primary">
            <h3 class="multiline-ellipsis-1">Lorem islem posile delao</h3>
            <p class="multiline-ellipsis-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet eos
              voluptatem iusto delectus, minus sapiente! Distinctio atque dolore
              reprehenderit laboriosam? Sit et possimus assumenda! Quas
              aspernatur dolore nulla cumque odio.
            </p>
            <button @click="onUnlock">Unlock (Free)</button>
          </div>
        </div>
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useSound } from "/src/composable/useSound.ts";

import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

// Play sound when btn is clicked
const soundStore = useSound();
const onUnlock = () => {
  soundStore.playSound();
};

// breakpoint of slide vue-carousel
const breakpoints = ref({
  0: {
    itemsToShow: 1,
    snapAlign: "center",
  },
  768: {
    autoplay: 3000,
    itemsToShow: 2,
    snapAlign: "start",
    pauseAutoplayOnHover: true,
  },
});
</script>

<style lang="scss">
// ------------------------------- START COURSES CSS STYLE----------------------------
.courses {
  margin: 2rem 0;
  .topic {
    margin-left: 1rem;
  }
  .card-item {
    display: flex;
    cursor: pointer;
    .thumbnail {
      width: 50%;
      height: 100%;
      padding: 0.5rem;
      transition: all 0.35s ease;
      filter: grayscale(1);
      img {
        object-fit: cover;
        width: 100%;
        min-height: 180px;
        height: 100%;
        border-radius: 5px;
      }
    }
    .card-right {
      width: 50%;
      text-align: start;
      transition: all 0.35s ease;
      padding: 1rem;
      padding-left: 0.2rem;
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
      button {
        margin-top: 1rem;
      }
    }
  }
  .card-item:hover .card-right {
    transform: translateX(-50%);
    padding-left: 1rem;
    border-radius: 5px;
  }
  .card-item:hover .thumbnail {
    filter: grayscale(0);
  }
}
// ---------------------------------- END COURSE CSS STYLE----------------------------------------------
</style>

<template>
  <div class="courses-gallery">
    <Carousel
      id="gallery"
      :items-to-show="1"
      :wrap-around="false"
      v-model="currentSlide"
    >
      <Slide v-for="slide in 10" :key="slide">
        <div class="card-gallery bg-gallery">
          <div class="blur"></div>
          <div class="card-text">
            <h3 class="multiline-ellipsis-1">Lorem islem posile delao</h3>
            <p class="multiline-ellipsis-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet eos
              voluptatem iusto delectus, minus sapiente! Distinctio atque dolore
              reprehenderit laboriosam? Sit et possimus assumenda! Quas
              aspernatur dolore nulla cumque odio.
            </p>
            <div class="card-progress">
              <progress class="accent-color" value="32" max="100"></progress>
              <span class="percent">32%</span>
            </div>
            <button @click="onUnlock">Continue</button>
          </div>
          <img src="/src/images/jackson-sophat-wUbNvDTsOIc-unsplash.jpg" alt="" />
        </div>
      </Slide>
    </Carousel>

    <div class="topic">
      <h3>Trending</h3>
    </div>
    <Carousel
      id="thumbnails"
      :breakpoints="breakpoints"
      :wrap-around="true"
      v-model="currentSlide"
      ref="carousel"
    >
      <Slide v-for="slide in 10" :key="slide">
        <div class="carousel__item" @click="slideTo(slide - 1)">
          <div class="card-item">
            <div class="thumbnail">
              <div class="badge-trend">Trend</div>
              <img
                src="/src/images/jackson-sophat-wUbNvDTsOIc-unsplash.jpg"
                alt=""
              />
            </div>
            <div class="card-right bg-primary">
              <h3 class="multiline-ellipsis-1">Lorem islem posile delao</h3>
              <p class="multiline-ellipsis-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
                eos voluptatem iusto delectus, minus sapiente! Distinctio atque
                dolore reprehenderit laboriosam? Sit et possimus assumenda! Quas
                aspernatur dolore nulla cumque odio.
              </p>
              <div class="card-progress">
                <progress class="accent-color" value="32" max="100"></progress>
                <span class="percent">32%</span>
              </div>
              <button @click="onUnlock">Continue</button>
            </div>
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
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import { useSound } from "../../../src/composable/useSound.ts";


// Play sound when btn is clicked
const soundStore = useSound();
const onUnlock = () => {
  soundStore.playSound();
};
const currentSlide = ref(0);
const slideTo = (val: any) => {
  currentSlide.value = val;
};
const breakpoints = ref({
  0: {
    itemsToShow: 1,
    snapAlign: "center",
  },
  768: {
    autoplay: 6000,
    itemsToShow: 2,
    snapAlign: "start",
    pauseAutoplayOnHover: true,
  },
});
</script>

<style scoped lang="scss">
.courses-gallery {
  .carousel__slide--active {
    .thumbnail {
      filter: grayscale(0) !important;
    }
  }
}
// ------------------------------- START COURSES GALLERY CSS STYLE------------------------------------------------
.courses-gallery {
  .topic {
    padding: 1rem 0 0 0.5rem;
  }
  .card-gallery {
    width: 100%;
    position: relative;
    padding: 1px 1px 0.4rem 0.2rem;
    border-radius: 5px;
    .blur {
      position: absolute;
      height: calc(100% - 0.4rem - 1px);
      min-width: 600px;
      max-width: 800px;
      left: 0.2rem;
      bottom: 0.4rem;
      z-index: 1;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
    img {
      width: 100%;
      object-fit: cover;
      max-height: 500px;
      border-radius: 5px;
    }
    .card-text {
      position: absolute;
      z-index: 2;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      padding: 1rem;
      padding-left: 3rem;
      text-align: left;
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: white;
      h3 {
        font-size: 2.2rem;
        line-height: 2.8rem;
        margin-bottom: 0.5rem;
      }
      p {
        font-size: 0.9rem;
        line-height: 1.4rem;
        opacity: 0.9;
        width: 60%;
      }
      .percent {
        font-size: 0.6rem;
        opacity: 0.7;
        margin-left: 2px;
      }
      progress {
        height: 10px;
        margin-bottom: 1.5px;
        outline: none;
        opacity: 0.7;
      }
      button {
        width: 100px;
      }
    }
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
      position: relative;
      .badge-trend {
        position: absolute;
        font-size: 0.8rem;
        background-color: rgba(0, 0, 0, 0.3);
        color: white;
        border-radius: 2px;
        padding: 0.3rem 0.6rem;
      }
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
      padding-left: 0;
      padding-top: 0.4rem;
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
      .percent {
        font-size: 0.6rem;
        opacity: 0.7;
        margin-left: 2px;
      }
      progress {
        height: 10px;
        margin-bottom: 1.5px;
        outline: none;
        opacity: 0.7;
      }
      button {
        margin-top: 0.4rem !important;
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
// ------------------------------- END COURSES GALLERY CSS STYLE------------------------------------------------
</style>

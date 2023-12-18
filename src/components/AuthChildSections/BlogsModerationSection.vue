<template>
  <div class="courses">
    <div class="topic">Blogs Moderation</div>
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
            <h3 class="multiline-ellipsis-1">
              Lorem islem posile delao adipisicing elit!
            </h3>
            <p class="multiline-ellipsis-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet eos
              voluptatem iusto delectus, minus sapiente! Distinctio atque dolore
              reprehenderit laboriosam? Sit et possimus assumenda! Quas
              aspernatur dolore nulla cumque odio.
            </p>
            <div class="card-auth">
              <div class="wrapper-img">
                <img src="/src/images/peep-82.png" alt="" />
              </div>

              <span>Jclahi</span>
            </div>
            <div class="checking" disabled>Censoring...</div>
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

import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

// breakpoint of slide vue-carousel
const breakpoints = ref({
  0: {
    itemsToShow: 1,
    snapAlign: "center",
  },
  534: {
    autoplay: 3000,
    itemsToShow: 2,
    snapAlign: "start",
    pauseAutoplayOnHover: true,
  },
  768: {
    autoplay: 3000,
    itemsToShow: 3,
    snapAlign: "start",
    pauseAutoplayOnHover: true,
  },
  1068: {
    autoplay: 3000,
    itemsToShow: 4,
    snapAlign: "start",
    pauseAutoplayOnHover: true,
  },
});
</script>

<style lang="scss" scoped>
// ------------------------------- START COURSES CSS STYLE----------------------------
.courses {
  margin-bottom: 0.5rem;
  margin-top: 0;
  .topic {
    margin-left: 1rem;
    font-weight: 500;
  }
  .card-item {
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
// ---------------------------------- END COURSE CSS STYLE----------------------------------------------
</style>

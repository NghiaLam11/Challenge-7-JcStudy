<template>
  <div class="registration">
    <div class="container">
      <div class="btn-regis">
        <router-link to="/create-course">
          <p class="plus">+</p>
          <p>Register your course!</p>
        </router-link>
      </div>
      <div class="regis-moderate">
        <div class="content-moderate">
          <div class="courses">
            <div class="topic">Courses Moderation</div>
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
                      Lorem islem posile delao
                    </h3>
                    <p class="multiline-ellipsis-4">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Amet eos voluptatem iusto delectus, minus sapiente!
                      Distinctio atque dolore reprehenderit laboriosam? Sit et
                      possimus assumenda! Quas aspernatur dolore nulla cumque
                      odio.
                    </p>
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
        </div>
      </div>
    </div>
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
  768: {
    autoplay: 3000,
    itemsToShow: 2,
    snapAlign: "start",
    pauseAutoplayOnHover: true,
  },
});
</script>
<style lang="scss" scoped>
.registration {
  .btn-regis {
    margin-top: 3rem;
    padding: 2rem 1rem;
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.4);
    border-radius: 50px;

    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: inherit;
      p {
        font-size: 1.1rem;
        font-weight: 500;
        transition: all 0.3s ease;
      }
      .plus {
        margin-left: 2rem;
        margin-right: 1rem;
        transform: scale(1.5);
        font-weight: 400;
        transition: all 0.2s ease;
      }
    }
  }
  .btn-regis:hover {
    cursor: pointer;
    color: var(--primary-color);

    .plus {
      transform: scale(2);
      font-weight: 200;
    }
    p:last-child {
      transform: translateX(10px);
      font-weight: 500;
    }
  }
  .regis-moderate {
    margin: 3rem 0;
    padding: 1rem;
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.4);
    border-radius: 40px;
    .topic {
      margin: 0.7rem 1rem;
    }

    .courses {
      margin-bottom: 0.5rem;
      margin-top: 0;
      .topic {
        margin-left: 1rem;
        font-weight: 500;
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
          .checking {
            margin-top: 1rem;
            font-size: 0.9rem;
            color: var(--primary-color);
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
  }
}
</style>

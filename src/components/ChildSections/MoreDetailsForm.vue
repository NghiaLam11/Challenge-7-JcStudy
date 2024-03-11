<template>
  <div class="details-form">
    <div class="container form-container">
      <div class="blur"></div>
      <div class="confirm-details">
        <div class="details">
          <div class="media">
            <Carousel :items-to-show="1" :autoplay="60000">
              <Slide v-for="slide in 2" :key="slide">
                <img :src="course?.imgUrl" alt="" v-if="slide === 1" />
                <video controls v-else>
                  <source :src="course?.videoUrl" type="video/mp4" />
                </video>
              </Slide>

              <template #addons>
                <Navigation />
              </template>
            </Carousel>
          </div>
          <div class="overview-details">
            <span
              >&#129299;{{ countChapters }} chapters &
              {{ countLessons }} lessons</span
            ><span> &#9997;{{ course?.industry }}</span
            ><span> &#128339;{{ course?.createdAt }}</span>
            <span> &#128275;{{ course?.countUnlocked }}</span>
          </div>
          <div class="text-details">
            <h4 class="title">{{ course?.title }}</h4>
            <p>
              {{ course?.desc }}
            </p>
          </div>
        </div>
        <div>
          <button @click="onUnlock" class="btn-unlock" type="button">
            Unlock
          </button>
          <button @click="onToggleUnlock" type="button">Back</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import { ref } from "vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";
import { Course } from "../../types/types";
import { computed } from "vue";

const emit = defineEmits(["onToggleUnlock", "onUnlock"]);

const props = defineProps<{
  course?: Course;
}>();

const course = props.course;
const countChapters: number = Object.entries(course?.chapters).length;
const countLessons: any = computed(() => {
  let count = 0;

  for (const key in course?.chapters) {
    if (course?.chapters.hasOwnProperty(key)) {
      count += course?.chapters[key].length;
    }
  }
  return count;
});
const onUnlock = () => {
  console.log(course);
  emit("onUnlock");
};
const onToggleUnlock = () => {
  emit("onToggleUnlock");
};
</script>

<style lang="scss" scope>
.details-form {
  .form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    z-index: 100;
    .blur {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.6);
      z-index: -1;
    }
    .confirm-details {
      background-color: var(--bg-secondary);
      width: 75vw;
      height: 80vh;
      border: 1px solid;
      padding: 2rem;
      border-radius: 3px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .details {
        width: 100%;
        overflow-y: scroll;
        .media {
          width: 100%;
          img,
          video {
            height: 200px;
            object-fit: cover;
            width: 100%;
          }
          video {
            aspect-ratio: 1;
          }
        }
        .overview-details {
          span {
            color: var(--primary-color);
            font-size: 0.9rem;
            font-family: monospace;
          }
        }
        .text-details {
          h4 {
            padding: 0.4rem 0;
            font-size: 1.8rem;
            line-height: 2.1rem;
            letter-spacing: 0.5px;
          }
          p {
            letter-spacing: 0.2px;
            font-size: 0.9rem;
            line-height: 1.3rem;
            opacity: 0.8;
          }
        }
      }
      .details::-webkit-scrollbar {
        display: none;
      }
      .btn-unlock {
        margin-right: 1rem;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .confirm-details {
    width: 95vw !important;
    padding: 1rem !important;
  }
}
</style>
../../types/Course
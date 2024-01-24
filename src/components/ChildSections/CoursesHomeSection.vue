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
      <Slide v-for="course in coursesStore.courses" :key="course">
        <div class="card-item">
          <div class="thumbnail">
            <img :src="course?.imgUrl" alt="" />
          </div>
          <div class="card-right bg-primary">
            <h3 class="multiline-ellipsis-1">{{ course?.title }}</h3>
            <p class="multiline-ellipsis-4">
              {{ course?.desc }}
            </p>
            <div>
              <button @click="onToggleUnlock(course)">
                {{ course?.price === 0 ? "Unlock (Free)" : course?.price }}
              </button>
            </div>
          </div>
        </div>
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
    <MoreDetailsForm
      v-if="isToggleUnlock"
      :course="courseSelected"
      @on-toggle-unlock="onToggleUnlock"
      @on-unlock="onUnlock"
    />
  </div>
</template>

<script lang="ts" setup>
import MoreDetailsForm from "./MoreDetailsForm.vue";
import { ref } from "vue";
import { useSound } from "../../../src/composable/useSound.ts";

import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { useCoursesStore } from "../../composable/useCourses";
import { Course } from "../../types/types";
import { useUserStore } from "../../composable/useUser";
import { useUpdateUserStore } from "../../composable/useFirebaseStore";

// Play sound when btn is clicked
const soundStore = useSound();
const coursesStore = useCoursesStore();
const isToggleUnlock = ref(false);
const courseSelected = ref<any>();
const onToggleUnlock = (course: Course) => {
  isToggleUnlock.value = !isToggleUnlock.value;
  courseSelected.value = course;
  soundStore.playSound();
};
const userStore = useUserStore();
const onUnlock = () => {
  userStore.user.coursesUnlock[courseSelected.value?.id] = courseSelected.value;
  // add to unlocked course array in database
  useUpdateUserStore({
    coursesUnlock: userStore.user.coursesUnlock,
  });
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
    width: 100%;
    .thumbnail {
      width: 50%;
      height: 100%;
      padding: 0.5rem;
      transition: all 0.35s ease;
      filter: grayscale(1);
      img {
        object-fit: cover;
        width: 100%;
        max-height: 180px;
        height: 100%;
        border-radius: 5px;
      }
    }
    .card-right {
      width: 50%;
      text-align: start;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
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
        margin-bottom: auto;
      }
      button {
        margin-top: 1rem;
      }
      span:not(.more-detail) {
        margin-left: 0.3rem;
        opacity: 0.3;
        font-size: 0.8rem;
      }
      .more-detail {
        font-size: 0.9rem;
        opacity: 0.7;
      }
      .more-detail:hover {
        opacity: 1;
        color: var(--primary-color);
      }
    }
  }
  .card-item:hover .card-right {
    transform: translateX(-2rem);
    padding-left: 1rem;
    border-radius: 5px;
  }
  .card-item:hover .thumbnail {
    filter: grayscale(0);
  }
}
@media screen and (min-width: 768px) and (max-width: 998px) {
  .card-right {
    padding-right: 0.1rem !important;
    padding-top: 0.5rem !important;
  }
  .more-detail {
    font-size: 0.7rem !important;
  }
  .or {
    font-size: 0.5rem !important;
  }
}
// ---------------------------------- END COURSE CSS STYLE----------------------------------------------
</style>

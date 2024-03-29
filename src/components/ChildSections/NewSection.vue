<template>
  <div class="new" v-if="Object.keys(coursesStore.newCourses).length > 0">
    <div class="topic">
      <h3>New Courses</h3>
    </div>
    <Carousel
      :breakpoints="breakpointsnew"
    >
      <Slide v-for="(course, key) in coursesStore.newCourses" :key="key">
        <div class="card-item">
          <div class="thumbnail">
            <img :src="course.imgUrl" alt="" />
          </div>
          <div class="card-right bg-primary">
            <h3 class="multiline-ellipsis-1">{{ course?.title }}</h3>
            <p class="multiline-ellipsis-4">
              {{ course?.desc }}
            </p>
            <button @click="onToggleUnlock(course)">Unlock (Free)</button>
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
import { ref } from "vue";
import MoreDetailsForm from "./MoreDetailsForm.vue";

import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import { useSound } from "../../../src/composable/useSound.ts";
import { useUserStore } from "../../composable/useUser";
import { useUpdateUserStore } from "../../composable/useFirebaseStore";
import { Course } from "../../types/Course";
import { useCoursesStore } from "../../composable/useCourses";
const coursesStore = useCoursesStore();
// Play sound when btn is clicked
const soundStore = useSound();
const isToggleUnlock = ref(false);
const courseSelected = ref<any>();
const onToggleUnlock = (course: Course) => {
  isToggleUnlock.value = !isToggleUnlock.value;
  courseSelected.value = course;
  soundStore.playSound();
};
const userStore = useUserStore();
const onUnlock = () => {
  const idUser = localStorage.getItem("idUser");

  userStore.user.coursesUnlocked[courseSelected.value?.id] =
    courseSelected.value;
  // add to unlocked course map in database
  useUpdateUserStore({
    coursesUnlocked: userStore.user.coursesUnlocked,
  }, idUser);
  isToggleUnlock.value = !isToggleUnlock.value;
};
const breakpointsnew = ref({
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
<style scoped lang="scss">
// ------------------------------- START NEW CSS STYLE----------------------------
.new {
  margin: 2rem 0;
  .topic {
    margin-left: 1rem;
  }
  .card-item {
    display: flex;
    cursor: pointer;
    width: 100%;
    height: 100%;
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
        width: 100px;
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
// ---------------------------------- END NEW CSS STYLE----------------------------------------------
</style>
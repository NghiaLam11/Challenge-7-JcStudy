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
      <Slide v-for="course in courses" :key="course">
        <div class="card-item">
          <div class="thumbnail">
            <img :src="course?.imgUrl" alt="" />
          </div>
          <div class="card-right bg-primary">
            <h3 class="multiline-ellipsis-1">{{ course?.title }}</h3>
            <p class="multiline-ellipsis-4">
              {{ course?.desc }}
            </p>
            <button @click="onToggleUnlock(course)">
              {{ course?.price === 0 ? "Unlock (Free)" : course?.price }}
            </button>
            <span>or</span>
            <span @click="onToggleDetails(course)" class="more-detail">
              More details</span
            >
          </div>
        </div>
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
    <UnlockForm
      v-if="isToggleUnlock"
      :course="courseSelected"
      @on-toggle-unlock="onToggleUnlock"
    />
    <MoreCourseDetails
      v-if="isToggleDetails"
      :course="courseSelected"
      @on-toggle-details="onToggleDetails"
    />
  </div>
</template>

<script lang="ts" setup>
import UnlockForm from "./UnlockForm.vue";
import { ref, watch } from "vue";
import { useSound } from "../../../src/composable/useSound.ts";

import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { useCoursesStore } from "../../composable/useCourses";
import { useGetImageUrlStorage } from "../../composable/useFirebaseStorage";
import { Course } from "../../types/types";
import MoreCourseDetails from "./MoreCourseDetails.vue";

// Play sound when btn is clicked
const soundStore = useSound();
const coursesStore = useCoursesStore();
const isToggleUnlock = ref(false);
const courseSelected = ref<Course>();
const onToggleUnlock = (course: Course) => {
  isToggleUnlock.value = !isToggleUnlock.value;
  courseSelected.value = course;
  console.log(course);
  soundStore.playSound();
};
const isToggleDetails = ref(false);
const onToggleDetails = (course: Course) => {
  isToggleDetails.value = !isToggleDetails.value;
  courseSelected.value = course;
  console.log(course);
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
const courses = ref<any>([]);
// {Key is the name of the img, the value is the link to firebase storage.
// Set key = img name to use the name (v-for) at SRC to get the link}
const mediaLinks = ref<any>({});
// A FUNC TO GET THUMBNAIL LINKS OF ALL COURSES EXIST-ING
const useStoreLinks = () => {
  coursesStore.courses.forEach(async (course: any) => {
    const imgUrl = await useGetImageUrlStorage(
      `images-${course.idUser}/${course.thumbnailImg}`
    );
    const videoUrl = await useGetImageUrlStorage(
      `videos-${course.idUser}/${course.thumbnailVideo}`
    );
    courses.value.push({ ...course, imgUrl: imgUrl, videoUrl: videoUrl });
    // SET A MAP OF URL
    mediaLinks.value[course.thumbnailImg] = imgUrl;
  });
};
// WHEN USER RELOAD AT OTHER PAGE AND CHANGE TO THIS PAGE => RUN BELOW
useStoreLinks();
// WHEN COURSES HAD FETCH-ED FROM DATABASE => RUN BELOW
watch(
  () => coursesStore.courses,
  () => {
    // GET URL OF IMG ALL COURSES
    useStoreLinks();
  }
);
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
// ---------------------------------- END COURSE CSS STYLE----------------------------------------------
</style>

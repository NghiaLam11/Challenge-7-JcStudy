<template>
  <div class="courses-unlock" v-if="Object.keys(coursesUnlocked).length > 0">
    <div class="topic">
      <h3>Courses unlocked</h3>
    </div>
    <Carousel :breakpoints="breakpointsunlock">
      <Slide
        v-for="course in userStore.user?.coursesUnlocked"
        :key="course?.id"
      >
        <div class="card-item">
          <div class="thumbnail">
            <img :src="course.imgUrl" alt="" />
          </div>
          <div class="card-right bg-primary">
            <h3 class="multiline-ellipsis-1">
              {{ course.title }}
            </h3>
            <p class="multiline-ellipsis-3">
              {{ course.desc }}
            </p>

            <button @click="onMoreDetails(course)">Continue ...</button>
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

<script setup lang="ts">
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import { ref } from "vue";
import { useSound } from "../../../src/composable/useSound.ts";
import { useUserStore } from "../../composable/useUser";
import { useRouter } from "vue-router";
import { Course } from "../../types/Course.ts";
// import { useGetCoursesStore } from "../../composable/useFirebaseStore";
const userStore = useUserStore();
const router = useRouter();
// Play sound when btn is clicked
const soundStore = useSound();
const coursesUnlocked = ref(userStore.user?.coursesUnlocked || {});
const onMoreDetails = (course: Course) => {
  soundStore.playSound();
  router.push(`/courses/${course.id}/0/overview`);
};
const breakpointsunlock = ref({
  0: {
    itemsToShow: 1,
    snapAlign: "center",
  },
  534: {
    itemsToShow: 2,
    snapAlign: "start",
    autoplay: 3000,
    pauseAutoplayOnHover: true,
  },
  889: {
    autoplay: 5000,
    itemsToShow: 4,
    snapAlign: "start",
    pauseAutoplayOnHover: true,
  },
});
</script>
<style scoped lang="scss">
// ------------------------------- START COURSES UNLOCK CSS STYLE------------------------------------------------
.courses-unlock {
  margin: 2rem 0;
  .topic {
    margin-left: 1rem;
  }
  .card-item {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    .thumbnail {
      width: 100%;
      height: 100%;
      padding: 0.7rem;
      transition: all 0.9s ease;
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
      width: 100%;
      text-align: start;
      transition: all 0.35s ease;
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
    }
  }
  .card-item:hover .card-right {
    transform: translateY(-0.5rem);
    border-radius: 5px;
  }
  .card-item:hover .thumbnail {
    filter: grayscale(0);
    transform: rotateY(360deg);
  }
}
// ------------------------------- END COURSES UNLOCK CSS STYLE------------------------------------------------
</style>../../types/Course.ts

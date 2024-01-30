<template>
  <div class="home container">
    <HeroSection />
    <CoursesHomeSection v-if="Object.keys(coursesStore.courses).length > 0" />
    <NewSection v-if="Object.keys(coursesStore.newCourses).length > 0" />
    <BlogsHomeSection />
  </div>
</template>

<script setup lang="ts">
import HeroSection from "./ChildSections/HeroSection.vue";
import NewSection from "./ChildSections/NewSection.vue";
import BlogsHomeSection from "./ChildSections/BlogsHomeSection.vue";
import CoursesHomeSection from "./ChildSections/CoursesHomeSection.vue";
import { onMounted } from "vue";
import { useCoursesStore } from "../composable/useCourses";

const coursesStore = useCoursesStore();

const theme = localStorage.getItem("theme");
onMounted(() => {
  // Set color of the carousel icon when render
  const iconNext: any = document.querySelectorAll(".carousel__next");
  const iconPrev: any = document.querySelectorAll(".carousel__prev");
  console.log(iconNext.length, iconPrev.length);
  if (theme === "dark") {
    for (let i = 0; i < iconNext.length; i++) {
      iconNext[i].style.color = "white";
      iconPrev[i].style.color = "white";
      iconNext[i].style.scale = "1.5";
      iconPrev[i].style.scale = "1.5";
    }
  } else {
    for (let i = 0; i < iconNext.length; i++) {
      iconNext[i].style.color = "black";
      iconPrev[i].style.color = "black";
      iconNext[i].style.scale = "1.5";
      iconPrev[i].style.scale = "1.5";
    }
  }
});
</script>

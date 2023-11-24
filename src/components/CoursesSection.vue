<template>
  <div class="courses">
    <div class="courses-container container">
      <CoursesSearchSection />
      <CoursesGallery />
      <NewSection />
      <CoursesUnlock />
    </div>
  </div>
</template>

<script lang="ts" setup>
import NewSection from "./ChildSections/NewSection.vue";
import CoursesSearchSection from "./ChildSections/CoursesSearchSection.vue";
import CoursesUnlock from "./ChildSections/CoursesUnlock.vue";
import CoursesGallery from "./ChildSections/CoursesGallery.vue";
import { onMounted } from "vue";
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

<style scoped lang="scss">
.courses {
  .courses-container {
    padding-top: 1rem;
  }
}
</style>

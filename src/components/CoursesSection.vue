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
</script>

<style scoped lang="scss">
.courses {
  .courses-container {
    padding-top: 1rem;
  }
}
</style>

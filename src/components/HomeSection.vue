<template>
  <div class="home container">
    <HeroSection />
    <CoursesHomeSection
      v-if="Object.keys(coursesStore.coursesApproved).length > 0"
    />
    <NewSection v-if="Object.keys(coursesStore.newCourses).length > 0" />
    <BlogsHomeSection v-if="Object.keys(blogsStore.blogsApproved).length > 0" />
  </div>
</template>

<script setup lang="ts">
import HeroSection from "./ChildSections/HeroSection.vue";
import NewSection from "./ChildSections/NewSection.vue";
import BlogsHomeSection from "./ChildSections/BlogsHomeSection.vue";
import CoursesHomeSection from "./ChildSections/CoursesHomeSection.vue";
import { useCoursesStore } from "../composable/useCourses";
import { useBlogsStore } from "../composable/useBlogs";

const coursesStore = useCoursesStore();
const blogsStore = useBlogsStore();
</script>

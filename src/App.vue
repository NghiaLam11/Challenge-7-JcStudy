<template>
  <div class="wrapper">
    <header v-if="!isSpecialPage" class="header"><NavBar /></header>
    <main class="body">
      <router-view></router-view>
    </main>
    <footer><FooterSection /></footer>
  </div>
</template>
<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import FooterSection from "./components/FooterSection.vue";
import { onMounted, watch, ref } from "vue";
// import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
const route = useRoute();
const isSpecialPage = ref(false);
// const router = useRouter();

onMounted(() => {
  const navHiddenElement: any = document.querySelector(".nav-hidden");
  const navCloseElement: any = document.querySelector(".nav-close");
  watch(
    () => route.fullPath,
    (newPath) => {
      if (newPath === "/signin" || newPath === "/signup") {
        isSpecialPage.value = true;
        console.log("TRUE: " + newPath);
      } else {
        isSpecialPage.value = false;
        console.log("FALSE: " + newPath);
      }
      // CLOSE NAV (MOBILE) WHEN CHANGE ROUTE
      navHiddenElement.style.left = -100 + "%";
      setTimeout(() => {
        navCloseElement.style.transform = "scaleX(-1)";
      }, 600);
    }
  );
});
</script>

<style scoped lang="scss">
.header {
  margin-bottom: 5.5rem;
}
</style>

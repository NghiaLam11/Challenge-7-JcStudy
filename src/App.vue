<template>
  <div class="wrapper">
    <header v-if="!isSpecialPage" class="header"><NavBar /></header>
    <main class="body">
      <router-view></router-view>
    </main>
    <footer v-if="!isSpecialPage"><FooterSection /></footer>
    <section v-if="effectStore.isChange" class="change-route-section">
      <ChangeRouteSection />
    </section>
    <section v-if="loaderStore.isLoading">
      <LoaderSection />
    </section>
    <section v-if="errorStore.isError"><ErrorSection /></section>
  </div>
</template>
<script setup lang="ts">
import NavBar from "./components/HeaderSection.vue";
import FooterSection from "./components/FooterSection.vue";
import ChangeRouteSection from "./components/ChangeRouteSection.vue";
import LoaderSection from "./components/LoaderSection.vue";
import ErrorSection from "./components/ErrorSection.vue";
import { onMounted, watch, ref } from "vue";
import { useEffectChangeRoute } from "./composable/useEffectChangeRoute";
import { useLoaderStore } from "./composable/useLoader";
import { useErrorStore } from "./composable/useError";
import { useRoute, useRouter } from "vue-router";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useGetUserStore } from "./composable/useFirebaseStore";
useGetUserStore();
const route = useRoute();
const errorStore = useErrorStore();
const loaderStore = useLoaderStore();
const isSpecialPage = ref(false);
const effectStore = useEffectChangeRoute();

const isStopChangeRoute = ref(false);

const router = useRouter();
onAuthStateChanged(auth, (user: any) => {
  if (user) {
    isStopChangeRoute.value = false;
    router.push("/");
  } else {
    isStopChangeRoute.value = true;
    router.push("/signup");
  }
});

onMounted(() => {
  const navHiddenElement: any = document.querySelector(".nav-hidden");
  const navCloseElement: any = document.querySelector(".nav-close");
  watch(
    () => route.fullPath,
    (newPath) => {
      // Loading when changing the route
      loaderStore.onToggleLoading();
      if (newPath === "/signin" || newPath === "/signup") {
        isSpecialPage.value = true;
        console.log("TRUE: " + newPath);
        if (isStopChangeRoute.value === false) {
          router.push("/");
        }
      } else {
        isSpecialPage.value = false;
        console.log("FALSE: " + newPath);
      }
      // CLOSE NAV (MOBILE) WHEN CHANGE ROUTE
      navHiddenElement.style.left = -100 + "%";
      setTimeout(() => {
        navCloseElement.style.transform = "scaleX(-1)";
        // Unloading when changing the route
        loaderStore.onToggleLoading();
      }, 1000);
    }
  );
});
</script>

<style scoped lang="scss">
.header {
  margin-bottom: 5.5rem;
}
@media screen and (max-width: 889px) {
  .header {
    margin-bottom: 0rem;
  }
}
</style>

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
  </div>
</template>
<script setup lang="ts">
import NavBar from "./components/HeaderSection.vue";
import FooterSection from "./components/FooterSection.vue";
import ChangeRouteSection from "./components/ChangeRouteSection.vue";
import { onMounted, watch, ref } from "vue";
import { useEffectChangeRoute } from "./composable/useEffectChangeRoute";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const isSpecialPage = ref(false);
const effectStore = useEffectChangeRoute();
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
const isStopChangeRoute = ref(false);

const router = useRouter();
onAuthStateChanged(auth, (user: any) => {
  if (user) {
    const uid = user.uid;

    console.log(user, uid, "Changed auth HAHAH");
  } else {
    isStopChangeRoute.value = true;
    router.push("/signup");
    console.log(user, "NULL");
  }
});

router.beforeEach((to, from) => {
  if (
    (isStopChangeRoute.value === false && to.fullPath === "/signin") ||
    (isStopChangeRoute.value === false && to.fullPath === "/signup")
  ) {
    router.push("/");
    console.log(from.fullPath, to.fullPath, isStopChangeRoute.value);
  }
});

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
@media screen and (max-width: 889px) {
  .header {
    margin-bottom: 0rem;
  }
}
</style>

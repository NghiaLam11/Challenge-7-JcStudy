<template>
  <div class="wrapper">
    <header v-if="!isSpecialPage" class="header"><NavBar /></header>
    <main class="body" v-if="userStore.user || isSpecialPage || isAnonymous">
      <router-view></router-view>
    </main>
    <footer v-if="!isSpecialPage"><FooterSection /></footer>
    <section v-if="effectStore.isChange" class="change-route-section">
      <ChangeRouteSection />
    </section>
  </div>
  <section v-if="loaderStore.isLoading">
    <LoaderSection />
  </section>
  <section v-if="uploaderStore.isUploading">
    <UploaderSection />
  </section>
  <section v-if="errorStore.isError"><ErrorSection /></section>
</template>
<script setup lang="ts">
import NavBar from "./components/HeaderSection.vue";
import FooterSection from "./components/FooterSection.vue";
import ChangeRouteSection from "./components/ChangeRouteSection.vue";
import LoaderSection from "./components/LoaderSection.vue";
import UploaderSection from "./components/UploaderSection.vue";
import ErrorSection from "./components/ErrorSection.vue";
import { onMounted, watch, ref } from "vue";
import { useEffectChangeRoute } from "./composable/useEffectChangeRoute";
import { useLoaderStore, useUploaderStore } from "./composable/useLoader";
import { useErrorStore } from "./composable/useError";
import { useRoute, useRouter } from "vue-router";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  useGetBlogsStore,
  useGetCoursesStore,
  useGetUserStore,
} from "./composable/useFirebaseStore";

import { useSignoutAuth } from "./composable/useFirebaseAuth";

import { useUserStore } from "./composable/useUser";
// import { autoUpdateStudyTime } from "./composable/autoUpdateStudyTimeInChart";
const loaderStore = useLoaderStore();
loaderStore.isLoading = true;

const route = useRoute();
const errorStore = useErrorStore();
const userStore = useUserStore();
const uploaderStore = useUploaderStore();
const isSpecialPage = ref(false);
const effectStore = useEffectChangeRoute();

const isStopChangeRoute = ref(false);
const isAnonymous = ref(false);
const router = useRouter();
onAuthStateChanged(auth, async (user: any) => {
  if (user?.isAnonymous === true) {
    isAnonymous.value = true;
    useGetCoursesStore();
    useGetBlogsStore();
  } else if (user) {
    await useGetUserStore();
    isStopChangeRoute.value = false;
  } else {
    isStopChangeRoute.value = true;
    useGetCoursesStore();
    useGetBlogsStore();
    router.push("/signup");
  }
});

// ---------------------------------------------------------------- DANG ROI KHUC NAY NE ----------------------------------------------------------------
// const date = new Date();
// // const dataTest = ref([30, 40, 30, 70, 5]);

// const currentTime = ref(0);
// const timeArray: any = localStorage.getItem("currentTimeArray");
// const currentTimeArray = ref<any>(
//   timeArray != null
//     ? JSON.parse(timeArray)
//     : {
//         timeDay: date.getDate(),
//         timeList: [],
//       }
// );
// // setTimeout(() => {
// //   const initialValue = 0;
// //   const sumTimeOfAllDay = currentTimeArray.value?.timeList.reduce(
// //     (accumulator: any, currentValue: any) => accumulator + currentValue,
// //     initialValue
// //   );
// //   userStore.studyTime.shift();
// //   userStore.studyTime.push(sumTimeOfAllDay);
// // }, 2000);

// const whenChangedDay = () => {
//   if (date.getDate() != JSON.parse(timeArray).timeDay) {
//     setTimeout(() => {
//       const initialValue = 0;
//       const timeArray: any = localStorage.getItem("currentTimeArray");
//       console.log(JSON.parse(timeArray).timeList);
//       const sumTimeOfAllDay = JSON.parse(timeArray).timeList.reduce(
//         (accumulator: any, currentValue: any) => accumulator + currentValue,
//         initialValue
//       );
//       console.log(sumTimeOfAllDay);
//       console.log(userStore.studyTime);
//       userStore.studyTime.shift();
//       userStore.studyTime.push(sumTimeOfAllDay);
//       const dataUpdateStudyTime = {
//         studyTime: userStore.studyTime,
//       };
//       useUpdateUserStore(dataUpdateStudyTime);
//     }, 2000);

//     // RESET LOCAL STORE WHEN CHANGE THE DAY
//     console.log(userStore.studyTime, "studyTime");
//     localStorage.removeItem("currentTimeArray");
//     localStorage.setItem(
//       "currentTimeArray",
//       JSON.stringify({
//         timeDay: date.getDate(),
//         timeList: [],
//       })
//     );
//     currentTimeArray.value = {
//       timeDay: date.getDate(),
//       timeList: [],
//     };
//   }
// };
// whenChangedDay();

// setInterval(() => {
//   currentTime.value += 1;
//   console.log(timeArray);

//   // localStorage.removeItem("currentTimeArray");
// }, 60000);

// window.addEventListener("beforeunload", (e: any) => {
//   e.preventDefault();
//   currentTimeArray.value.timeList.push(currentTime.value);
//   localStorage.setItem(
//     "currentTimeArray",
//     JSON.stringify(currentTimeArray.value)
//   );
//   console.log(currentTimeArray.value, "currentTimeArray");
//   currentTime.value = 0;
// });
onMounted(() => {
  const navHiddenElement: any = document.querySelector(".nav-hidden");
  const navCloseElement: any = document.querySelector(".nav-close");
  watch(
    () => route.fullPath,
    (newPath) => {
      console.log(isAnonymous.value, newPath);
      // Loading when changing the route
      if (isAnonymous.value === true) {
        loaderStore.isLoading = true;
        // alert("You need to sign in!");
        useSignoutAuth();
        router.push("/signup");
        window.location.reload();
        isSpecialPage.value = true;
      } else {
        if (newPath === "/signin" || newPath === "/signup") {
          isSpecialPage.value = true;
          if (isStopChangeRoute.value === false) {
            router.push("/");
          }
        } else {
          isSpecialPage.value = false;
        }
      }
      // CLOSE NAV (MOBILE) WHEN CHANGE ROUTE
      navHiddenElement.style.left = -100 + "%";
      setTimeout(() => {
        navCloseElement.style.transform = "scaleX(-1)";
        // Unloading when changing the rout
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

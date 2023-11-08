<template>
  <div class="wrapper">
    <header class="header"><NavBar /></header>
    <main class="body">
      <router-view></router-view>
    </main>
    <footer class="footer"></footer>
  </div>
</template>
<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
// import { onMounted } from 'vue';
// import { useRouter } from 'vue-router';

// const router = useRouter();
// onMounted(() => {
//   router.push('/signup');
// })
</script>

<style scoped lang="scss">
</style>

<template>
  <div class="content">
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
onMounted(() => {
  router.push('/signup');
})
</script>

<style scoped lang="scss">
.content {
  max-width: 1264px;
  min-height: 100vh;
  margin: 0 auto;
}
</style>

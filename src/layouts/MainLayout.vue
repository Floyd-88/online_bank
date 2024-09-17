<script setup lang="ts">
import TheNavBar from '@/components/TheNavBar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <TheNavBar />
  <main class="main">
    <RouterView />
  </main>
</template>

<style scoped lang="scss">
.main {
    padding: 10px 20px;
}
</style>

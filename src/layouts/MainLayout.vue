<script setup lang="ts">
import TheNavBar from '@/components/TheNavBar.vue'
import AppMessage from '@/components/ui/AppMessage.vue';
import { RouterView } from 'vue-router'
</script>

<template>
  <TheNavBar />
  <main class="main">
    <AppMessage/>
    <RouterView />
  </main>
</template>

<style scoped lang="scss">
.main {
    padding: 10px 20px;
}
</style>

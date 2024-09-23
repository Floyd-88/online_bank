<script setup lang="ts">
import TheNavBar from '@/components/TheNavBar.vue'
import AppMessage from '@/components/ui/AppMessage.vue';
import MessagePage from '@/views/MessagePage.vue';
import { RouterView } from 'vue-router'
</script>

<template>
  <TheNavBar />
  <main class="main">
    <MessagePage/>
    <AppMessage/>
    <RouterView />
  </main>
</template>

<style scoped lang="scss">
.main {
    padding: 10px 20px;
}
</style>

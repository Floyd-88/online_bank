<script setup lang="ts">
import AppMessage from '@/components/ui/AppMessage.vue';
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="wrap">
    <AppMessage/>
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
.wrap {
  max-width: 600px;
  margin: 0 auto;
  margin-top: 20px;

}
</style>

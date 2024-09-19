<script setup lang="ts">
defineProps<{title: string}>()
</script>

<template>
  <div class="main-page">
    <div class="main-page__title-block">
      <h2 class="main-page__title">{{ title }}</h2>
      <slot name="main-page__btn"/>
    </div>
    <slot/>
  </div>
</template>

<style scoped lang="scss">
.main-page {
    margin: 0 auto;
    padding: 10px 20px;
    background-color: whitesmoke;
    max-width: 1200px;
    border-radius: 10px;

    &__title-block {
        display: flex;
        justify-content: space-between;
    }

    &__title {
        font-size: 19px;
    }
}
</style>

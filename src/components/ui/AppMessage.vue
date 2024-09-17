<script setup lang="ts">
import type { AlertI } from '@/types/types';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore()


const TITLE_MAP: Record<AlertI['type'], string> = {
    primary: 'Успешно!',
    danger: 'Ошибка!',
    warning: 'Внимание!'
}

const alert = computed<AlertI | null>(() => store.getters.getAlert)
const title = computed(() => alert.value ? TITLE_MAP[alert.value.type] : null)
const articleClass = computed(() => {
    if(!alert.value) return 'alert'
    return `alert alert--${alert.value.type}`
 })

function closeAlert() {
    store.commit('clearAlert')
}
</script>

<template>
  <div v-if="alert" :class="articleClass">
    <h3 class="alert__title">{{ title }}</h3>
    <p class="alert__message">{{ alert?.message }}</p>
    <span class="alert__close" @click="closeAlert">&times;</span>
  </div>
</template>

<style scoped lang="scss">
.alert {
  background-color: whitesmoke;
  margin-bottom: 20px;
  padding: 20px 10px;
  position: relative;
  &__title {
    font-size: 17px;
  }

  &__message {
  }

  &__close {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  &--primary {
    border-left: 5px solid green;
  }

  &--danger {
    border-left: 5px solid red;
  }

  &--warning {
    border-left: 5px solid orange;
  }
}
</style>

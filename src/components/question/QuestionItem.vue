<script setup lang="ts">
import type { QuestionsI } from '@/types/types'
import { ref } from 'vue';

defineProps<{ question: QuestionsI}>()

const isOpenQuestion = ref(false)

function clickOpen() {
  isOpenQuestion.value = !isOpenQuestion.value
}

</script>

<template>
  <div class="question">
    <div class="question__title" @click="clickOpen">{{ question.title }}</div>
    <div class="question__body" v-if="isOpenQuestion">
      {{ question.text }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.question {
  margin-top: 20px;

  &__title {
    display: inline-block;
    font-size: 17px;
    font-weight: 600;
    cursor: pointer;
  }

  &__body {
    font-size: 16px;
  }
}
</style>

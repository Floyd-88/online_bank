<script setup lang="ts">
import QuestionItem from '@/components/question/QuestionItem.vue'
import AppPage from '@/components/ui/AppPage.vue'

const questions = [
  {
    title: 'Что есть в данной системе?',
    text: 'Тут есть все, для того, чтобы смотреть, какие заявки человек добавлял'
  },
  { title: 'Как тут работает авторизация?', text: 'Все реализовано через Firebase' }
]
</script>

<template>
  <AppPage title="Помощь">
    <div class="questions">
      <QuestionItem v-for="(question, index) in questions" :key="index" :question="question" />
    </div>
  </AppPage>
</template>

<style scoped lang="scss">
.questions {
  margin-top: 25px;
}
</style>

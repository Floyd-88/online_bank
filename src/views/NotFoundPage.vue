<script setup lang="ts">
import AppPage from '@/components/ui/AppPage.vue'
import { useRouter } from 'vue-router';
const router = useRouter()
</script>

<template>
  <div class="not-found">
    <AppPage title="Ошибка 404. Такой страницы не найдено!">
        <div class="not-found__btn-block">
            <button class="not-found__btn" @click="router.push('/')">Вернуться на главную</button>
        </div>
    </AppPage>
  </div>
</template>

<style scoped lang="scss">
.not-found {
    padding: 40px;

    &__btn-block {
        width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 40px;
    margin-bottom: 10px;
    }

  &__btn {

    margin-right: 10px;
    padding: 5px 20px;
    background-color: #48ba48;
    color: white;
    border: none;
    border-radius: 16px;
    cursor: pointer;
    font-weight: 700;
    display: flex;
    justify-content: center;

    &:hover {
      background-color: #0056b3;
    }
  }
}
</style>

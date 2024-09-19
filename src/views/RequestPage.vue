<script setup lang="ts">
import AppPage from '@/components/ui/AppPage.vue'
</script>

<template>
  <AppPage title="Заявка">
    <div class="request">
      <p class="request__item">Имя владельца: <span>Иванов Иван Иванович</span></p>
      <p class="request__item">Телефон: <span>+7435674532</span></p>
      <p class="request__item">Сумма: <span>12 323,00</span></p>
      <p class="request__item">Статус: <span class="request__item__status">Активен</span></p>
    </div>
    <div class="request__block-select">
      <label for="status">Статус</label>
      <select id="status">
        <option value="">Активен</option>
        <option value="">Завершен</option>
        <option value="">Отменен</option>
        <option value="">В ожидание</option>
      </select>
    </div>

    <button class="request__btn">УДАЛИТЬ</button>
  </AppPage>
</template>

<style scoped lang="scss">
.request {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 10px;

  &__item {
    font-weight: 600;
    span {
      font-weight: 400;
    }

    &__status {
      border: 1px solid #69a269;
      color: #69a269;
      border-radius: 15px;
      padding: 1px 5px;
    }
  }

  &__block-select {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;

    label {
      font-weight: 600;
    }
    select {
      border: 2px solid rgb(119, 118, 118, 0.5);
      border-radius: 5px;
      padding: 5px;
      min-width: 200px;
    }
  }

  &__btn {
    margin-right: 10px;
    padding: 5px 20px;
    background-color: red;
    color: white;
    border: none;
    border-radius: 16px;
    cursor: pointer;
    font-weight: 700;
    display: flex;
    justify-content: center;
    transition: opacity 0.3s ease;
    opacity: .5;

    &:hover {
      opacity: 1;
    }
  }
}
</style>

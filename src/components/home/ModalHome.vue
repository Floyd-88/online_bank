<script setup lang="ts"></script>

<template>
  <form class="form">
    <div class="form__request">
      <label for="name">ФИО</label>
      <input class="form__request__input" type="text" id="name" />
    </div>
    <div class="form__request">
      <label for="phone">Телефон</label>
      <input class="form__request__input" type="tel" id="phone" />
    </div>
    <div class="form__request">
      <label for="sum">Сумма</label>
      <input class="form__request__input" type="text" id="sum" />
    </div>
    <div class="form__request">
      <label for="status">Статус</label>
      <select class="form__request__input" name="" id="status">
        <option value="">Активен</option>
        <option value="">Завершен</option>
        <option value="">Отменен</option>
        <option value="">В ожидание</option>
      </select>
    </div>
    <button class="form__request__btn">Создать</button>
  </form>
</template>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px 20px;
  min-width: 350px;

  &__request {
    display: flex;
    flex-direction: column;

    &__input {
      border: 2px solid rgb(119, 118, 118, 0.5);
      border-radius: 5px;
      padding: 5px;
      min-width: 200px;
      &:focus {
        outline-color: green;
      }
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
}
</style>

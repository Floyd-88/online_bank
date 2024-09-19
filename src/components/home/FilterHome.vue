<script setup lang="ts"></script>

<template>
  <div class="block-filters">
    <input class="block-filters__input" type="text" placeholder="Поиск по имени" />
    <select class="block-filters__select" name="" id="">
      <option value="">Активен</option>
      <option value="">Завершен</option>
      <option value="">Отменен</option>
      <option value="">В ожидание</option>
    </select>
  </div>
</template>

<style scoped lang="scss">
.block-filters {
  display: flex;
  gap: 30px;
  margin-top: 10px;

  &__input {
    border: 2px solid rgb(119, 118, 118, 0.5);
    border-radius: 5px;
    padding: 5px;
    min-width: 200px;
    &:focus {
      outline-color: green;
    }
  }

  &__select {
    border: 2px solid rgb(119, 118, 118, 0.5);
    border-radius: 5px;
    padding: 5px;
    min-width: 200px;
    cursor: pointer;
  }
}
</style>

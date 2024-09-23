<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const emit = defineEmits<{
  (
    e: 'update:modelValue',
    payload: { name: string; status: 'active' | 'cancelled' | 'completed' | 'pending' | '' }
  ): void  
}>()

const name = ref('')
const status = ref<'active' | 'cancelled' | 'completed' | 'pending' | ''>('')

const isActive = computed(() => name.value || status.value)

watch([name, status], (val) => {
  emit('update:modelValue', {
    name: val[0],
    status: val[1]
  })
})

function clickReset() {
  name.value = ""
  status.value = ""
}
</script>

<template>
  <div class="block-filters">
    <input class="block-filters__input" type="text" placeholder="Поиск по имени" v-model="name" />
    <select class="block-filters__select" v-model="status">
      <option disabled selected value="">Выберите статус</option>
      <option value="active">Активен</option>
      <option value="completed">Завершен</option>
      <option value="cancelled">Отменен</option>
      <option value="pending">Выполняется</option>
    </select>
    <button class="block-filters__btn" @click="clickReset" v-if="isActive">Очистить</button>
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

  &__btn {
    background-color: #d4d4d4;
    color: black;
    padding: 5px 15px;
    border: 1px solid #d4d4d4;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: rgb(168, 175, 168);
    }
  }
}
</style>

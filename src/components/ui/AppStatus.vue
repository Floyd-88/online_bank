<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{ status: 'active' | 'cancelled' | 'completed' | 'pending' }>()

const classesMap = {
  active: 'primary',
  cancelled: 'danger',
  completed: 'primary',
  pending: 'warning'
}

const textMap = {
      active: 'Активен',
      cancelled: 'Отменен',
      completed: 'Завершен',
      pending: 'Выполняется'
    }

const text = ref(textMap[props.status])
const className = ref(classesMap[props.status])

watch(props, val => {
    className.value = classesMap[val.status]
    text.value = textMap[val.status]
})
</script>

<template>
  <span :class="['table__status', className]">{{ text }}</span>
</template>

<style scoped lang="scss">
.table__status {
  padding: 1px 10px;
  border-radius: 15px;
  font-size: 15px;
}

.primary {
  border: 1px solid #69a269;
  color: #69a269;
}

.danger {
  border: 1px solid red;
  color: red;
}

.warning {
    border: 1px solid rgb(190, 195, 84);
    color: rgb(190, 195, 84);
}
</style>

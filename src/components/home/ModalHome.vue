<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import { useStore } from 'vuex';
import * as yup from 'yup'

const store = useStore()

const emit = defineEmits<{(e: 'closeModal', bool: boolean): void}>()

const schema = yup.object({
  name: yup.string().trim().required('ФИО обязательно для заполнения'),
  phone: yup
    .string()
    .trim()
    .required('Телефон обязателен для заполнения')
    .matches(/^\+?[0-9]{10,12}$/, 'Введите корректный номер телефона'),
  sum: yup
    .number()
    .typeError('Сумма должна быть числом')
    .required('Сумма обязательна для заполнения'),
  status: yup.string().required('Выберите статус')
})

const { handleSubmit, errors, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    phone: '',
    sum: '',
    status: 'active',
  },
})

const onSubmit = handleSubmit(async (values: any) => {
  try {
    await store.dispatch("request/create", values)
    resetForm()
    emit('closeModal', false)
  } catch (e) {
    console.log(e)
  }
})

const { value: name } = useField('name')
const { value: phone } = useField('phone')
const { value: sum } = useField('sum')
const { value: status } = useField('status')
</script>

<template>
  <form class="form" @submit.prevent="onSubmit">
    <div class="form__request">
      <label for="name">ФИО</label>
      <input v-model="name" class="form__request__input" type="text" id="name" />
      <span class="form__request__error" v-if="errors.name">{{ errors.name }}</span>
    </div>

    <div class="form__request">
      <label for="phone">Телефон</label>
      <input v-model="phone" class="form__request__input" type="tel" id="phone" />
      <span class="form__request__error" v-if="errors.phone">{{ errors.phone }}</span>
    </div>

    <div class="form__request">
      <label for="sum">Сумма, руб.</label>
      <input v-model="sum" class="form__request__input" type="text" id="sum" />
      <span class="form__request__error" v-if="errors.sum">{{ errors.sum }}</span>
    </div>

    <div class="form__request">
      <label for="status">Статус</label>
      <select v-model="status" class="form__request__input" id="status">
        <option value="active">Активен</option>
        <option value="completed">Завершен</option>
        <option value="cancelled">Отменен</option>
        <option value="pending">Выполняется</option>
      </select>
      <span class="form__request__error" v-if="errors.status">{{ errors.status }}</span>
    </div>

    <button type="submit" class="form__request__btn">Создать</button>
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

    &__error {
      color: red;
      font-size: 14px;
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

<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { onMounted, ref } from 'vue'
import { error } from '@/utils/error'

const router = useRouter()
const route = useRoute()

const store = useStore()
const formTitle = ref('Войдите в систему')
const isForm = ref('login')

function registerForm() {
  if (isForm.value === 'login') {
    isForm.value = 'register'
    formTitle.value = 'Регистрация'
  } else if (isForm.value === 'register') {
    isForm.value = 'login'
    formTitle.value = 'Войдите в систему'
  }
}

// Создаем схему валидации с помощью yup
const validationSchema = yup.object({
  email: yup.string().required('Email обязателен').email('Некорректный email'),
  password: yup
    .string()
    .required('Пароль обязателен')
    .min(6, 'Пароль должен быть не менее 6 символов')
})

// Инициализируем форму с этой схемой валидации
const { handleSubmit, resetForm } = useForm({
  validationSchema
})

// Инициализируем поля формы
const { value: email, errorMessage: emailError, handleBlur: blurEmail } = useField('email')
const {
  value: password,
  errorMessage: passwordError,
  handleBlur: blurPassword
} = useField('password')

// Обработка отправки формы
const onSubmitForm = handleSubmit(async (values) => {
  try {
    if (isForm.value === 'login') {
      await store.dispatch('auth/login', values)
    } else if(isForm.value === 'register') {
      await store.dispatch('auth/register', values)
    }
    resetForm()
    router.push('/')
  } catch (e) {
    console.log(e)
  }
})

onMounted(() => {
  if (route.query.message) {
    store.dispatch('changeAlert', {
      message: error(route.query.message as string),
      type: 'warning'
    })
  }
})
</script>

<template>
  <form class="form">
    <h1 class="form__title">{{ formTitle }}</h1>

    <div class="form__item">
      <label class="form__label" for="email">Email</label>
      <input
        class="form__input"
        id="email"
        v-model="email"
        @blur="blurEmail"
        type="text"
        placeholder="Введите email"
      />
      <span class="form__error">{{ emailError }}</span>
    </div>

    <div class="form__item">
      <label class="form__label" for="password">Password</label>
      <input
        class="form__input"
        id="password"
        v-model="password"
        @blur="blurPassword"
        type="passwordword"
        placeholder="Введите пароль"
      />
      <span class="form__error">{{ passwordError }}</span>
    </div>

    <div class="form__btns">
      <button class="form__btns__login" type="submit" @click.prevent="onSubmitForm">
        Отправить
      </button>
      <button class="form__btns__reg" @click.prevent="registerForm">
        {{ isForm === 'register' ? 'Войдите' : 'Зарегистрироваться' }}
      </button>
    </div>
  </form>
</template>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  background-color: whitesmoke;
  padding: 15px;
  border-radius: 10px;

  .form__title {
    margin-bottom: 16px;
    font-size: 25px;
  }

  &__item {
    display: flex;
    flex-direction: column;
    margin-bottom: 12px;
  }

  &__label {
    margin-bottom: 8px;
    font-weight: bold;
  }

  &__input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  &__btns {
    display: flex;

    &__login {
      margin-right: 10px;
      padding: 5px 20px;
      background-color: #48ba48;
      color: white;
      border: none;
      border-radius: 16px;
      cursor: pointer;
      font-weight: 700;
      display: flex;
      // width: 100px;
      justify-content: center;
    }

    &__login:hover {
      background-color: #0056b3;
    }

    &__reg {
      padding: 0;
      position: relative;
      border: none;
      cursor: pointer;
      font-size: 14px;
      background: none;
      color: inherit;

      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 2px; // Положение линии чуть ниже текста
        width: 0;
        height: 1px; // Толщина линии
        background-color: currentColor; // Линия того же цвета, что и текст
        transition: width 0.3s ease; // Плавная анимация изменения ширины
        opacity: 0.3;
      }
      &:hover::after {
        width: 100%;
      }
    }
  }

  &__error {
    color: red;
    font-size: 12px;
  }
}
</style>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore()
const router = useRouter()

function logout() {
store.commit('auth/logout')
router.push("/auth")
}
</script>

<template>
  <header class="header">
    <h1 class="header__title">Online Bank</h1>
    <ul class="header__list">
      <li class="header__item"><router-link to="/">Заявки</router-link></li>
      <li class="header__item"><router-link to="/help">Помощь</router-link></li>
      <li class="header__item"><router-link to="/message">Сообщения</router-link></li>
      <li class="header__item"><a href="#" @click.prevent="logout">Выход</a></li>
    </ul>
  </header>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background: whitesmoke;
  -webkit-box-shadow: 0px 5px 10px 2px rgba(255, 255, 255, 0.2);
  -moz-box-shadow: 0px 5px 10px 2px rgba(255, 255, 255, 0.2);
  box-shadow: 0px 5px 10px 2px rgba(255, 255, 255, 0.2);

  &__title {
    font-size: 20px;
  }

  &__list {
    display: flex;
    gap: 18px;
    font-size: 15px;
    font-weight: 500;
  }

  &__item {

    a {
        text-decoration: none;
        color: black;
        padding: 0;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0px;
        width: 0;
        height: 2px; 
        background-color: currentColor; 
        transition: width 0.3s ease; 
        opacity: 0.3;
      }
      &:hover::after {
        width: 100%;
      }
    }

  }
}
</style>

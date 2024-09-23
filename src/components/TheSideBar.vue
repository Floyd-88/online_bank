<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const messages = ref([
  {
    id: 1,
    text: 'Добрый день! Здесь вы можете оставить сообщение по интересующему вас вопросу.',
    isUser: false
  },
  { id: 2, text: 'Как создать заявку', isUser: true }
])

const newMessage = ref('')

const isSidebarVisible = computed(() => store.getters['message/getIsSideBar'])

function sendMessage() {
  if (newMessage.value.trim()) {
    messages.value.push({ id: Date.now(), text: newMessage.value, isUser: true })
    newMessage.value = ''
  }
}
</script>

<template>
  <div class="sidebar" :class="{ 'sidebar--visible': isSidebarVisible }">
    <div class="sidebar__close" @click="store.commit('message/setIsSideBar')">&times;</div>
    <div class="sidebar__messages">
      <div
        v-for="message in messages"
        :key="message.id"
        :class="['message', { 'message--user': message.isUser }]"
      >
        {{ message.text }}
      </div>
    </div>

    <div class="sidebar__input">
      <textarea v-model="newMessage" placeholder="Введите сообщение..."></textarea>
      <button @click="sendMessage">Отправить</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  background: #c6c6c6;
  width: 30vw;
  position: fixed;
  top: 0;
  right: -30vw; /* Начальная позиция панели (скрыта) */
  bottom: 0;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.5);
  transition: right 0.3s ease-in-out; /* Анимация выезда */

  &--visible {
    right: 0; /* Панель выезжает, когда класс активен */
  }

  &__close {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 20px;
    font-size: 2rem;
  }

  &__messages {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 40px 20px 20px;
    overflow-y: auto;
    word-wrap: break-word;
  }

  &__input {
    display: flex;
    padding: 10px;
    background: #c6c6c6;
    border-top: 1px solid #ddd;
    flex-direction: column;
    gap: 10px;

    textarea {
      flex-grow: 1;
      resize: none;
      padding: 10px;
      border: none;
      border-radius: 5px;
      font-size: 14px;
    }

    button {
      padding: 5px 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  }
}

/* Стили для сообщений */
.message {
  background-color: #e0e0e0;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  max-width: 80%;
}

.message--user {
  background-color: #007bff;
  color: white;
  align-self: flex-end; /* Сообщения пользователя выравниваются справа */
}
</style>

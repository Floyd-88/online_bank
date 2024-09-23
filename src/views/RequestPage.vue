<script setup lang="ts">
import AppLoader from '@/components/ui/AppLoader.vue'
import AppPage from '@/components/ui/AppPage.vue'
import AppStatus from '@/components/ui/AppStatus.vue'
import type { RequestI } from '@/types/types'
import { currency } from '@/utils/sum'
import { onMounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const route = useRoute()
const store = useStore()

const request = ref<RequestI | null>(null)
const status = ref<'active' | 'cancelled' | 'completed' | 'pending'  | null>(null)
const isLoader = ref(false)

function backPage() {
  router.go(-1)
}

function removeClick() {
  store.dispatch('request/removeRequest', route.params.id)
  router.push('/')
}

function updateClick() {
  if (request.value) {
    store.dispatch('request/updateRequest', {
      ...request.value,
      status: status.value,
      id: route.params.id
    })
    if(status.value) {
      request.value.status = status.value
    }
  }
}

onMounted(async () => {
  isLoader.value = true
  request.value = await store.dispatch('request/loadOneRequest', route.params.id)
  if (request.value) {
      status.value = request.value.status
    }
  isLoader.value = false
})

watch(request, (newRequest) => {
  if (newRequest) {
    status.value = newRequest.status
  }
})
</script>

<template>
  <AppPage title="Заявка">
    <template #main-page__btn>
      <button class="back-btn" @click="backPage">Назад к заявкам</button>
    </template>

    <AppLoader v-if="isLoader" />
    <div v-if="request && !isLoader">
      <div class="request">
        <p class="request__item">
          Имя владельца: <span>{{ request.name }}</span>
        </p>
        <p class="request__item">
          Телефон: <span>{{ request.phone }}</span>
        </p>
        <p class="request__item">
          Сумма: <span>{{ currency(request.sum) }}</span>
        </p>
        <p class="request__item">Статус: <AppStatus :status="request.status" /></p>
      </div>
      <div class="request__block">
        <label for="status">Статус</label>
        <div class="request__block__select">
          <select id="status" v-model="status">
            <option value="active">Активен</option>
            <option value="completed">Завершен</option>
            <option value="cancelled">Отменен</option>
            <option value="pending">Выполняется</option>
          </select>
          <button class="request__btn request__btn--update" @click="updateClick">Обновить</button>
        </div>
      </div>

      <button class="request__btn request__btn--remove" @click="removeClick">УДАЛИТЬ</button>
    </div>
    <div v-else class="request__not">Заявка не найдена</div>
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

  &__block {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;

    &__select {
      display: flex;
      gap: 10px;
    }

    label {
      font-weight: 600;
    }
    select {
      flex: 1;
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
    opacity: 0.5;

    &:hover {
      opacity: 1;
    }
  }

  &__btn--update {
    background-color: #0029ff;
  }

  &__not {
    width: 100%;
    text-align: center;
    padding: 20px;
    font-size: 18px;
    font-weight: 600;
  }
}

.back-btn {
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
</style>

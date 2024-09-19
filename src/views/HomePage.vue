<script setup lang="ts">
import FilterHome from '@/components/home/FilterHome.vue'
import ModalHome from '@/components/home/ModalHome.vue'
import TableHome from '@/components/home/TableHome.vue'
import AppLoader from '@/components/ui/AppLoader.vue'
import AppModal from '@/components/ui/AppModal.vue'
import AppPage from '@/components/ui/AppPage.vue'
import type { RequestI } from '@/types/types'
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const isModal = ref(false)
const isLoader = ref(false)
const filter = ref<
  Partial<{
    name: string
    status: 'active' | 'cancelled' | 'completed' | 'pending' | ''
  }>
>({})

function modalOpen(bool: boolean) {
  isModal.value = bool
}

onMounted(async () => {
  isLoader.value = true
  await store.dispatch('request/load')
  isLoader.value = false
})

const requests = computed(() => {
  const allRequests: RequestI[] = store.getters['request/getRequests']
  return allRequests.filter((request) => {
    const normalizedFilterName = filter.value.name?.trim().toLowerCase() || ''
    const normalizedRequestName = request.name.trim().toLowerCase()

    const filterName = normalizedFilterName ? normalizedRequestName.includes(normalizedFilterName) : true
    const filterStatus = filter.value.status ? request.status === filter.value.status : true

    return filterName && filterStatus
  })
})
</script>

<template>
  <AppPage title="Список заявок">
    <template #main-page__btn>
      <button class="btn__create" @click="modalOpen(true)">СОЗДАТЬ</button>
    </template>

    <FilterHome v-model="filter"/>

    <TableHome :requests="requests" />
    <div v-if="isLoader">
      <AppLoader />
    </div>
    <teleport to="body">
      <AppModal v-if="isModal" title="Создать заявку" @closeModal="modalOpen">
        <ModalHome @closeModal="modalOpen" />
      </AppModal>
    </teleport>
  </AppPage>
</template>

<style scoped lang="scss">
.btn__create {
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

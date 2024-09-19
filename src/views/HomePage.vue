<script setup lang="ts">
import FilterHome from '@/components/home/FilterHome.vue'
import ModalHome from '@/components/home/ModalHome.vue'
import TableHome from '@/components/home/TableHome.vue'
import AppLoader from '@/components/ui/AppLoader.vue'
import AppModal from '@/components/ui/AppModal.vue'
import AppPage from '@/components/ui/AppPage.vue'
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

const isModal = ref(false)
const isLoader = ref(false)
const store = useStore()
function modalOpen(bool: boolean) {
  isModal.value = bool
}

onMounted(async () => {
  isLoader.value = true
  await store.dispatch('request/load')
  isLoader.value = false
})

const requests = computed(() => store.getters['request/getRequests'])
</script>

<template>
  <AppPage title="Список заявок">
    <template #main-page__btn>
      <button class="btn__create" @click="modalOpen(true)">СОЗДАТЬ</button>
    </template>

    <FilterHome />

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

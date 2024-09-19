<script setup lang="ts">
import FilterHome from '@/components/home/FilterHome.vue'
import ModalHome from '@/components/home/ModalHome.vue'
import TableHome from '@/components/home/TableHome.vue'
import AppModal from '@/components/ui/AppModal.vue'
import AppPage from '@/components/ui/AppPage.vue'
import { ref } from 'vue'

const isModal = ref(false)

function modalOpen(bool: boolean) {
    isModal.value = bool
}

</script>

<template>
  <AppPage title="Список заявок">
    <template #main-page__btn>
      <button class="btn__create" @click="modalOpen(true)">СОЗДАТЬ</button>
    </template>

    <FilterHome />

    <TableHome />
    <teleport to="body">
      <AppModal v-if="isModal" title="Создать заявку" @closeModal="modalOpen">
        <ModalHome />
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

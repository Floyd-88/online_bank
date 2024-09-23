<script setup lang="ts">
import type { RequestI } from '@/types/types'
import { currency } from '@/utils/sum';
import AppStatus from '../ui/AppStatus.vue';
import { useRouter } from 'vue-router';
const router = useRouter()

defineProps<{ requests: RequestI[] }>()
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th>#</th>
        <th>ФИО</th>
        <th>Телефон</th>
        <th>Сумма</th>
        <th>Статус</th>
        <th>Действие</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(request, index) in requests" :key="request.id">
        <td>{{ index + 1 }}</td>
        <td>{{ request.name }}</td>
        <td>{{ request.phone }}</td>
        <td>{{ currency(request.sum) }}</td>
        <td>
          <AppStatus :status="request.status"/>
        </td>
        <td>
          <router-link :to="`/request/${request.id}`">
            <button class="btn-open">Открыть</button>
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>

</template>

<style scoped lang="scss">
.table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 18px;
  text-align: left;
}

.table thead tr {
  background-color: #69746a;
  color: white;
  text-align: center;
  font-size: 15px;
}

.table th,
.table td {
  padding: 12px 15px;
  border: 1px solid #ddd;
}

.table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

.table tbody tr:hover {
  background-color: #f1f1f1;
}

.btn-open {
  background-color: transparent;
  color: #48ba48;
  padding: 5px 15px;
  border: 1px solid #48ba48;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c4dbc4;
  }
}

.table td {
  text-align: center;
}

.table th {
  text-align: center;
}


</style>

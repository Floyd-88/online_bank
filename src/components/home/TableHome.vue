<script setup lang="ts">
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
    <tr>
      <td>1</td>
      <td>Иванов Иван Иванович</td>
      <td>+757348534564</td>
      <td>1 000 000,00 Р</td>
      <td><span class="table__status table__status--color-green">Активен</span></td>
      <td>
        <button class="btn-open">Открыть</button>
      </td>
    </tr>

    <tr>
      <td>1</td>
      <td>Иванов Иван Иванович</td>
      <td>+757348534564</td>
      <td>1 000 000,00 Р</td>
      <td><span class="table__status table__status--color-green">Завершен</span></td>
      <td>
        <button class="btn-open">Открыть</button>
      </td>
    </tr>

    <tr>
      <td>1</td>
      <td>Иванов Иван Иванович</td>
      <td>+757348534564</td>
      <td>1 000 000,00 Р</td>
      <td><span class="table__status table__status--color-red">Отменен</span></td>
      <td>
        <button class="btn-open">Открыть</button>
      </td>
    </tr>

    <tr>
      <td>1</td>
      <td>Иванов Иван Иванович</td>
      <td>+757348534564</td>
      <td>1 000 000,00 Р</td>
      <td><span class="table__status table__status--color-green">В ожидание</span></td>
      <td>
        <button class="btn-open">Открыть</button>
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

.table th, .table td {
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
      background-color:#c4dbc4
    }
}

.table td {
  text-align: center;
}

.table th {
  text-align: center;
}

.table__status {

    padding: 4px 5px;
    border-radius: 15px;
    font-size: 15px;
}

.table__status--color-green {
    border: 1px solid #69a269;
    color: #69a269;
}

.table__status--color-red {
    border: 1px solid red;
    color: red;
}

</style>

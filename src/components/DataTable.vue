<script setup>
defineProps({
  data: { type: Object, default: [] },
  fields: { type: Object, default: [] },
}); //input props for this component
</script>

<template>
  <!-- {{ fields }} -->
  <table>
    <thead>
      <th v-for="(field, index) in fields" :key="index">{{ field.label }}</th>
    </thead>
    <tbody>
      <tr v-for="(item, j) in data" :key="j">
        <!-- props -->

        <td v-for="(field, i) in fields" :key="i">
          {{ item[field.key] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
/* Scoped is only for this Vue file */

table {
  width: 100%;
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 16px;
  text-align: left;
}

table th {
  padding: 15px 10px;
  border-bottom: 1px solid #ddd;
}
table td {
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
}

table th {
  background-color: #f3f3f3;
  font-weight: bold;
  color: #333;
}

table tbody tr:hover {
  background-color: #3e3e3e;
}
</style>

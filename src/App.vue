<script setup lang="ts">
import CarTable from './components/CarTable.vue';
import RoiChart from './charts/RoiChart.vue';
import ProfitChart from './charts/ProfitChart.vue';
</script>

<template>
  <b-container fluid>
    <b-row>
      <b-col cols="6">
        <CarTable></CarTable>
      </b-col>
      <b-col cols="3">
        <RoiChart></RoiChart>
      </b-col>
      <b-col cols="3">
        <ProfitChart></ProfitChart>
      </b-col>
    </b-row>
  </b-container>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

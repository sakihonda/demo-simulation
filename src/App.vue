<script setup lang="ts">
import CarTable from './components/CarTable.vue';
import CompareTable from './components/CompareTable.vue';
import RoiChart from './charts/RoiChart.vue';
import ProfitChart from './charts/ProfitChart.vue';
import SmartPhone from './components/SmartPhone.vue';

const isSmartPhone = function():boolean{
  if (navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/i)) {
    return true;
  } else {
    return false;
  }
}
</script>

<template>
<div v-if="isSmartPhone()">
  <SmartPhone></SmartPhone>
</div>

<div v-else>
  <b-container fluid>
    <b-row>
      <b-col cols="7">
        <CarTable></CarTable>
      </b-col>
      <b-col cols="5">
        <b-row>
          <CompareTable></CompareTable>
        </b-row>
        <b-row>
          <b-col cols="6">
            <RoiChart></RoiChart>
          </b-col>
          <b-col cols="6">
            <ProfitChart></ProfitChart>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</div>
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

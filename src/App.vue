<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
//import HelloWorld from './components/HelloWorld.vue'
//import HomeChart from './components/HomeChart.vue';

import CarTable from './components/CarTable.vue';
import RoiChart from './components/RoiChart.vue';
import ProfitChart from './components/ProfitChart.vue';
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

<script setup lang="ts">
import CarTable from './components/CarTable.vue';
import CompareTable from './components/CompareTable.vue';
import RoiChart from './charts/RoiChart.vue';
import ProfitChart from './charts/ProfitChart.vue';
import SmartPhone from './components/SmartPhone.vue';
import { isSmartPhone,isDesktop } from './use/detectDevice';

</script>

<template>
<div v-if="isSmartPhone()">
  <SmartPhone></SmartPhone>
</div>

<div v-else>
  <div 
    class="px-4"
    :class="{'container-fluid':isDesktop(), 'container-xxl':!isDesktop()}">
    <div class="row">

      <div class="col-7">
        <CarTable></CarTable>
      </div>

      <div class="col-5">
        <div class="row">
          <CompareTable></CompareTable>
        </div>
        <div class="row">
          <div class="col-6">
            <RoiChart></RoiChart>
          </div>
          <div class="col-6">
            <ProfitChart></ProfitChart>
          </div>
        </div>
      </div>

    </div>
  </div>
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

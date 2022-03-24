<script setup lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import { useStore } from '../stores/roi';
import { storeToRefs } from "pinia";

Chart.register(...registerables); //chart.jsのおまじない

const store = useStore() //グラフデータをstoresから読み込み
const { data } = storeToRefs(store) //refに変換

const barRef = ref();　//chart.jsのおまじない
const testData = computed(() => ({
  labels: ['20X1', '20X2', '20X3', '20X4', '20X5'],
  datasets: [
    {
      data: data.value, //storesから取得したデータをここに放り込む
      backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
    },
  ],
}));

</script>

<template>
  <BarChart ref="barRef" :chartData="testData" />
  <p>{{data}}</p>
  <button @click="store.update()">あああ</button>

</template>
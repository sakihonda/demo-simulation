<script setup lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import { useStore } from '../stores/roi';
import { storeToRefs } from "pinia";
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(...registerables); //chart.jsのおまじない
Chart.register(annotationPlugin);

const store = useStore() //グラフデータをstoresから読み込み
const { roi } = storeToRefs(store) //refに変換

const barRef = ref();　//chart.jsのおまじない
const testData = computed(() => ({
  labels: ['20X1', '20X2', '20X3', '20X4', '20X5'],
  datasets: [
    {
      label: '利益(全体)',
      data: roi.value, //storesから取得したデータをここに放り込む
    },
  ],
}));

const options = ref({
  responsive: true,
  maintainAspectRatio: true,
  legend:{
    display:false,
  },
  plugins: {
    annotation: { 
      annotations: [{ 
        type: 'line', // 線を描画
        yMin: 6,
        yMax: 6,
        borderWidth: 2, // 基準線の太さ
        borderColor: '#77A3BD',  // 基準線の色
      }] 
    },
  }
})

</script>

<template>
  <BarChart ref="barRef" :chartData="testData" :options="options" />
</template>
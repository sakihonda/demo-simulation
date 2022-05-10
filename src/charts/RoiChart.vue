<script setup lang="ts">
import { ref, computed } from 'vue';
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import { useDataAll } from '../stores/dataAll';
import { storeToRefs } from "pinia";
import { calcChartData, calcChartAccumlatedData, RoundNum } from '../use/calcChart'
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(...registerables); //chart.jsのおまじない
Chart.register(annotationPlugin);

const store = useDataAll() //グラフデータをstoresから読み込み
const { initialCostsAll, riekiAll, carNumAllRatio} = storeToRefs(store) //refに変換

const barRef = ref();　//chart.jsのおまじない

const testData = computed(() => ({
  labels: ['20X1', '20X2', '20X3', '20X4', '20X5'],
  datasets: [
    {
            type: 'line',
            label: '初期投資(千)',
            data: [RoundNum(initialCostsAll.value), RoundNum(initialCostsAll.value), RoundNum(initialCostsAll.value), RoundNum(initialCostsAll.value), RoundNum(initialCostsAll.value),],
            borderColor:'#77A3BD',
            backgroundColor: '#77A3BD'
    },
    {
      label: '累積利益(千)',
      data: calcChartAccumlatedData(riekiAll.value, carNumAllRatio.value)
    },
  ],
}));

const options = ref({
  //responsive: true,
  //maintainAspectRatio: true,
  legend:{
    display:false,
  },
  scales: {
    y: {
      max: 200000,
      min: -150000,
      ticks: {
        stepSize: 50000,
      }
    }
  },
  // plugins: {
  //   annotation: { 
  //     annotations: { 
  //       line1: {
  //         drawtime: 'beforeDatasetsDraw',
  //         type: 'line', // 線を描画
  //         yMin: 60, 
  //         yMax: 60,
  //         borderWidth: 2, // 基準線の太さ
  //         borderColor: '#77A3BD',  // 基準線の色
  //       }
  //     }
  //   },
  // }
})

</script>

<template>
  <BarChart ref="barRef" :chartData="testData" :options="options" />
  <p>investment:   {{initialCostsAll.toLocaleString()}}</p>
  <p>利益：  {{calcChartData(riekiAll, carNumAllRatio)}}</p>
</template>
<script setup lang="ts">
// @ts-nocheck
import { ref, computed } from 'vue';
import { Bar } from 'vue-chartjs';
import type { ChartOptions, ChartData } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation'
import { useDataAll } from '../stores/dataAll';
import { storeToRefs } from "pinia";
import { calcChartAccumlatedData, RoundNum } from '../use/calcChart'
import { Chart } from 'chart.js'
Chart.register(annotationPlugin);

const store = useDataAll() //グラフデータをstoresから読み込み
const { initialCostsAll, riekiAll, carNumAllRatio} = storeToRefs(store) //refに変換

const setInitialCostsLine = function():number{
  if (initialCostsAll.value > 200000000){
    return 199000
  }else{
    return RoundNum(initialCostsAll.value)
  }
}

const testData = computed(():ChartData<'bar'> => ({
  labels: ['20X1', '20X2', '20X3', '20X4', '20X5'],
  datasets: [
    // {
    //         type: 'line',
    //         label: '初期投資(千)',
    //         data: setInitialCostsLine(),
    //         borderColor:'#77A3BD',
    //         backgroundColor: '#77A3BD'
    // },
    {
      label: '累積利益(千)',
      data: calcChartAccumlatedData(riekiAll.value, carNumAllRatio.value)
    },
  ],
}))

const options = computed(():ChartOptions => ({
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
  plugins: {
    annotation: { 
      annotations: { 
        line1: {
          type: 'line', // 線を描画
          yMin: setInitialCostsLine,
          yMax: setInitialCostsLine,
          borderWidth: 3, // 基準線の太さ
          borderColor: '#77A3BD',  // 基準線の色
          label: {
            backgroundColor: '#77A3BD',
            content: '初期投資',
            enabled: true
          },
        }
      }
    },
  }
}))

</script>

<template>
  <p class="mb-0">投資対利益</p>
  <Bar :chart-data="testData" :chart-options="options" />
  <!--<p>investment:   {{initialCostsAll.toLocaleString()}}</p>
  <p>利益：  {{calcChartData(riekiAll, carNumAllRatio)}}</p>-->
</template>

<style scoped>
@media screen and (max-width:1400px) {
  p{
    font-size: 0.9rem;
  }
}
</style>
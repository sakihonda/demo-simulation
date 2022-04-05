<script setup lang="ts">
import { ref, computed } from 'vue';
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import { useDataAll } from '../stores/dataAll';
import { storeToRefs } from "pinia";
import { calcChartData, calcChartAccumlatedData } from '../use/calcChart'
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(...registerables); //chart.jsのおまじない
Chart.register(annotationPlugin);

const store = useDataAll() //グラフデータをstoresから読み込み
const { initialCostsAll, riekiAll, carNumAllRatio,aaa} = storeToRefs(store) //refに変換

const barRef = ref();　//chart.jsのおまじない

const testData = computed(() => ({
  labels: ['20X1', '20X2', '20X3', '20X4', '20X5'],
  datasets: [
    // {
    //         type: 'line',
    //         label: '初期投資',
    //         data: [initialCostsAll.value,initialCostsAll.value,initialCostsAll.value,initialCostsAll.value,initialCostsAll.value], //利益
    //         borderColor:'#77A3BD',
    //         backgroundColor: '#77A3BD'
    // },
    {
      label: '利益(全体)',
      //data: calcChartData(riekiAll.value, carNumAllRatio.value)
      data: calcChartAccumlatedData(riekiAll.value, carNumAllRatio.value)
      //data:[103000000]
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
        //suggestedMin: 50,
        suggestedMax: 103000000
    }
  },
  plugins: {
    annotation: { 
      annotations: { 
        line1: {
          drawtime: 'beforeDatasetsDraw',
          type: 'line', // 線を描画
          //yMin: initialCostsAll.value,
          //yMax: initialCostsAll.value,
          yMin: aaa.value,
          yMax: aaa.value,
          borderWidth: 2, // 基準線の太さ
          borderColor: '#77A3BD',  // 基準線の色
        }
      }
    },
  }
})

</script>

<template>
  <BarChart ref="barRef" :chartData="testData" :options="options" />
  <p>investment:   {{initialCostsAll.toLocaleString()}}</p>
  <p>利益：  {{calcChartData(riekiAll, carNumAllRatio)}}</p>
</template>
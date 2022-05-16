<script setup lang="ts">
// @ts-nocheck
import { ref, computed } from 'vue';
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import annotationPlugin from 'chartjs-plugin-annotation';
import { RoundNum } from '../use/calcChart'

Chart.register(...registerables); //chart.jsのおまじない
Chart.register(annotationPlugin);
const barRef = ref();　//chart.jsのおまじない

const props = defineProps({
  profit: {
    type: Number,
    required: true
  }
})

function bgColor() {
  let color = 'rgba(0, 0, 0, 0.1)'
  if (props.profit > 0){
    color = '#D5E4ED'
  }else if (props.profit < 0){
    color = '#EDB7B7'
  }
  return color
}

const chartData = computed(() => ({
    labels: [''],//必ず用意しないといけない
    datasets: [
    {
        label: '利益',
        data: [RoundNum(props.profit)], //storesから取得したデータをここに放り込む
        backgroundColor: bgColor()
    },
    ],
}));

const options = ref({
    indexAxis: 'y',
    plugins: {
      legend: {
          display: false,
      },
      annotation: { 
        annotations: [{ 
          type: 'line', // 線を描画
          xMin: 0,
          xMax: 0,
          borderWidth: 2, // 基準線の太さ
          borderColor: 'rgba(0, 0, 0, 0.1)',  // 基準線の色
        }] 
      },
      tooltip: {
        enabled: true,
        displayColors:false,
        callbacks: {
          label: function(context) {
            let label = context.dataset.data[context.dataIndex];
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        min: -200000,
        max: 200000,
        ticks: {
          display: false,
        },
        beginAtZero: true
      }
    }
})

</script>

<template>
  <BarChart ref="barRef" :chartData="chartData" :options="options" />
</template>
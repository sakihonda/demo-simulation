<script setup lang="ts">
// @ts-nocheck
import { computed } from 'vue';
import { Bar } from 'vue-chartjs';
import type {  ChartOptions, ChartData } from 'chart.js';
//import type { TChartData } from 'vue-chartjs/dist/types';
import { RoundNum } from '../use/calcChart'
import { isDesktop } from '../use/detectDevice'

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

const chartData = computed(():ChartData<'bar'> => ({
    labels: [''],//必ず用意しないといけない
    datasets: [
    {
        label: '利益',
        data: [RoundNum(props.profit)], //storesから取得したデータをここに放り込む
        backgroundColor: bgColor()
    },
    ],
}))

const options = computed(():ChartOptions => ({
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
}))

const height = function():number{
  if (isDesktop == true){
    return 90
  }else{
    return 70
  }
}

const width = function():number{
  if (isDesktop == true){
    return 100
  }else{
    return 90
  }
}

</script>

<template>
  <Bar :chart-data="chartData" :chart-options="options" :height="height()" :width="width()" />
</template>
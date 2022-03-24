<script setup lang="ts">
import { Chart, registerables } from 'chart.js';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useProfit } from '../stores/profit';
import { BarChart } from 'vue-chart-3';


Chart.register(...registerables);
const barRef = ref();

const profitStore = useProfit()
const { revenue, cog, profit } = storeToRefs(profitStore)

const chartData = computed(() => ({
    labels: ['20X1', '20X2', '20X3', '20X4', '20X5'],
    datasets: [
        {
            type: 'line',
            data: profit.value, //利益
            borderColor:'#77A3BD',
        },
        {
            data: revenue.value, //売上
            backgroundColor:'#D5E4ED'
        },
        {
            data: cog.value, //コスト
        },
    ],
    options: {
        responsive: true,
        maintainAspectRatio: true,
        legend:{
            display:false,
        },
        scales: { 
            yAxes: [{
                ticks: {
                    min:-600,
                    max:1000,
                    //beginAtZero: false,
                    stepSize: 200,
                    //maxTicksLimit:12
                }
            }]
        },
    },
}))

</script>

<template>
    <BarChart ref="barRef" :chartData="chartData" />
</template>
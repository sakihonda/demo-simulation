<script setup lang="ts">
import { Chart, registerables } from 'chart.js';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useDataAll } from '../stores/dataAll';
import { BarChart } from 'vue-chart-3';
import { calcChartData } from '../use/calcChart'


Chart.register(...registerables);
const barRef = ref();

const { uriageAll, cogAll, riekiAll, carNumAllRatio} = storeToRefs(useDataAll())

const chartData = computed(() => ({
    labels: ['20X1', '20X2', '20X3', '20X4', '20X5'],
    datasets: [
        {
            type: 'line',
            label: '利益',
            data: calcChartData(riekiAll.value, carNumAllRatio.value), //利益
            borderColor:'#77A3BD',
            backgroundColor: '#77A3BD'
        },
        {
            label: '売上',
            data: calcChartData(uriageAll.value, carNumAllRatio.value), //売上
            backgroundColor:'#D5E4ED'
        },
        {
            label: '売上原価',
            data: calcChartData(cogAll.value, carNumAllRatio.value), //コスト
        },
    ],
}))

const options = ref({
    //responsive: true,
    //maintainAspectRatio: true,
    legend:{
        display:false,
    },
    scales: {
        // y: {
        //     max: 90000000,
        //     min: -150000000,
        //     ticks: {
        //         stepSize: 100000000,
        //     }
        // }
    },
})

</script>

<template>
    <p class="mb-0">売上高と売上原価</p>
    <BarChart ref="barRef" :chartData="chartData" :options="options" />
    <p>売上　{{calcChartData(uriageAll, carNumAllRatio)}}　</p>
    <p>cog {{calcChartData(cogAll, carNumAllRatio)}}</p>
    <p>利益　{{calcChartData(riekiAll, carNumAllRatio)}}　</p>
</template>
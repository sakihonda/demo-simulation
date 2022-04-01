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
            label: '利益',
            data: profit.value, //利益
            borderColor:'#77A3BD',
            backgroundColor: '#77A3BD'
        },
        {
            label: '売上',
            data: revenue.value, //売上
            backgroundColor:'#D5E4ED'
        },
        {
            label: 'コスト',
            data: cog.value, //コスト
        },
    ],
}))

const options = ref({
    responsive: true,
    maintainAspectRatio: true,
    legend:{
        display:false,
    },
})

</script>

<template>
    <BarChart ref="barRef" :chartData="chartData" :options="options" />
</template>
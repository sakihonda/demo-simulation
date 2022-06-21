<script setup lang="ts">
// @ts-nocheck
import { storeToRefs } from 'pinia';
import { computed} from 'vue';
import { useDataAll } from '../stores/dataAll';
import { Bar } from 'vue-chartjs';

import { calcChartData } from '../use/calcChart'

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

const options = computed(() => ({
    legend:{
        display:false,
    },
}))


</script>

<template>
    <p class="mb-0">売上高と売上原価</p>
    <Bar :chart-data="chartData" :chart-options="options" />
    <!--<p>売上　{{calcChartData(uriageAll, carNumAllRatio)}}　</p>
    <p>cog {{calcChartData(cogAll, carNumAllRatio)}}</p>
    <p>利益　{{calcChartData(riekiAll, carNumAllRatio)}}　</p>-->
</template>

<style scoped>
@media screen and (max-width:1400px) {
  p{
    font-size: 0.9rem;
  }
}
</style>
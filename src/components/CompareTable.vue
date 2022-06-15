<script setup lang="ts">
import { storeToRefs } from "pinia";

import { RoundNum } from "../use/calcChart";

//stores
import { useDataAll } from '../stores/dataAll';

const storeDataAll = useDataAll()
const {uriageAll, cogAll, initialCostsAll, riekiAll, roiAll} = storeToRefs(storeDataAll) //refに変換

const showRoi = function(roi: number) :number{
    let roi1 = roi * 100
    roi1 = Math.round( roi1 * 100 ) / 100
    return roi1
}

</script>

<template>
    <p>全体比較(単位:千円) / 5カ年</p>
    <table class="table mb-5">
        <thead>
        <tr>
          <th>ROI</th>
          <th>売上</th>
          <th>売上原価</th>
          <th>利益</th>
          <th>初期投資</th>
        </tr>
        </thead>
        <tbody>
            <tr>
                <td class="blue">{{showRoi(roiAll)}}%</td>
                <td>{{RoundNum(uriageAll).toLocaleString()}}</td>
                <td>{{RoundNum(cogAll).toLocaleString()}}</td>
                <td>{{RoundNum(riekiAll).toLocaleString()}}</td>
                <td>{{RoundNum(initialCostsAll).toLocaleString()}}</td>
            </tr>
        </tbody>
    </table>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.blue{
  background-color: #cedbe2;
}

@media screen and (max-width:1400px) {
  p{
    font-size: 0.9rem;
  }
  table *{
    font-size: 0.8rem;
  }
}

</style>

<script setup lang="ts">
//import { ref } from "vue";
import { useStore } from '../stores/roi';
import { useCars } from '../stores/cars';
import { useProfit } from '../stores/profit';
import { storeToRefs } from "pinia";
import CarProfitChart from '../components/CarProfitChart.vue'

//carsのデータ
const storeCars = useCars()
const { cars }  = storeToRefs(storeCars)

//roiのデータ
let { roi } = storeToRefs(useStore())

//profit,revenue,cogのデータ
let { revenue, cog, profit } = storeToRefs(useProfit())

//3点いずれか変更したら走るよ
function calc_rieki(car) {
  if(car.sell){
    car.rieki = 400000
    roi.value = [1,2,3,4,5]
    revenue.value = [0,0,0,0,0]
  }else{
    car.rieki = 0
    roi.value = [5,4,3,2,1]
  }
}
</script>

<template>
  <table class="table table-bordered">
    <thead>
      <tr>
        <th></th>
        <th>販売する</th>
        <th>商品</th>
        <th>価格</th>
        <th>利益</th>
        <th>メーカー</th>
        <th>タイプ</th>
        <th>車種</th>
        <th>生産台数</th>
        <th>取引実績</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="car in cars" 
          :key="car.id" 
          :class="{gray: !car.sell}">

        <td>{{ car.id }}</td>

        <td> 
          <input type="checkbox" id="checkbox"
            v-model="car.sell"
            @change="calc_rieki(car)"
          />
        </td>
        <td>
          <p>
            <select 
              v-model="car.product_quality"
              @change="calc_rieki(car)"
            >
              <option>プレミアム</option>
              <option>標準</option>
            </select>
          </p>
          <p>{{ car.product_length }}cm</p>
        </td>
        <td>
          <input 
            type="number" 
            v-model="car.price"
            @change="calc_rieki(car)"
          />
        </td>
        <td style="width: 100px; height: 100px;">
          <CarProfitChart :profit="car.rieki"></CarProfitChart>
        </td>

        <td>{{car.name}}</td>
        <td>{{ car.companyType }}</td>
        <td>{{ car.carType }}</td>
        <td>{{car.carNum}}</td>
        <td>
          <span v-if="car.record">◯</span>
          <span v-else></span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.gray{
  background-color:rgb(226, 225, 225);
  color: gray;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

input {
  max-width: 80px;
}
</style>

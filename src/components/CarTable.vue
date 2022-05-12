<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

import CarProfitChart from '../charts/CarProfitChart.vue'

//stores
import { useCars } from '../stores/cars'
import { useCostDefaults } from '../stores/costDefaults'
//import { usePreviousDataAll } from "../stores/previousDataAll";

//carsのデータ
const storeCars = useCars()
const { cars }  = storeToRefs(storeCars)

//costDefaultsのデータ
const { calcCostMaterial, calcCostProduction, calcCostInvestment, calcCostDevelopment, calcCostSales } = storeToRefs(useCostDefaults())

//previous data
//const storePreviousDataAll = usePreviousDataAll()

const setCog = function(car): void {
  car.cog.material = calcCostMaterial.value(car.product.length, car.carNum)
  car.cog.production = calcCostProduction.value(car.carNum)
}

const setInitialCostsStatic = function(car): void {
  car.initialCosts.sales = calcCostSales.value(car.sales.days)
}

const setInitialCostsDynamic = function(car): void {
  car.initialCosts.investment = calcCostInvestment.value(car.product.length, car.product.quality, car.carNum)
  car.initialCosts.development = calcCostDevelopment.value(car.carNum)
}

//販売する checkbox
const changeSell = function(car): void {
  if (car.sell){
    setCog(car)
    setInitialCostsStatic(car)

  }else{
    car.cog.material = 0
    car.cog.production = 0
    car.initialCosts.sales = 0
  }
  for (let i=0; i < cars.value.length; i++){
    setInitialCostsDynamic(cars.value[i])
  }
}

// 商品の種類 select box
// const changeProductOrPrice = function(car){
//   for (let i=0; i < cars.value.length; i++){
//     setInitialCostsDynamic(cars.value[i])
//   }
// }

// 商品の価格 input box
const changeProductOrPrice = function(car){
  let priceLine: number
  if (car.product.quality == '標準' && car.sales.record == true){
    priceLine = 5000
  }else if(car.product.quality == '標準' && car.sales.record == false){
    priceLine = 4000
  }else if(car.product.quality == 'プレミアム' && car.sales.record == true){
    priceLine = 6000
  }else if(car.product.quality == 'プレミアム' && car.sales.record == false){
    priceLine = 5000
  }

  if (car.price < priceLine){
    car.isProperPrice = true
    setCog(car)
    setInitialCostsStatic(car)
  }else{
    car.isProperPrice = false
    car.cog.material = 0
    car.cog.production = 0
    car.initialCosts.sales = 0
  }
  for (let i=0; i < cars.value.length; i++){
    setInitialCostsDynamic(cars.value[i])
  }
}

onMounted(() => {
  storeCars.getCars()
  for (let i=0; i < cars.value.length; i++){
    setCog(cars.value[i])
    setInitialCostsStatic(cars.value[i])
    setInitialCostsDynamic(cars.value[i])
  }
})

</script>

<template>
  <table class="table table-bordered">
    <thead>
      <tr>
        <th></th>
        <th>販売する</th>
        <th>商品</th>
        <th>価格</th>
        <th>利益(千)</th>
        <th>メーカー</th>
        <th>タイプ</th>
        <th>車種</th>
        <th>販売可能台数</th>
        <th>営業工数</th>
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
            @change="changeSell(car)"
          />
        </td>
        <td>
          <p>
            <select 
              v-model="car.product.quality"
              @change="changeProductOrPrice(car)"
            >
              <option>プレミアム</option>
              <option>標準</option>
            </select>
          </p>
          <p>{{ car.product.length }}cm</p>
        </td>
        <td>
          <input 
            type="number"
            step="500"
            v-model="car.price"
            @change="changeProductOrPrice(car)"
          />
        </td>
        <td style="width: 100px; height: 100px;">
          <CarProfitChart :profit="car.rieki"></CarProfitChart>
        </td>

        <td>{{car.profile.name}}</td>
        <td>{{ car.profile.companyType }}</td>
        <td>{{ car.profile.carType }}</td>
        <td><span>{{car.carNum.toLocaleString()}}</span></td>
        <td>{{ car.sales.days }}</td>
        <td>
          <span v-if="car.sales.record">◯</span>
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

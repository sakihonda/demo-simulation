<script setup lang="ts">
// @ts-nocheck
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

import CarProfitChart from '../charts/CarProfitChart.vue'

//stores
import { useCars } from '../stores/cars'
import { useCostDefaults } from '../stores/costDefaults'

//use
import { setPriceLine } from "../use/priceLine"

//type
import type { carType } from "../types/carType";

//carsのデータ
const storeCars = useCars()
const { cars }  = storeToRefs(storeCars)

//costDefaultsのデータ
const { calcCostMaterial, calcCostProduction, calcCostInvestment, calcCostDevelopment, calcCostSales } = storeToRefs(useCostDefaults())

//typescriptのエラー回避のためのアノテーション
const tsEventTarget = (event: Event) => 
      (event.target as HTMLInputElement)

const setCog = function(car:carType): void {
  car.cog.material = calcCostMaterial.value(car.product.length, car.carNum, car.product.quality)
  car.cog.production = calcCostProduction.value(car.carNum)
}

const setInitialCostsStatic = function(car:carType): void {
  car.initialCosts.sales = calcCostSales.value(car.sales.days)
}

//for文が必要
const setInitialCostsDynamic = function(car:carType): void {
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


// 商品の価格 または 種類の変更
const changeProductOrPrice = function(car:carType){
  console.log('価格変えたよ')
  let priceLine: number = setPriceLine(car.product.length, car.product.quality, car.sales.record)
  if (car.price <= priceLine){
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

let timeOut = null
const inputTimeOut = function(e){
  clearTimeout(timeOut)
  timeOut = setTimeout(()=>{
    e.target.blur()
  }, 1000)
}

</script>

<template>
  <b-table-simple hover>
    <b-thead>
      <b-tr>
        <b-th></b-th>
        <b-th>販売する</b-th>
        <b-th>商品タイプ</b-th>
        <b-th>価格</b-th>
        <b-th>利益(千)</b-th>
        <b-th>顧客セグメント</b-th>
        <b-th>タイプ</b-th>
        <b-th>車種</b-th>
        <b-th>販売可能台数</b-th>
        <b-th>営業工数</b-th>
        <b-th>取引実績</b-th>
      </b-tr>
    </b-thead>
    <b-tbody class="align-middle">
      <tr v-for="car in cars"
          :key="car.id"
          :class="{gray: !car.sell}">

        <b-td>{{ car.id }}</b-td>

        <td style="padding:0; max-width:30px;"> 
          <input class="form-check-input"
            type="checkbox"
            v-model="car.sell"
            @change="changeSell(car)"
            style="width:1.5em; height:1.5em;"
          />
        </td>
        <td style="position: relative; min-width:100px;">
            <select class="form-select"
              v-model="car.product.quality"
              @change="changeProductOrPrice(car)"
              :disabled="!car.sell"
              style="position:absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"
            >
              <option>プレミアム</option>
              <option>標準</option>
            </select>

          <span
            style="position:absolute; top: 100%; left: 75%; transform: translate(-120%, -120%);"
          >
            幅:{{ car.product.length }}cm
          </span>
        </td>
        <b-td style="min-width:130px;">
          <b-input-group prepend="¥">
            <input class="form-control"
              ref="target"
              type="number"
              step="500"
              v-model.lazy="car.price"
              @focus="tsEventTarget($event).select()"
              @keyup="inputTimeOut"
              @change="changeProductOrPrice(car)"
              :disabled="!car.sell"
            />
          </b-input-group>
        </b-td>
        <td style="width: 100px; height: 100px;">
          <CarProfitChart :profit="car.rieki"></CarProfitChart>
        </td>

        <b-td>{{car.profile.name}}</b-td>
        <b-td>{{ car.profile.companyType }}</b-td>
        <b-td>{{ car.profile.carShurui }}</b-td>
        <b-td><span>{{car.carNum.toLocaleString()}}</span></b-td>
        <b-td>{{ car.sales.days }}</b-td>
        <b-td>
          <span v-if="car.sales.record">◯</span>
          <span v-else></span>
        </b-td>
      </tr>
    </b-tbody>
  </b-table-simple>
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

td {
  font-size: 0.9rem;
}
</style>

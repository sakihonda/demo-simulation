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
import { isDesktop } from "../use/detectDevice";

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
  <table class="table table-hover"
    :class="{'table-sm':!isDesktop()}">
    <thead>
      <tr>
        <th></th>
        <th>販売する</th>
        <th>商品タイプ</th>
        <th>価格</th>
        <th>利益(千)</th>
        <th>顧客セグメント</th>
        <th>タイプ</th>
        <th>車種</th>
        <th>販売可能台数</th>
        <th>営業工数</th>
        <th>取引実績</th>
      </tr>
    </thead>
    <tbody class="align-middle">
      <tr v-for="car in cars"
          :key="car.id"
          :class="{gray: !car.sell}">

        <td>{{ car.id }}</td>

        <td class="checkbox-sell-td"> 
          <input class="form-check-input checkbox-sell"
            type="checkbox"
            v-model="car.sell"
            @change="changeSell(car)"
          />
        </td>
        <td class="select-product-td">
            <select class="form-select select-product"
              v-model="car.product.quality"
              @change="changeProductOrPrice(car)"
              :disabled="!car.sell"
            >
              <option>プレミアム</option>
              <option>標準</option>
            </select>

          <span class="select-product-span"
          >
            幅:{{ car.product.length }}cm
          </span>
        </td>
        <td class="input-price-td">
          <div class="input-group input-price-group">
            <span class="input-group-text">¥</span>
            <input class="form-control input-price"
              ref="target"
              type="number"
              step="500"
              v-model.lazy="car.price"
              @focus="tsEventTarget($event).select()"
              @keyup="inputTimeOut"
              @change="changeProductOrPrice(car)"
              :disabled="!car.sell"
            />
          </div>
        </td>
        <td class="chart-td">
          <CarProfitChart :profit="car.rieki"></CarProfitChart>
        </td>

        <td>{{car.profile.name}}</td>
        <td>{{ car.profile.companyType }}</td>
        <td>{{ car.profile.carShurui }}</td>
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

.checkbox-sell-td{
  padding:0; 
  max-width:30px;
}
.checkbox-sell{
  width:1.5em; 
  height:1.5em;
}

.select-product-td{
  position: relative;
  min-width:130px;
}

.select-product {
  position:absolute; 
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%);
}

.select-product-span{
  position:absolute; 
  top: 100%; 
  left: 60%; 
  transform: translate(-120%, -120%);
}

.input-price-td{
  min-width:130px;
}

.input-price{
  max-width: 89px;
}

.chart-td{
  width: 130px;
  height: 100px;
}

td {
  font-size: 0.9rem;
}

@media screen and (max-width:1400px) {
  td, th {
    font-size: 0.7rem;
  }

  .select-product-td{
    min-width:107px;
  }
  .select-product {
    font-size: 0.7rem;
  }

  .select-product-span{
    left:55%;
  }

  .input-price-td{
    min-width:92px;
  }

  .input-price-group *{
    font-size: 0.7rem;
  }

  .input-price{
    max-width: 75px;
  }

  .chart-td{
    width: 80px; 
    height: 80px;
  }


}

</style>

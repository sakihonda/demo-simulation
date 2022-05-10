<script setup lang="ts">
import { onMounted } from "vue";
//import { useStore } from '../stores/roi';

//import { useProfit } from '../stores/profit';
import { storeToRefs } from "pinia";
import CarProfitChart from '../charts/CarProfitChart.vue'

//stores
import { useCars } from '../stores/cars'
import { useCostDefaults } from '../stores/costDefaults'

//carsのデータ
const storeCars = useCars()
const { cars }  = storeToRefs(storeCars)

//costDefaultsのデータ
const { calcCostMaterial, calcCostProduction, calcCostInvestment, calcCostDevelopment, calcCostSales } = storeToRefs(useCostDefaults())


//roiのデータ
//let { roi } = storeToRefs(useStore())

//profit,revenue,cogのデータ
//let { revenue, cog, profit } = storeToRefs(useProfit())

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

//売るか売らないか
const changeSell = function(car): void {
  //console.log(car.carNum)
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

const changeProduct = function(car){
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
        <th>生産台数</th>
        <th>営業日数</th>
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
              @change="changeProduct(car)"
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
            step="1000"
            v-model="car.price"
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

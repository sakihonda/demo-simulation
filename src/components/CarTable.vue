<script setup lang="ts">
//import { ref } from "vue";
//import { useStore } from '../stores/roi';
import { useCars } from '../stores/cars';
import { storeToRefs } from "pinia";

////const store = useStore()

//cars
const storeCars = useCars()
const { cars }  = storeToRefs(storeCars)

function is_sell(car) {
  car.sell = !car.sell;
  calc_rieki(car);
}

function calc_rieki(car) {
  if(car.sell){
    car.rieki = 400000
  }else{
    car.rieki = 0
  }
}
</script>

<template>
{{cars}}
  <table class="table table-bordered">
    <thead>
      <tr>
        <th>販売するか否か</th>
        <th>顧客</th>
        <th>商品タイプ</th>
        <th>価格</th>
        <th>利益</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="car in cars" 
          :key="car.id" 
          :class="{gray: !car.sell}">
        <td> 
          <input type="checkbox" id="checkbox"
            v-model="car.sell"
            @click="is_sell(car)"
          />
        </td>
        <td>{{car.name}}</td>
        <td>{{car.product}}</td>
        <td>{{car.price}}</td>
        <td>{{car.rieki}}</td>
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
</style>

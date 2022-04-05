import { defineStore } from 'pinia'
import { useCars } from "./cars";

export const useDataAll = defineStore('dataAll', {
    //初期値
    state: () => ({
        aaa : 10000000,
        get uriageAll(){
          const storeCars = useCars()
          const ttl = storeCars.cars.reduce(function(sum, car){
            return sum + (car.uriage)
          }, 0)
          return ttl
        },
        get cogAll(){
          const storeCars = useCars()
          const ttl = storeCars.cars.reduce(function(sum, car){
            return sum + (car.cogTotal)
          }, 0)
          return ttl
        },
        //これだけトータルでOK
        get initialCostsAll(){
          const storeCars = useCars()
          const ttl = storeCars.cars.reduce(function(sum, car){
            return sum + (car.initialCostsTotal)
          }, 0)
          return ttl
        },
        get riekiAll(){
          const ttl = this.uriageAll - this.cogAll - this.initialCostsAll
          return ttl
        },
    }),
    getters: {
      carNumAllRatio: () =>{
        const storeCars = useCars()
        const arr = [0,0,0,0,0]
        storeCars.cars.map(function(car){
          for (let i in arr){
            arr[i] = arr[i] + car.carNumPerYear[i]
          }
        })
        const arr2 = arr.map(function(value){
          return value / storeCars.carNumAll
        })
        return arr2
      },
    }
})
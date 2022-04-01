import { defineStore } from 'pinia'
import { useCars } from "./cars";

export const useStore = defineStore('roi', {
    //初期値
    state: () => ({
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
    // actions: { //methodsと同じ
    //   update() {
    //     this.roi = [5,5,5,5,5];
    //   },
    // },
})
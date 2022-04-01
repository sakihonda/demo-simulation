import { defineStore } from "pinia";
import { useCars } from "./cars";

export const useProfit = defineStore('profit', {
    state: () => ({
        //revenue: [418.0, 455.0, 350.0, 244.0, 200.0],
        get revenue(){
            //const revenue =  storeCars.cars.reduce(function(sum, //car) {
                //return sum + (car.uriage);
            //},0)
            //return revenue
            const storeCars = useCars()
            const revenue = storeCars.cars[0].price
            const rev = [revenue, 0,0,0,0]
            return rev
        },
        cog: [126.0, 137.0, 106.0, 74.0, 60.0],
        profit: [292.0, 318.0, 244.0, 170.0, 139.0]
    }),
})
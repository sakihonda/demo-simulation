import { defineStore } from 'pinia'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useCars = defineStore('cars', {
    //初期値
    state: () => ({
        cars: [
            {
                id:1,
                sell:true,
                price:50000,
                get carNum(){
                    if (this.sell){
                        return 150000
                    }else{
                        return 0
                    }
                },
                profile:{
                    name:'T社',
                    companyType: '一般車',
                    carType: 'コンパクトカー',
                },
                product:{
                    length: 100,
                    quality: '標準'
                },
                sales: {
                    record: true,
                    days: 50,
                },
                initialCosts: {
                    investment: 0,
                    development: 0,
                    sales: 0,
                },
                cog: {
                    material: 0,
                    production: 0,
                },
                get initialCostsTotal(){
                    let sum: number = 0
                    for(let cost in this.initialCosts){
                        sum = sum + this.initialCosts[cost]
                    }
                    return sum
                },
                get cogTotal(){
                    let sum: number = 0
                    for(let cost in this.cog){
                        sum = sum + this.cog[cost]
                    }
                    return sum
                },
                get uriage(){
                    const uriage = this.price * this.carNum
                   return uriage
               },
                get rieki(){
                    const rieki = this.uriage - this.initialCostsTotal - this.cogTotal
                    return rieki
                }
            },
        ],
    }),
    getters: {
        carNumRatioI: (state) => {
            function f(length: number, quality: string, carNum: number){
                const cars = state.cars.filter(car => car.product.length == length && car.product.quality == quality)
                const numSum = cars.reduce(function(sum, car){
                    return sum + (car.carNum)
                },0)
                let ratio: number = 0
                if (numSum != 0){
                    ratio = carNum / numSum
                }
                return ratio
            }
            return f
        },
        carNumRatioD: (state) => {
            function f(prop: string, filterValue: any, carNum: number):number {
                const cars = state.cars.filter(car => car[prop] == filterValue)
                const numSum = cars.reduce(function(sum, car){
                    return sum + (car.carNum)
                }, 0)
                let ratio: number = 0
                if (numSum != 0){
                    ratio = carNum / numSum
                }
                return ratio
            }
            return f
        },
    },
})
// @ts-nocheck
import { defineStore } from 'pinia'
import { carType } from '../types/carType'

const data = [
    {carNum: [10000, 20000, 10000, 10000, 20000], name: '日本 / 一般企業', companyType: '一般車', carShurui: 'コンパクトカー', length:100,  record:true, days:50, },
    {carNum: [10000, 10000, 10000, 10000, 10000], name: '日本 / 一般企業', companyType: '一般車', carShurui: 'SUV', length:150,  record:true, days:70, },
    {carNum: [10000, 20000, 10000, 10000, 20000], name: 'ドイツ / 保守企業', companyType: '高級車', carShurui: 'セダン', length:100,  record:true, days:80, },
    {carNum: [5000, 10000, 10000, 10000, 10000], name: 'ドイツ / 保守企業', companyType: '高級車', carShurui: 'SUV', length:150,  record:false, days:100, },
    {carNum: [20000, 10000, 20000, 10000, 5000], name: 'アメリカ / 一般企業', companyType: '一般車', carShurui: 'ミニバン', length:150,  record:false, days:70, },
    {carNum: [10000, 20000, 20000, 10000, 10000], name: 'アメリカ / 一般企業', companyType: '一般車', carShurui: 'コンパクトカー', length:100,  record:false, days:60, },
    {carNum: [10000, 10000, 10000, 10000, 10000], name: '中国 / 新興企業', companyType: '高級車', carShurui: 'セダン', length:100,  record:true, days:60, },
    {carNum: [10000, 10000, 5000, 20000, 20000], name: '中国 / 新興企業', companyType: '高級車', carShurui: 'SUV', length:150,  record:true, days:50, },
]

export const useCars = defineStore('cars', {
    state: () => ({
            cars: [] as carType[],
    }),
    getters: {
        //販売台数トータル
        carNumAll: (state):number => {
            const numSum: number = state.cars.reduce(function(sum, car:carType){
                return sum + (car.carNum)
            },0)
            return numSum
        },
        //モールド初期投資計算用のratio
        carNumRatioI: (state) => {
            function f(length: number, quality: string, carNum: number){
                const filteredCars = state.cars.filter(car => car.product.length == length && car.product.quality == quality)
                let ratio: number = 0
                const filteredCarsSum = filteredCars.reduce(function(sum, filteredCar){
                    return sum + (filteredCar.carNum)
                }, 0)
                if (filteredCarsSum > 0){
                    ratio = carNum / filteredCarsSum
                }
                return ratio
            }
            return f
        },
        //開発費初期投資計算用のratio
        carNumRatioD: ():number => {
            function f(carNum:number){
                let ratio: number = 0
                if (this.carNumAll != 0){
                    ratio = carNum / this.carNumAll
                }
                return ratio
            }
            return f
        },
    },
    actions: {
        getCars(){
            for (let i=0; i < data.length; i++){
                let car: carType = {
                    id: i+1,
                    sell: true,
                    price:4000,
                    isProperPrice: true,
                    get carNumPerYear (){
                        if (this.sell && this.isProperPrice){
                            return data[i].carNum
                        }else{
                            return [0,0,0,0,0]
                        }
                    },
                    get carNum(){ //5年間の合計
                        const ttl = this.carNumPerYear.reduce(function(sum,element){
                            return sum + element
                        },0)
                        return ttl
                    },
                    profile:{
                        name: data[i].name,
                        companyType: data[i].companyType,
                        carShurui: data[i].carShurui,
                    },
                    product:{
                        length: data[i].length,
                        quality: '標準'
                    },
                    sales: {
                        record: data[i].record,
                        days: data[i].days,
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
                }
                this.cars.push(car)
            }
        }
    }
})
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
                name:'トヨタ',
                product:'一般',
                price:50000,
                rieki:300000,
            },
            {
                id:2,
                sell:true,
                name:'ベンツ',
                product:'ハイグレード',
                price:100000,
                rieki:500000,
            },
        ],
    }),
})
import { defineStore } from 'pinia'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore('roi', {
    //初期値
    state: () => ({
        roi: [10,5,0,0,0],
    }),
    actions: { //methodsと同じ
      update() {
        this.roi = [5,5,5,5,5];
      },
    },
})
import { defineStore } from "pinia";

export const useProfit = defineStore('profit', {
    state: () => ({
        revenue: [418.0, 455.0, 350.0, 244.0, 200.0],
        cog: [126.0, 137.0, 106.0, 74.0, 60.0],
        profit: [292.0, 318.0, 244.0, 170.0, 139.0]
    }),
})
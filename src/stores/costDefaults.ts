import { defineStore, StateTree } from 'pinia'
import { useCars } from "./cars";

export const useCostDefaults = defineStore('costDefaults',{
  state: () => ({
    cog: {
      materials: {
        glassPrice: 10,
        softwarePrice: 50,
      },
      productions: {
        glassPrice: 100,
        softwarePrice: 50,
      },
    },
    initialCosts: {
      investments: {
        moldBigPremium: 100000000,
        moldBigNormal: 2000000,
        moldSmallPremium: 7000000,
        moldSmallNormal: 1500000,

      },
      developments: {
        software: 90000000,
      },
      sales: {
        dayCost: 100000,
      }
    },
  }),
  getters: {
    //原材料計算
    calcCostMaterial: (state) => {
      return (length: number, num: number) => state.cog.materials.glassPrice * length * num + state.cog.materials.softwarePrice * num
    },
    //製造費計算
    calcCostProduction: (state) => {
      return (num: number):number => state.cog.productions.glassPrice * num + state.cog.productions.softwarePrice * num
    },
    //初期投資計算
    calcCostInvestment: (state) => {
      const storeCars = useCars()
      let cost: number
      function f(length: number, quality: string, carNum:number): number {
        if (length == 150 && quality == 'プレミアム'){
          cost = state.initialCosts.investments.moldBigPremium
        }else if(length == 150 && quality == '標準'){
          cost = state.initialCosts.investments.moldBigNormal
        }else if (length == 100 && quality == 'プレミアム'){
          cost = state.initialCosts.investments.moldSmallPremium
        }else if (length == 100 && quality == '標準'){
          cost = state.initialCosts.investments.moldSmallNormal
        }
        let inv: number = cost * storeCars.carNumRatioI(length, quality, carNum)
        return inv
      }
      return f
    },
    //研究開発費
    calcCostDevelopment: (state) => {
      const storeCars = useCars()
      return (carNum: number): number => state.initialCosts.developments.software * storeCars.carNumRatioD('sell', true, carNum)
    },
    //営業費
    calcCostSales: (state) => {
      return (days: number):number => state.initialCosts.sales.dayCost * days
    }
  }
})
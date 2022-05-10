import { defineStore } from 'pinia'
import { useDataAll } from './dataAll'

export const usePreviousDataAll = defineStore('PreviousDataAll', {
    //初期値
    state: () => ({
        previous :{
            uriageAll: 0,
            cogAll: 0,
            initialCostsAll: 0,
            riekiAll: 0,
            roiAll: 0,
        }
    }),
    actions: {
        savePrevious(): void{
            const storeDataAll = useDataAll()
            this.previous.uriageAll = storeDataAll.uriageAll
            this.previous.cogAll = storeDataAll.cogAll
            this.previous.initialCostsAll = storeDataAll.initialCostsAll
            this.previous.riekiAll = storeDataAll.riekiAll
            this.previous.roiAll = storeDataAll.roiAll
        }
    }
})
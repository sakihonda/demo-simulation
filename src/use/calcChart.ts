//チャートの数字の計算

//単位を千にする。小数点切り上げ
export const RoundNum = function(num: number) :number{
    const keta = 1000
    return Math.round(num / keta)
}

// profit chartの計算 (5年分のリスト)
export const calcChartData = function(numTotal:number, ratio: Array<number>): Array<number>{
    const arr = []
    for (let i in ratio){
        let num = numTotal * ratio[i]
        num = RoundNum(num)
        arr.push(num)
    }
    return arr
}

//roi chartの累積計算
export const calcChartAccumlatedData = function(numTotal:number, ratio: Array<number>): Array<number>{
    const arr = calcChartData(numTotal, ratio)
    let num = 0
    const arr2 = [...arr.map((data) => num += data)]
    return arr2
}


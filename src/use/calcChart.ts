//チャートの数字の計算

export const RoundNum = function(num: number) {
    const keta = 1000
    return Math.round(num / keta)
}

export const calcChartData = function(numTotal:number, ratio: Array<number>){
    const arr = []
    for (let i in ratio){
        let num = numTotal * ratio[i]
        num = RoundNum(num)
        arr.push(num)
    }
    return arr
}

//roi chartの累積計算
export const calcChartAccumlatedData = function(numTotal:number, ratio: Array<number>){
    const arr = calcChartData(numTotal, ratio)
    let num = 0
    const arr2 = [...arr.map((data) => num += data)]
    return arr2
}


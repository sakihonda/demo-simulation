export const calcChartData = function(numTotal:number, ratio: Array<number>){
    const arr = []
    for (let i in ratio){
        let num = numTotal * ratio[i]
        arr.push(num)
    }
    return arr
}

export const calcChartAccumlatedData = function(numTotal:number, ratio: Array<number>){
    const arr = []
    for (let i in ratio){
        let num = numTotal * ratio[i]
        arr.push(num)
    }
    let num = 0
    const arr2 = [...arr.map((data) => num += data)]
    return arr2
}

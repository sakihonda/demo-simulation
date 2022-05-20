import { carType } from "../types/carType";

export const setPriceLine = function(length:carType['product']['length'], quality:carType['product']['quality'], record:carType['sales']['record']):number{
    let priceLine: number = 0
    switch (true){
        case length == 100 && quality == '標準' && record == false:
            priceLine = 5000;
            break;
        case length == 100 && quality == '標準' && record == true:
            priceLine = 5500;
            break;
        case length == 150 && quality == '標準' && record == false:
            priceLine = 7000;
            break;
        case length == 150 && quality == '標準' && record == true:
            priceLine = 7500;
            break;
        case length == 100 && quality == 'プレミアム' && record == false:
            priceLine = 7000;
            break;
        case length == 100 && quality == 'プレミアム' && record == true:
            priceLine = 7500;
            break;
        case length == 150 && quality == 'プレミアム' && record == false:
            priceLine = 10500;
            break;
        case length == 150 && quality == 'プレミアム' && record == true:
            priceLine = 11000;
            break;
    }
    return priceLine
}

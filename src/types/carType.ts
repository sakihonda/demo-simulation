export interface carType  {
    id: number;
    sell: boolean;
    price: number;
    isProperPrice: boolean;
    carNumPerYear: number[];
    carNum: number;
    profile: {
        name: string;
        companyType: string;
        carShurui: string;
    };
    product: {
        length: number;
        quality: '標準' | 'プレミアム';
    };
    sales: {
        record: boolean;
        days: number;
    };
    initialCosts: {
        investment: number;
        development: number;
        sales: number;
    };
    cog: {
        material: number;
        production: number;
    };
    initialCostsTotal: number;
    cogTotal: number;
    uriage: number;
    rieki: number;

}

// type carType = {
//     id: number;
//     sell: boolean;
//     price: number;
//     isProperPrice: boolean;
//     carNumPerYear: number[];
//     carNum: number;
//     profile: {
//         name: string;
//         companyType: string;
//         carType: string;
//     };
//     product: {
//         length: number;
//         quality: '標準' | 'プレミアム';
//     };
//     sales: {
//         record: boolean;
//         days: number;
//     };
//     initialCosts: {
//         investment: number;
//         development: number;
//         sales: number;
//     };
//     cog: {
//         material: number;
//         production: number;
//     };
//     initialCostsTotal: number;
//     cogTotal: number;
//     uriage: number;
//     rieki: number;

// }

// export { carType }
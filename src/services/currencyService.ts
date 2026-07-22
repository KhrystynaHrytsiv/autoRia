import {CurrencyEnum} from "../enums/currencyEnum";
import {IPrice} from "../interfaces/IPrice";
import {ICurrencyRes} from "../interfaces/ICurrencyRes";
import {apiError} from "../error/apiError";
import {StatusCodes} from "../enums/statusCodes";
import {config} from "../configs/config";

class CurrencyService{
    public async convertCurrency (price:IPrice ):Promise<IPrice> {
        const data: ICurrencyRes[] = await fetch(config.PRIVAT_API_URL).then(response => response.json());
        const usd = data.find(item => item.ccy === CurrencyEnum.USD);
        const eur = data.find(item => item.ccy === CurrencyEnum.EUR);
        if (!usd || !eur) {
            throw new apiError('Currency not found', StatusCodes.NOT_FOUND)
        }
        const usdRate = Number(usd.sale);
        const eurRate = Number(eur.sale);
        let uahValue: number;
        switch (price.original.currency) {
            case CurrencyEnum.UAH:
                uahValue = price.original.value;
                break;
            case CurrencyEnum.USD:
                uahValue = price.original.value * usdRate;
                break;
            case CurrencyEnum.EUR:
                uahValue = price.original.value * eurRate;
                break;
            default:
                throw new apiError("Unsupported currency", StatusCodes.BAD_REQUEST);
        }
        price.converted.uah = +uahValue.toFixed(2);
        price.converted.usd = +(uahValue / usdRate).toFixed(2);
        price.converted.eur = +(uahValue / eurRate).toFixed(2);
        price.exchangeRate.usd = usdRate;
        price.exchangeRate.eur = eurRate;
        price.exchangeRateDate = new Date();
        return price
    }
}
export const currencyService = new CurrencyService();

//
// public async convertCurrency (price:IPrice ):Promise<IPrice>{
//     const data:ICurrencyRes[] = await fetch(config.PRIVAT_API_URL).then(response => response.json());
// const usd = data.find(item => item.ccy === CurrencyEnum.USD);
// const eur = data.find(item => item.ccy === CurrencyEnum.EUR);
// if(!usd || !eur){
//     throw new apiError('Currency not found', StatusCodes.NOT_FOUND)
// }
// const usdRate = Number(usd.sale);
// const eurRate = Number(eur.sale);
//
// switch (price.original.currency){
//     case CurrencyEnum.EUR:
//         price.converted.uah = +(price.original.value * eurRate).toFixed(2);
//         price.converted.usd = +(price.converted.uah / usdRate).toFixed(2);
//         price.converted.eur = price.original.value;
//         break
//     case CurrencyEnum.USD:
//         price.converted.uah = +(price.original.value * usdRate).toFixed(2);
//         price.converted.eur = +(price.converted.uah / eurRate).toFixed(2);
//         price.converted.usd = price.original.value;
//         break;
//     case CurrencyEnum.UAH:
//         price.converted.usd = +(price.original.value / usdRate).toFixed(2);
//         price.converted.eur = +(price.original.value / eurRate).toFixed(2);
//         price.converted.uah = price.original.value
//         break
// }
// price.exchangeRate.usd = usdRate;
// price.exchangeRate.eur = eurRate;
// price.exchangeRateDate = new Date();
// return price
// }
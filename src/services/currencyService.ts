import {CurrencyEnum} from "../enums/currencyEnum";
import {createPriceDto, IPrice} from "../interfaces/IPrice";
import {ICurrencyRes} from "../interfaces/ICurrencyRes";
import {apiError} from "../error/apiError";
import {StatusCodes} from "../enums/statusCodes";
import {config} from "../configs/config";
import {exchangeRateRepository} from "../repositories/exchangeRateRepository";

class CurrencyService{
    public async getExchangeRates (){
        const data: ICurrencyRes[] = await fetch(config.PRIVAT_API_URL).then(response => response.json());
        const usd = data.find(item => item.ccy === CurrencyEnum.USD);
        const eur = data.find(item => item.ccy === CurrencyEnum.EUR);
        if (!usd || !eur) {
            throw new apiError('Currency values not found', StatusCodes.BAD_REQUEST)
        }
        return{
            usd: Number(usd.sale),
            eur: Number(eur.sale),
            date: new Date()
        }
    }
    public async convertCurrency (price:createPriceDto ):Promise<IPrice> {
        let uahValue: number;
        const rates = await exchangeRateRepository.getLatest();
        if (!rates) {
            throw new apiError("Exchange rate not found", StatusCodes.NOT_FOUND);
        }
        const usdRate = rates.usd;
        const eurRate = rates.eur;
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
        return {
            original: price.original,
            converted: {
                uah: +uahValue.toFixed(2),
                usd: +(uahValue / usdRate).toFixed(2),
                eur: +(uahValue / eurRate).toFixed(2)
            },
            exchangeRate:{
                usd: usdRate,
                eur: eurRate
            },
            exchangeRateDate: new Date()
        }
    }
}
export const currencyService = new CurrencyService();

import {CurrencyEnum} from "../enums/currencyEnum";

export interface IPrice {
    original: {
        value: number;
        currency: CurrencyEnum;
    };
    converted: {
        usd: number;
        eur: number;
        uah: number;
    };
    exchangeRateDate: Date;
    exchangeRate: {
        usd: number;
        eur: number;
    };

}
export type createPriceDto = Pick<IPrice, "original">

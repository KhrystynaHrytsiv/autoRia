import {IExchangeRate} from "../interfaces/IExchangeRate";
import {ExchangeRate} from "../models/exchangeRateModel";

class ExchangeRateRepository{
    public update (dto:IExchangeRate):Promise<IExchangeRate>{
        return ExchangeRate.findOneAndUpdate({}, dto, {upsert:true, returnDocument: 'after'})
    }

    public getLatest (){
        return ExchangeRate.findOne();
    }
}
export const exchangeRateRepository = new ExchangeRateRepository();
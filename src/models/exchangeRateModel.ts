import {model, Schema} from "mongoose";
import {IExchangeRate} from "../interfaces/IExchangeRate";

const exchangeRateSchema = new Schema({
    usd:{type:Number, required:true},
    eur:{type:Number, required:true},
    date:{type:Date, required:true}
});
export const ExchangeRate = model<IExchangeRate>('exchangeRate', exchangeRateSchema);
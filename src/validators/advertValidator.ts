import joi from "joi";
import {CurrencyEnum} from "../enums/currencyEnum";

export class AdvertValidator{
    private static title = joi.string().min(1).max(20);
    private static description = joi.string().min(3).max(200);
    private static brand = joi.string().min(1).max(24);
    private static model = joi.string().min(1).max(24);
    private static year = joi.number().min(1980).max(new Date().getFullYear());
    private static price = joi.object({
        original: joi.object({
            value: joi.number().min(1000).max(10000000).required(),
            currency: joi.string().valid(CurrencyEnum.UAH, CurrencyEnum.USD, CurrencyEnum.EUR).required()})
    });

    public static createAdvert = joi.object({
        title: this.title.required(),
        description: this.description.required(),
        brand: this.brand.required(),
        model: this.model.required(),
        year: this.year.required(),
        price: this.price.required()
    })
}
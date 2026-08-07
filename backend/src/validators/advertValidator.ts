import joi from "joi";

import { AdvertOrderEnum } from "../enums/AdvertOrderEnum";
import { CurrencyEnum } from "../enums/currencyEnum";

export class AdvertValidator {
    private static title = joi.string().min(1).max(20);
    private static description = joi.string().min(3).max(200);
    private static brand = joi.string().min(3).max(24);
    private static model = joi.string().min(1).max(24);
    private static year = joi.number().min(1980).max(new Date().getFullYear());
    private static price = joi.object({
        original: joi.object({
            value: joi.number().min(1000).max(10000000).required(),
            currency: joi
                .string()
                .valid(CurrencyEnum.UAH, CurrencyEnum.USD, CurrencyEnum.EUR)
                .required(),
        }),
    });
    private static location = joi.object({
        region: joi.string().min(2).max(30),
        country: joi.string().min(2).max(30),
    });

    public static createAdvert = joi.object({
        title: this.title.required(),
        description: this.description.required(),
        brand: this.brand.required(),
        model: this.model.required(),
        year: this.year.required(),
        price: this.price.required(),
        location: this.location.required(),
    });

    public static query = joi.object({
        pageSize: joi.number().min(1).max(100).default(10),
        page: joi.number().min(1).default(1),
        brand: joi.string(),
        model: joi.string(),
        year: joi.number(),
        price: joi.number(),
        order: joi
            .string()
            .valid(
                ...Object.values(AdvertOrderEnum),
                ...Object.values(AdvertOrderEnum).map((item) => `-${item}`),
            ),
    });
}

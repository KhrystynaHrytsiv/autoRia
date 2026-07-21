import joi from "joi";
import {regexEnum} from "../enums/regexEnum";

export class CarValidator{
    private static brand = joi.string().regex(regexEnum.car).min(2).max(30).trim()
    private static model = joi.string().regex(regexEnum.car).min(2).max(20).trim()
    private static brandId = joi.string().hex().length(24)

    public static createBrand = joi.object({
        name: this.brand.required()
    })

    public static createModel = joi.object({
        brandId: this.brandId.required(),
        name: this.model.required()
    })
}
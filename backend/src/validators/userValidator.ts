import joi from "joi";
import {regexEnum} from "../enums/regexEnum";

export class UserValidator{
    private static name = joi.string().regex(regexEnum.name)
    private static email = joi.string().regex(regexEnum.email)
    private static password = joi.string().regex(regexEnum.password)


    public static create = joi.object({
        name: this.name.required(),
        email: this.email.required(),
        password: this.password.required()
    })
}
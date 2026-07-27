import {model, Schema} from "mongoose";
import {IAdvert} from "../interfaces/IAdvert";
import {User} from "./userModel";
import {Brand} from "./brandModel";
import {Model} from "./modelModel";
import {RequestStatus} from "../enums/requestStatus";
import {CurrencyEnum} from "../enums/currencyEnum";

const advertSchema = new Schema({
    userId: {type:Schema.Types.ObjectId, required: true, ref: User},
    title: {type: String, required:true },
    description: {type: String, required:true },
    brand: {type: Schema.Types.ObjectId, required:true, ref: Brand.name},
    model: {type:Schema.Types.ObjectId, required: true, ref: Model.name},
    price: {
        original:{
            value: {type: Number, required:true},
            currency: {type: String, enum: CurrencyEnum, required:true}
        },
        converted: {
            usd: {type:Number, required:true},
            eur: {type:Number, required:true},
            uah: {type:Number, required:true},
        },
        exchangeRateDate: {type: Date, required:true},
        exchangeRate: {
            usd: {type:Number, required:true},
            eur: {type:Number, required:true},
        },
    },
    year: {type: Number, required:true },
    status: {type: String, enum: RequestStatus, required: true, default: RequestStatus.pending},
},
    {timestamps: true, versionKey:false});


export const Advertisement = model<IAdvert>('advert', advertSchema);


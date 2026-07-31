import {model, Schema} from "mongoose";
import {IAdvert} from "./IAdvert";
import {User} from "../user/userModel";
import {Brand} from "../car/brandModel";
import {Model} from "../car/modelModel";
import {CurrencyEnum} from "../../common/enums/currencyEnum";
import {AdvertStatus} from "../../common/enums/advertStatus";

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
    location: {
        region: {type:String, required:true},
        country: {type:String, default: "Ukraine"},
    },
    status: {type: String, enum:AdvertStatus , required: true, default:AdvertStatus.pending},
    attempts:{type:Number, default: 0},
    views:{type:Number, default:0}
},
    {timestamps: true, versionKey:false});


export const Advertisement = model<IAdvert>('advert', advertSchema);


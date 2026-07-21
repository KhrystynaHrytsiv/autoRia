import {model, Schema} from "mongoose";
import {IAdvert} from "../interfaces/IAdvert";
import {User} from "./userModel";
// import {CurrencyEnum} from "../enums/currencyEnum";
import {Brand} from "./brandModel";
import {Model} from "./modelModel";
import {AdvertStatus} from "../enums/advertStatus";

const advertSchema = new Schema({
    title: {type: String, required:true },
    description: {type: String, required:true },
    brand: {type: Schema.Types.ObjectId, required:true, ref: Brand},
    model: {type:Schema.Types.ObjectId, required: true, ref: Model},
    price:{type:String, required:true},
    // price: {type: Number, enum: CurrencyEnum, required: true},
    year: {type: Number, required:true },
    status: {type: String, enum: AdvertStatus, required: true, default: AdvertStatus.pending},
    userId: {type:Schema.Types.ObjectId, required: true, ref: User},
},
    {timestamps: true, versionKey:false});

export const Advertisement = model<IAdvert>('advert', advertSchema);
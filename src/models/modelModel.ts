import {model, Schema} from "mongoose";
import {Brand} from "./brandModel";
import {IModel} from "../interfaces/IBrand";

const modelSchema = new Schema({
    name: {type:String, requireManualDestroy:true},
    brandId:{type: Schema.Types.ObjectId, required:true, ref: Brand}
},
    {timestamps:false, versionKey:false});
export const Model = model<IModel>('model', modelSchema);
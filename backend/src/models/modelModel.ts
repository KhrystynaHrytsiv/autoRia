import {model, Schema} from "mongoose";
import {IModel} from "../interfaces/ICar";
import {Brand} from "./brandModel";

const modelSchema = new Schema({
    name: {type:String, required:true},
    brandId:{type: Schema.Types.ObjectId, required:true, ref: Brand}
},
    {timestamps:false, versionKey:false});
export const Model = model<IModel>('model', modelSchema);
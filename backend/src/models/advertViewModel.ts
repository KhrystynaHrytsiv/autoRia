import {model, Schema} from "mongoose";
import {Advertisement} from "./advertModel";
import {IAdvertView} from "../interfaces/IAdvertView";

const advertViewSchema = new Schema({
    advertId: {type: Schema.Types.ObjectId, ref:Advertisement, required:true},
    viewedAt: {type:Date, default:Date.now()}
},
    {versionKey:false});
export const AdvertView = model<IAdvertView>('advertView', advertViewSchema);
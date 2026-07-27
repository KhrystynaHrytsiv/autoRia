import {model, Schema} from "mongoose";
import {Brand} from "./brandModel";
import {User} from "./userModel";
import {RequestStatus} from "../enums/requestStatus";
import {IModelRequest} from "../interfaces/IBrandRequest";

const modelRequestSchema = new Schema({
    userId: {type:Schema.Types.ObjectId, ref: User, required:true},
    brandId:{type:Schema.Types.ObjectId, ref:Brand, required:true},
    name:{type: String, required: true},
    status:{type:String, enum: RequestStatus, default:RequestStatus.pending},
},
    {timestamps:true, versionKey:false}
    );
export const ModelRequest = model<IModelRequest>('modelRequest', modelRequestSchema);


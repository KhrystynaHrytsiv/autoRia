import {model, Schema} from "mongoose";
import {User} from "../user/userModel";
import {RequestStatus} from "../../common/enums/requestStatus";
import {IModelRequest} from "./ICarRequest";

const modelRequestSchema = new Schema({
    userId: {type:Schema.Types.ObjectId, ref: User, required:true},
    brand: {type:String, required:true},
    name:{type: String, required: true},
    status:{type:String, enum: RequestStatus, default:RequestStatus.pending},
},
    {timestamps:true, versionKey:false}
    );
export const ModelRequest = model<IModelRequest>('modelRequest', modelRequestSchema);


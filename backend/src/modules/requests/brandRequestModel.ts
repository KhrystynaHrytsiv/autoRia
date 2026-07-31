import {model, Schema} from "mongoose";
import {User} from "../user/userModel";
import {RequestStatus} from "../../common/enums/requestStatus";
import {IBrandRequest} from "./ICarRequest";

const brandRequestSchema = new Schema({
    userId: {type:Schema.Types.ObjectId, ref: User, required:true},
    name: {type:String, required:true},
    status: {type:String, enum:RequestStatus, default: RequestStatus.pending}
},
    {timestamps:true, versionKey:false }
    );
export const BrandRequest = model<IBrandRequest>('brandRequest', brandRequestSchema);
import {model, Schema} from "mongoose";
import {User} from "./userModel";
import {RequestStatus} from "../enums/requestStatus";
import {IBrandRequest} from "../interfaces/IBrandRequest";

const reqBrandSchema = new Schema({
    userId: {type:Schema.Types.ObjectId, ref: User, required:true},
    name: {type:String, required:true},
    status: {type:String, enum:RequestStatus, default: RequestStatus.pending}
},
    {timestamps:true, versionKey:false }
    );
export const BrandRequest = model<IBrandRequest>('reqBrand', reqBrandSchema);
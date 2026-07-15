import {model, Schema} from "mongoose";
import {IUser} from "../interfaces/IUser";
import {RolesEnum} from "../enums/rolesEnum";

const userSchema = new Schema({
    name: {type:String, require:true},
    email: {type:String, require:true},
    password: {type:String, require:true},
    role: {type: String, default: RolesEnum.CLIENT},
    accountType: {type:String, default: 'basic'}

},
    {timestamps:true, versionKey:false,
        toJSON:{
        transform: (doc:any, ret:any)=>{
            delete (ret as any).password;
            return ret
        }
        }
    }
    );
export const User = model<IUser> ('user', userSchema)
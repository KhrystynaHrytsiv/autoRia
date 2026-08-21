import { model, Schema } from "mongoose";

import { AccountTypeEnum } from "../enums/accountTypeEnum";
import { RolesEnum } from "../enums/rolesEnum";
import { UserStatus } from "../enums/userActionEnum";
import { IUser } from "../interfaces/IUser";

const userSchema = new Schema(
    {
        name: { type: String, require: true },
        email: { type: String, require: true },
        password: { type: String, require: true },
        role: {
            type: String,
            enum: RolesEnum,
            required: true,
            default: RolesEnum.CLIENT,
        },
        accountType: {
            type: String,
            enum: AccountTypeEnum,
            default: AccountTypeEnum.BASIC,
        },
        status: { type: String, enum: UserStatus, default: UserStatus.active },
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            transform: (doc: any, ret: any) => {
                delete (ret as any).password;
                return ret;
            },
        },
    },
);
export const User = model<IUser>("user", userSchema);

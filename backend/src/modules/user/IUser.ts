import {RolesEnum} from "../../common/enums/rolesEnum";
import {AccountTypeEnum} from "../../common/enums/accountTypeEnum";

interface IUser{
    id:string,
    name: string,
    email:string,
    password:string,
    role: RolesEnum,
    accountType: AccountTypeEnum,
    isActive:boolean;
}

type IUserCreateDto = Pick<IUser, "name" | "email" | "password">

export type{IUserCreateDto, IUser}
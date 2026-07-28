import {RolesEnum} from "../enums/rolesEnum";
import {AccountTypeEnum} from "../enums/accountTypeEnum";

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
import {RolesEnum} from "../enums/rolesEnum";

interface IUser{
    id:string,
    name: string,
    email:string,
    password:string,
    role: RolesEnum,
    accountType: 'basic' | 'premium'
}

type IUserCreateDto = Pick<IUser, "name" | "email" | "password">

export type{IUserCreateDto, IUser}
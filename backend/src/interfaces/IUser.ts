import { AccountTypeEnum } from "../enums/accountTypeEnum";
import { RolesEnum } from "../enums/rolesEnum";

interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    role: RolesEnum;
    accountType: AccountTypeEnum;
    isActive: boolean;
}

type IUserCreateDto = Pick<IUser, "name" | "email" | "password">;

export type { IUser, IUserCreateDto };

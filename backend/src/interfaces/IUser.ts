import { AccountTypeEnum } from "../enums/accountTypeEnum";
import { RolesEnum } from "../enums/rolesEnum";
import { UserStatus } from "../enums/userActionEnum";

interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    role: RolesEnum;
    accountType: AccountTypeEnum;
    status: UserStatus;
}

type IUserCreateDto = Pick<IUser, "name" | "email" | "password">;

export type { IUser, IUserCreateDto };

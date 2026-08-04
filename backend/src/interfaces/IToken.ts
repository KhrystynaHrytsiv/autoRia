import { RolesEnum } from "../enums/rolesEnum";

export interface IToken {
    id: string;
    accessToken: string;
    refreshToken: string;
    userId: string;
}
export type TokenPair = Pick<IToken, "accessToken" | "refreshToken">;
export interface ITokenPayload {
    userId: string;
    role: RolesEnum;
}
export type IRefresh = Pick<IToken, "refreshToken">;

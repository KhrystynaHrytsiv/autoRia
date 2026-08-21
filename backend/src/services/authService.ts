import { RolesEnum } from "../enums/rolesEnum";
import { StatusCodes } from "../enums/statusCodes";
import { UserStatus } from "../enums/userActionEnum";
import { apiError } from "../error/apiError";
import { IAuth } from "../interfaces/IAuth";
import { TokenPair } from "../interfaces/IToken";
import { IUser, IUserCreateDto } from "../interfaces/IUser";
import { tokenRepository } from "../repositories/tokenRepository";
import { userRepository } from "../repositories/userRepository";
import { passwordService } from "./passwordService";
import { tokenService } from "./tokenService";
import { userService } from "./userService";

class AuthService {
    public async register(
        user: IUserCreateDto,
    ): Promise<{ user: IUser; tokens: TokenPair }> {
        const newUser = await userService.createWithRole(
            user,
            RolesEnum.SELLER,
        );
        const tokenPair = tokenService.generateTokens({
            userId: newUser.id,
            role: newUser.role,
        });
        await tokenRepository.create({ ...tokenPair, userId: newUser.id });
        return { user: newUser, tokens: tokenPair };
    }

    public async login(
        data: IAuth,
    ): Promise<{ user: IUser; tokens: TokenPair }> {
        const user = await userRepository.getByEmail(data.email);
        if (!user) {
            throw new apiError("Invalid credentials", StatusCodes.UNAUTHORIZED);
        }
        const isPasswordExist = await passwordService.comparePassword(
            data.password,
            user.password,
        );
        if (user.status === UserStatus.blocked) {
            throw new apiError("Account is blocked", StatusCodes.FORBIDDEN);
        }
        if (!isPasswordExist) {
            throw new apiError(
                "Invalid email or password",
                StatusCodes.UNAUTHORIZED,
            );
        }
        const tokenPair = tokenService.generateTokens({
            userId: user.id,
            role: user.role,
        });
        await tokenRepository.create({ ...tokenPair, userId: user.id });
        return { user, tokens: tokenPair };
    }
}
export const authService = new AuthService();

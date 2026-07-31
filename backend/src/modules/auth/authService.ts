import {IUser, IUserCreateDto} from "../user/IUser";
import {TokenPair} from "../token/IToken";
import {userRepository} from "../user/userRepository";
import {passwordService} from "../../services/passwordService";
import {tokenService} from "../token/tokenService";
import {tokenRepository} from "../token/tokenRepository";
import {userService} from "../user/userService";
import {IAuth} from "./IAuth";
import {apiError} from "../../common/error/apiError";
import {StatusCodes} from "../../common/enums/statusCodes";
import {RolesEnum} from "../../common/enums/rolesEnum";

class AuthService{
    public async register (user:IUserCreateDto):Promise<{user:IUser, tokens:TokenPair}>{
        const newUser = await userService.createWithRole(user, RolesEnum.SELLER);
        const tokenPair = tokenService.generateTokens({userId: newUser.id, role: newUser.role});
        await tokenRepository.create({...tokenPair, userId: newUser.id});
        return {user:newUser, tokens:tokenPair}
    }

    public async login (data:IAuth):Promise<{user:IUser, tokens:TokenPair}>{
        const user = await userRepository.getByEmail(data.email);
        if(!user){
            throw new apiError("Invalid credentials", StatusCodes.UNAUTHORIZED)
        }
        const isPasswordExist = await passwordService.comparePassword(data.password, user.password);
        if (!isPasswordExist){
            throw new apiError("Invalid email or password", StatusCodes.UNAUTHORIZED)
        }
        const tokenPair = tokenService.generateTokens({userId: user.id, role:user.role});
        await tokenRepository.create({...tokenPair, userId: user.id});
        return {user, tokens:tokenPair}
    }
}
export const authService = new AuthService();
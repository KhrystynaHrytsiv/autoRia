import {IUser, IUserCreateDto} from "../interfaces/IUser";
import {TokenPair} from "../interfaces/IToken";
import {userRepository} from "../repositories/userRepository";
import {passwordService} from "./passwordService";
import {tokenService} from "./tokenService";
import {tokenRepository} from "../repositories/tokenRepository";
import {userService} from "./userService";
import {IAuth} from "../interfaces/IAuth";
import {apiError} from "../error/apiError";
import {StatusCodes} from "../enums/statusCodes";

class AuthService{
    public async register (user:IUserCreateDto):Promise<{user:IUser, tokens:TokenPair}>{
      await userService.isEmailUniq(user.email);
        const password = await passwordService.hashPassword(user.password);
        const newUser = await userRepository.create({...user, password});
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
        const tokenPair = tokenService.generateTokens({userId: user.id, role: user.role});
        await tokenRepository.create({...tokenPair, userId: user.id});
        return {user, tokens:tokenPair}
    }
}
export const authService = new AuthService();
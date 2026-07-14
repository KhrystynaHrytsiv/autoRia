import {IUser, IUserCreateDto} from "../interfaces/IUser";
import {TokenPair} from "../interfaces/IToken";
import {userRepository} from "../repositories/userRepository";
import {passwordService} from "./passwordService";
import {tokenService} from "./tokenService";
import {tokenRepository} from "../repositories/tokenRepository";
import {userService} from "./userService";

class AuthService{
    public async register (user:IUserCreateDto):Promise<{user:IUser, tokens:TokenPair}>{
      await userService.isEmailUniq(user.email);
        const password = await passwordService.hashPassword(user.password);
        const newUser = await userRepository.create({...user, password});
        const tokenPair = tokenService.generateTokens({userId: newUser.id, role: newUser.role});
        await tokenRepository.create({...tokenPair, userId: newUser.id});
        return {user:newUser, tokens:tokenPair}
    }
}
export const authService = new AuthService();
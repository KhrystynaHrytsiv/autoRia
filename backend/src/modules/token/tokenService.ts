import type {ITokenPayload, TokenPair} from "./IToken";
import jwt from "jsonwebtoken";
import {config} from "../../configs/config";
import {TokenEnum} from "../../common/enums/tokenEnum";
import {apiError} from "../../common/error/apiError";
import {StatusCodes} from "../../common/enums/statusCodes";
import {tokenRepository} from "./tokenRepository";

class TokenService{
    public generateTokens(payload:ITokenPayload):TokenPair{
        const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, {expiresIn: config.JWT_ACCESS_LIFETIME});
        const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, {expiresIn: config.JWT_REFRESH_LIFETIME});
        return {accessToken, refreshToken}
    }

    public verifyTokens(token:string, type:TokenEnum):ITokenPayload{
       try{
           let secret:string
           switch (type){
               case TokenEnum.ACCESS:
                   secret = config.JWT_ACCESS_SECRET
                   break;
               case TokenEnum.REFRESH:
                   secret = config.JWT_REFRESH_SECRET
                   break
               default:
                   throw new apiError('Invalid token type ', StatusCodes.BAD_REQUEST)
           }
           return jwt.verify(token, secret) as ITokenPayload;
       }catch (e) {
          throw new apiError("Invalid token", StatusCodes.UNAUTHORIZED)
       }
    }

    public async isTokenExist (token:string,  type: TokenEnum):Promise<boolean>{
        const iToken = await tokenRepository.findByParams({[type]: token});
        return !!iToken

    }

}
export const tokenService = new TokenService();
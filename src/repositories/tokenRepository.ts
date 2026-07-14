import type {TokenPair} from "../interfaces/IToken";
import {Token} from "../models/tokenModel";

class TokenRepository{
    create (dto:any):Promise<TokenPair>{
        return Token.create(dto);
    }
}
export const tokenRepository = new TokenRepository();
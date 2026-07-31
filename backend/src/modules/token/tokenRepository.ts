import type {IToken, TokenPair} from "./IToken";
import {Token} from "./tokenModel";

class TokenRepository{
    create (dto:any):Promise<TokenPair>{
        return Token.create(dto);
    }
    public findByParams (params:Partial<IToken>):Promise<IToken | null>{
        return Token.findOne(params);
    }
}
export const tokenRepository = new TokenRepository();
import {NextFunction, Request, Response} from 'express';
import {apiError} from "../error/apiError";
import {StatusCodes} from "../enums/statusCodes";
import {tokenService} from "../services/tokenService";
import {TokenEnum} from "../enums/tokenEnum";
import {ITokenPayload} from "../interfaces/IToken";
import {RolesEnum} from "../enums/rolesEnum";

class AuthMiddleware{
    public async checkAccess(req:Request, res:Response, next:NextFunction){
        try{
            const authorization = req.headers.authorization;
            if(!authorization){
                throw new apiError('No token provided', StatusCodes.UNAUTHORIZED)
            }
            const jwtToken = authorization.split(" ")[1];
            const tokenPayload = tokenService.verifyTokens(jwtToken, TokenEnum.ACCESS);
            const isTokenExists = await tokenService.isTokenExist(jwtToken, TokenEnum.ACCESS);
            if(!isTokenExists){
                throw new apiError('Invalid token', StatusCodes.UNAUTHORIZED)
            }
            res.locals.tokenPayload = tokenPayload;
            next()
        }catch (e) {
            next(e)
        }
    }

    public isAdmin (req: Request, res: Response, next: NextFunction){
        try {
            const {role} = res.locals.tokenPayload as ITokenPayload;
            if(role !== RolesEnum.ADMIN){
                throw new apiError('No has permission', StatusCodes.FORBIDDEN)
            }
            next()
        }catch (e) {
            next(e);
        }
    }
    public hasPermission(req: Request, res: Response, next: NextFunction){
        try{
            const {role} = res.locals.tokenPayload as ITokenPayload;
            if(role !== RolesEnum.ADMIN && role !== RolesEnum.MANAGER){
                throw new apiError('No has permission', StatusCodes.FORBIDDEN)
            }
            next()
        }catch (e) {
            next(e);
        }
    }
}
export const authMiddleware = new AuthMiddleware();
import {NextFunction, Request, Response} from "express";
import {authService} from "./authService";
import {StatusCodes} from "../../common/enums/statusCodes";
import {IAuth} from "./IAuth";

class AuthController{
    public async register(req:Request, res:Response, next:NextFunction){
        try{
            const body = req.body;
            const user = await authService.register(body);
            res.status(StatusCodes.CREATED).json(user)
        }catch (e){
            next(e)
        }
    }
    public async login (req:Request, res:Response, next:NextFunction){
        try{
            const body = req.body as IAuth;
            const user = await authService.login(body);
            res.status(StatusCodes.OK).json(user);
        }catch (e){
            next(e)
        }
    }
}

export const authController = new AuthController();
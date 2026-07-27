import {NextFunction, Request, Response} from "express";
import {requestService} from "../services/requestService";
import {StatusCodes} from "../enums/statusCodes";
import {ITokenPayload} from "../interfaces/IToken";

class RequestController {
    public async createBrandRequest (req:Request, res:Response, next:NextFunction){
        try{
            const {userId}=res.locals.tokenPayload as ITokenPayload;
           const dto = req.body;
           const request = await requestService.createBrandRequest(userId, dto);
           res.status(StatusCodes.CREATED).json(request)
        }catch(e){
            next(e)
        }
    }
    public async createModelRequest (req:Request, res:Response, next:NextFunction){
        try{
            const {userId}=res.locals.tokenPayload as ITokenPayload;
            const dto = req.body;
            const request = await requestService.createModelRequest(userId, dto);
            res.status(StatusCodes.CREATED).json(request)
        }catch(e){
            next(e)
        }
    }
}
export const requestController = new RequestController();
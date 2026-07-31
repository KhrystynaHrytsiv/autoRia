import {NextFunction, Request, Response} from "express";
import {requestService} from "./requestService";
import {StatusCodes} from "../../common/enums/statusCodes";
import {ITokenPayload} from "../token/IToken";

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
    public async getAllBrandRequests (req:Request, res:Response, next:NextFunction){
        try{
         const requests = await requestService.getAllBrandRequests();
         res.status(StatusCodes.OK).json(requests)
        }catch(e){
            next(e)
        }
    }
    public async getAllModelRequests (req:Request, res:Response, next:NextFunction){
        try{
            const requests = await requestService.getAllModelRequests();
            res.status(StatusCodes.OK).json(requests)
        }catch(e){
            next(e)
        }
    }

    public async approveBrandRequest (req:Request, res:Response, next:NextFunction){
        try{
           const id = req.params.id as string;
           const brand = await requestService.approveBrandRequest(id);
           res.status(StatusCodes.OK).json(brand)
        }catch (e) {
            next(e)
        }
    }
    public async approveModelRequest (req:Request, res:Response, next:NextFunction){
        try{
            const id = req.params.id as string;
            const model = await requestService.approveModelRequest(id);
            res.status(StatusCodes.OK).json(model)
        }catch (e) {
            next(e)
        }
    }
    public async rejectBrandRequest(req:Request, res:Response, next:NextFunction){
        try{
            const id = req.params.id as string;
            const request = await requestService.rejectBrandRequest(id);
            res.status(StatusCodes.OK).json(request)
        }catch (e) {
            next(e)
        }
    }
    public async rejectModelRequest(req:Request, res:Response, next:NextFunction){
        try{
            const id = req.params.id as string;
            const request = await requestService.rejectModelRequest(id);
            res.status(StatusCodes.OK).json(request)
        }catch (e) {
            next(e)
        }
    }
}
export const requestController = new RequestController();
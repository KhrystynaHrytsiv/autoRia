import {NextFunction, Request, Response} from "express";
import {StatusCodes} from "../enums/statusCodes";
import {modelService} from "../services/modelService";

class ModelController {
    public async getAll(req:Request, res:Response, next:NextFunction){
        try{
            const id = req.params.brandId as string;
            const models = await modelService.getAll(id);
            res.status(StatusCodes.OK).json(models)
        }catch (e) {
            next(e)
        }
    }
    public async create(req:Request, res:Response, next:NextFunction){
        try{
            const { brandId } = req.params;
            const model = await modelService.create({...req.body, brandId});
            res.status(StatusCodes.CREATED).json(model)
        }catch (e) {
            next(e)
        }
    }
}
export const modelController = new ModelController();
import {NextFunction, Request, Response} from "express";
import {StatusCodes} from "../../common/enums/statusCodes";
import {modelService} from "./modelService";

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
            const data = req.body;
            const brandId = req.params.brandId as string;
            const model = await modelService.create({...data, brandId});
            res.status(StatusCodes.CREATED).json(model)
        }catch (e) {
            next(e)
        }
    }
    public async delete(req:Request, res:Response, next:NextFunction){
        try{
            const id = req.params.id as string;
            await modelService.delete(id);
            res.status(StatusCodes.NO_CONTENT).end()
        }catch (e) {
            next(e)
        }
    }

}
export const modelController = new ModelController();
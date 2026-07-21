import {NextFunction, Request, Response} from "express";
import {brandService} from "../services/brandService";
import {StatusCodes} from "../enums/statusCodes";

class ModelController {
    public async getAll(req:Request, res:Response, next:NextFunction){
        try{
            const brands = await brandService.getAll();
            res.status(StatusCodes.OK).json(brands)
        }catch (e) {
            next(e)
        }
    }
    public async create(req:Request, res:Response, next:NextFunction){
        try{
            const dto = req.body;
            const brand = await brandService.create(dto);
            res.status(StatusCodes.CREATED).json(brand)
        }catch (e) {
            next(e)
        }
    }
}
export const modelController = new ModelController();
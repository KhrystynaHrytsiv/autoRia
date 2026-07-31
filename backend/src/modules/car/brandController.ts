import {NextFunction, Request, Response} from "express";
import {brandService} from "./brandService";
import {StatusCodes} from "../../common/enums/statusCodes";

class BrandController{
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
    public  async delete (req:Request, res:Response, next:NextFunction){
        try{
            const id = req.params.id as string;
            await brandService.delete(id)
            res.status(StatusCodes.NO_CONTENT).end()
        }catch (e) {
            next(e)
        }
    }
}
export const brandController = new BrandController();
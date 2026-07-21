import {CreateModelDto, IModel} from "../interfaces/IBrand";
import {modelRepository} from "../repositories/modelRepository";
import {apiError} from "../error/apiError";
import {StatusCodes} from "../enums/statusCodes";

class ModelService{
    getAll (brandId:string):Promise<IModel[]>{
        return modelRepository.getAll(brandId)
    }
    async create (dto:CreateModelDto):Promise<IModel>{
        const model = await modelRepository.create(dto);
        if(!model){
            throw new apiError("Model not found", StatusCodes.NOT_FOUND)
        }
        return model
    }
}
export const modelService = new ModelService();
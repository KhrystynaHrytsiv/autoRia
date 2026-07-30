import {CreateModelDto, IModel} from "../interfaces/IBrand";
import {modelRepository} from "../repositories/modelRepository";
import {apiError} from "../error/apiError";
import {StatusCodes} from "../enums/statusCodes";
import {brandRepository} from "../repositories/brandRepository";

class ModelService{
    public getAll (brandId:string):Promise<IModel[]>{
        return modelRepository.getAll(brandId)
    }
    public async create (dto:CreateModelDto):Promise<IModel>{
        const brand = await brandRepository.getByName(dto.brand);
        if(!brand){
            throw new apiError("Brand not found", StatusCodes.NOT_FOUND);
        }
        return modelRepository.create({name:dto.name, brandId:brand.id.toString()});
    }
    public async getIdByName(name:string):Promise<string>{
        const model = await modelRepository.getByName(name);
        if(!model){
            throw new apiError("Model not found", StatusCodes.NOT_FOUND)
        }
        return model.id.toString()
    }
    public async delete(id:string):Promise<void>{
        const model = await modelRepository.getById(id);
        if(!model){
            throw new apiError("Model not found", StatusCodes.NOT_FOUND)
        }
        await modelRepository.delete(id);
    }
}
export const modelService = new ModelService();
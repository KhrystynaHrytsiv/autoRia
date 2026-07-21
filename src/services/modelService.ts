import {IModel} from "../interfaces/IBrand";
import {modelRepository} from "../repositories/modelRepository";

class ModelService{
    getAll ():Promise<IModel[]>{
        return modelRepository.getAll()
    }
    create (dto:Partial<IModel>):Promise<IModel>{
        return modelRepository.create(dto)
    }
}
export const modelService = new ModelService();
import {CreateModelDto, IModel} from "../interfaces/IBrand";
import {Model} from "../models/modelModel";

class ModelRepository{
    getAll (brandId:string):Promise<IModel[]>{
        return Model.find({brandId})
    }
    public create (dto:CreateModelDto):Promise<IModel>{
        return Model.create(dto)
    }
}

export const modelRepository = new ModelRepository();
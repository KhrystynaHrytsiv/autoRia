import {IModel} from "../interfaces/IBrand";
import {Model} from "../models/modelModel";

class ModelRepository{
    getAll ():Promise<IModel[]>{
        return Model.find()
    }
    public create (dto:Partial<IModel>):Promise<IModel>{
        return Model.create(dto)
    }
}

export const modelRepository = new ModelRepository();
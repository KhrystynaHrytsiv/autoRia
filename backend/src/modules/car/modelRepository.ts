import {CreateModelDbDto, IModel} from "./ICar";
import {Model} from "./modelModel";

class ModelRepository{
    getAll (brandId:string):Promise<IModel[]>{
        return Model.find({brandId})
    }
    public create (dto:CreateModelDbDto):Promise<IModel>{
        return Model.create(dto)
    }
    public getById(id:string):Promise<IModel | null>{
        return Model.findById(id).populate("brandId");
    }
    public async getByName(name:string):Promise<IModel | null>{
        return Model.findOne({name});
    }
    public delete (id:string):Promise<IModel | null>{
        return Model.findByIdAndDelete(id)
    }
}

export const modelRepository = new ModelRepository();
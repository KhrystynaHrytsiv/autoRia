import {IBrand} from "../interfaces/ICar";
import {Brand} from "../models/brandModel";

class BrandRepository{
    public getAll():Promise<IBrand[]>{
        return Brand.find()
    }
    public create(dto: {name:string}):Promise<IBrand>{
        return Brand.create(dto)
    }
    public getById(id:string):Promise<IBrand | null>{
        return Brand.findById(id)
    }
    public async getByName(name:string):Promise<IBrand | null>{
        return Brand.findOne({name});
    }
    public delete (id:string):Promise<IBrand | null>{
        return  Brand.findByIdAndDelete(id)
    }
}
export const brandRepository = new BrandRepository();
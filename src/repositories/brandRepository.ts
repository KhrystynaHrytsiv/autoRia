import {IBrand} from "../interfaces/IBrand";
import {Brand} from "../models/brandModel";

class BrandRepository{
    public getAll():Promise<IBrand[]>{
        return Brand.find()
    }
    public create(dto: {name:string}):Promise<IBrand>{
        return Brand.create(dto)
    }
}
export const brandRepository = new BrandRepository();
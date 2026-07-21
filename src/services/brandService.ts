import {IBrand} from "../interfaces/IBrand";
import {brandRepository} from "../repositories/brandRepository";

class BrandService {
    public getAll ():Promise<IBrand[]>{
        return brandRepository.getAll()
    }
    public create (dto:Partial<IBrand>):Promise<IBrand>{
        return brandRepository.create(dto)
    }
}
export const brandService = new BrandService();
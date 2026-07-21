import {IBrand} from "../interfaces/IBrand";
import {brandRepository} from "../repositories/brandRepository";
import {apiError} from "../error/apiError";
import {StatusCodes} from "../enums/statusCodes";

class BrandService {
    public getAll ():Promise<IBrand[]>{
        return brandRepository.getAll()
    }
    public async create (dto:{name:string}):Promise<IBrand>{
        const brand = await brandRepository.create(dto);
        if (!brand){
            throw new apiError("Brand fot found ", StatusCodes.NOT_FOUND)
        }
        return brand
    }
}
export const brandService = new BrandService();
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
    public async getIdByName(name:string):Promise<string>{
        const brand = await brandRepository.getByName(name);
        if(!brand){
            throw new apiError("Brand fot found ", StatusCodes.NOT_FOUND)
        }
        return brand.id.toString()
    }

    public async delete (id:string):Promise<void>{
        const brand = await brandRepository.getById(id);
        if(!brand){
            throw new apiError('Brand not found', StatusCodes.NOT_FOUND)
        }
        await brandRepository.delete(id)
    }
}
export const brandService = new BrandService();
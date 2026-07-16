import {createAdvertDto, IAdvert, updateAdvertDto} from "../interfaces/IAdvert";
import {advertRepository} from "../repositories/advertRepository";
import {apiError} from "../error/apiError";
import {StatusCodes} from "../enums/statusCodes";

class AdvertService {
    public create(dto:createAdvertDto):Promise<IAdvert>{
        return advertRepository.create(dto)
    }
    public getAll():Promise<IAdvert[]>{
        return advertRepository.getAll()
    }
    public async getById(id:string):Promise<IAdvert | null>{
        const advert = await advertRepository.getById(id);
        if(!advert){
            throw new apiError("Advertisement not found", StatusCodes.NOT_FOUND)
        }
        return advert
    }

    public async update(id:string, dto:updateAdvertDto):Promise<IAdvert | null>{
        const advert = await advertRepository.update(id, dto);
        if (!advert){
            throw new apiError("Advertisement not found", StatusCodes.NOT_FOUND)
        }
        return advert
    }

    public async delete (id:string):Promise<void>{
        await advertRepository.delete(id);
    }
}
export const advertService = new AdvertService();
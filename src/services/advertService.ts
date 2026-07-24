import {createAdvertDto, IAdvert, updateAdvertDto} from "../interfaces/IAdvert";
import {advertRepository} from "../repositories/advertRepository";
import {apiError} from "../error/apiError";
import {StatusCodes} from "../enums/statusCodes";
import {currencyService} from "./currencyService";
import {RolesEnum} from "../enums/rolesEnum";


class AdvertService {
    public async create(dto:createAdvertDto):Promise<IAdvert>{
        const price = await currencyService.convertCurrency(dto.price);
        return advertRepository.create({...dto, price});
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
    public async checkAdvertPermission (advertId: string, userId: string, role: RolesEnum){
        const advert = await advertRepository.getById(advertId);
        if (!advert){
            throw new apiError("Advertisement not found", StatusCodes.NOT_FOUND)
        }
        const isOwner = advert.userId === userId;
        const hasPermission = role === RolesEnum.MANAGER || role === RolesEnum.ADMIN;
        if (!isOwner && !hasPermission){
            throw new apiError('No have permission', StatusCodes.FORBIDDEN)
        }
    }

    public async update(id:string, userId:string, dto:updateAdvertDto, role:RolesEnum):Promise<IAdvert | null>{
        await this.checkAdvertPermission(id, userId, role);
        return await advertRepository.update(id, dto);
    }

    public async delete (id:string, userId:string, role:RolesEnum):Promise<void>{
        await this.checkAdvertPermission(id, userId, role);
        await advertRepository.delete(id);
    }
}
export const advertService = new AdvertService();
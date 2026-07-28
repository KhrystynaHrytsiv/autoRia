import {createAdvertDto, IAdvert, updateAdvertDto} from "../interfaces/IAdvert";
import {advertRepository} from "../repositories/advertRepository";
import {apiError} from "../error/apiError";
import {StatusCodes} from "../enums/statusCodes";
import {currencyService} from "./currencyService";
import {RolesEnum} from "../enums/rolesEnum";
import {brandService} from "./brandService";
import {modelService} from "./modelService";
import {userService} from "./userService";
import {AccountTypeEnum} from "../enums/accountTypeEnum";


class AdvertService {
    public async prepareAdvert (dto: createAdvertDto| updateAdvertDto) {
        const data: any = {...dto};
        if(dto.brand){
            data.brand = await brandService.getIdByName(dto.brand);
        }
        if(dto.model){
            data.model = await modelService.getIdByName(dto.model);
        }
        if (dto.price) {
            data.price = await currencyService.convertCurrency(dto.price)
        }
        return data
    }
    public async create(userId:string, dto:createAdvertDto):Promise<IAdvert>{
        await this.checkAdvertLimit(userId)
        const advertData = await this.prepareAdvert(dto)
        return advertRepository.create(advertData);
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
    public async isOwner (advertId: string, userId: string){
        const advert = await advertRepository.getById(advertId);
        if (!advert){
            throw new apiError("Advertisement not found", StatusCodes.NOT_FOUND)
        }
        const isOwner = advert.userId.toString() === userId;
        if (!isOwner){
            throw new apiError('No have permission as is owner', StatusCodes.FORBIDDEN)
        }
    }
    public async update(id:string, userId:string, dto:updateAdvertDto, role:RolesEnum):Promise<IAdvert | null>{
        if (role !== RolesEnum.ADMIN) {
            await this.isOwner(id, userId);
        }
        const advertData = await this.prepareAdvert(dto)
        return advertRepository.update(id, advertData);
    }

    public async delete (id:string, userId:string, role:RolesEnum):Promise<void>{
        const hasPermission = role === RolesEnum.MANAGER || role === RolesEnum.ADMIN;
        if(!hasPermission){
            await this.isOwner(id, userId);
        }
        await advertRepository.delete(id);
    }

    public async checkAdvertLimit(userId:string){
        const user = await userService.getById(userId);
        if(!user){
            throw new apiError("User not found", StatusCodes.NOT_FOUND)
        }
        if (user.accountType === AccountTypeEnum.PREMIUM){
            return
        }
        const counts = await advertRepository.countAdverts(userId);
        if (counts >= 1){
            throw new apiError("Basic account can crete only one advertisement", StatusCodes.FORBIDDEN)
        }

    }
}
export const advertService = new AdvertService();
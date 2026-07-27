import {createAdvertDto, IAdvert, updateAdvertDto} from "../interfaces/IAdvert";
import {Advertisement} from "../models/advertModel";

class AdvertRepository{
    public async create(dto:createAdvertDto):Promise<IAdvert>{
        return  await Advertisement.create(dto);
    }
    public getById(id:string):Promise<IAdvert | null>{
        return Advertisement.findById(id)
    }
    public getAll():Promise<IAdvert[]>{
        return Advertisement.find()
    }
    public update(id:string, dto:updateAdvertDto):Promise<IAdvert | null>{
        return Advertisement.findByIdAndUpdate(id, dto, {returnDocument:"after"})
    }
    public delete (id:string):Promise<IAdvert | null>{
        return Advertisement.findByIdAndDelete(id);
    }
    public countAdverts(userId:string):Promise<number>{
        return Advertisement.countDocuments({userId})
    }
}
export const advertRepository = new AdvertRepository();

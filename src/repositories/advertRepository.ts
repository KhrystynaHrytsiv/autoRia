import {createAdvertDto, IAdvert, updateAdvertDto} from "../interfaces/IAdvert";
import {Advertisement} from "../models/advertModel";

class AdvertRepository{
    public create(dto:createAdvertDto):Promise<IAdvert>{
        return Advertisement.create(dto)
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
}
export const advertRepository = new AdvertRepository();
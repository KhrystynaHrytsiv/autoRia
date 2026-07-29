import {createAdvertDto, IAdvert} from "../interfaces/IAdvert";
import {Advertisement} from "../models/advertModel";

class AdvertRepository{
    public async create(userId:string, dto:createAdvertDto):Promise<IAdvert>{
        return  await Advertisement.create({...dto, userId});
    }
    public getById(id:string):Promise<IAdvert | null>{
        return Advertisement.findById(id)
    }
    public getAll():Promise<IAdvert[]>{
        return Advertisement.find()
    }
    public update(id:string, dto:Partial<IAdvert>):Promise<IAdvert | null>{
        return Advertisement.findByIdAndUpdate(id, dto, {returnDocument:"after"})
    }
    public delete (id:string):Promise<IAdvert | null>{
        return Advertisement.findByIdAndDelete(id);
    }
    public countAdverts(userId:string):Promise<number>{
        return Advertisement.countDocuments({userId})
    }
    public incrementViews (advertId:string){
        return Advertisement.findByIdAndUpdate(advertId, {$inc:{views: 1}}, {returnDocument: "after"});
    }
}
export const advertRepository = new AdvertRepository();

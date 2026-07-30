import {createAdvertDto, IAdvert} from "../interfaces/IAdvert";
import {Advertisement} from "../models/advertModel";
import {AdvertStatus} from "../enums/advertStatus";

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
    public async countAvgPriceByCountry(advert:Partial<IAdvert>){
        const result = await Advertisement.aggregate([
            {
                $match: {
                    brand: advert.brand,
                    model: advert.model,
                    "location.country": advert.location!.country,
                    status: AdvertStatus.active
                }
            },
            {
                $group: {
                    _id: null,
                    averagePrice: {
                        $avg: "$price.original.value"
                    }
                }
            }
        ]);
        return result[0]?.averagePrice ?? 0;

    }

    public async countAvgPriceByRegion(advert:Partial<IAdvert>){
        const result = await Advertisement.aggregate([
            {
                $match: {
                    brand: advert.brand,
                    model: advert.model,
                    "location.region": advert.location!.region,
                    status: AdvertStatus.active
                }
            },
            {
                $group: {
                    _id: null,
                    averagePrice: {
                        $avg: "$price.original.value"
                    }
                }
            }
        ])
        return result[0]?.averagePrice ?? 0;
    }
}
export const advertRepository = new AdvertRepository();

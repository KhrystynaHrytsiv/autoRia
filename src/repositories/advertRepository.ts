import {createAdvertDto, IAdvert, updateAdvertDto} from "../interfaces/IAdvert";
import {Advertisement} from "../models/advertModel";
// import {Brand} from "../models/brandModel";
// import {apiError} from "../error/apiError";
// import {StatusCodes} from "../enums/statusCodes";
// import {Model} from "../models/modelModel";

class AdvertRepository{
    public async create(dto:createAdvertDto):Promise<IAdvert>{
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
        // const brand = await Brand.findOne({ name: dto.brand });
        // if(!brand){
        //     throw new apiError('Brand not found', StatusCodes.NOT_FOUND)
        // }
        // const model = await Model.findOne({name: dto.model, brand: brand.id});
        // if (!model){
        //     throw new apiError("Invalid model", StatusCodes.BAD_REQUEST)
        // }
        // return  await Advertisement.create({
        //     ...dto, brand: brand._id, model: model._id});

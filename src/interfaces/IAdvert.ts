import {AdvertStatus} from "../enums/advertStatus";
import {IPrice} from "./IPrice";

interface IAdvert {
    id:string,
    userId:string,
    title:string,
    brand:string,
    model:string,
    price:IPrice
    year:number,
    description:string,
    status: AdvertStatus
}

type createAdvertDto = Pick<IAdvert, "title" | 'brand' | 'model' | 'price' | 'year' | 'description' >
type updateAdvertDto = Partial <createAdvertDto>;
export type{createAdvertDto, updateAdvertDto, IAdvert}
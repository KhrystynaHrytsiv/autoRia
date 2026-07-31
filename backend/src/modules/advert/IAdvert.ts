import {IPrice} from "../../interfaces/IPrice";
import {AdvertStatus} from "../../common/enums/advertStatus";


interface IAdvert {
    id:string,
    userId:string,
    title:string,
    brand:string,
    model:string,
    price:IPrice
    year:number,
    description:string,
    location:{
        region:string,
        country:string
    },
    status: AdvertStatus,
    attempts:number,
    views:number
}

type createAdvertDto = Pick<IAdvert, "title" | "description" | "brand" | "model" | "year" | "price" | "location">

type updateAdvertDto = Partial <createAdvertDto>;
export type{createAdvertDto, updateAdvertDto, IAdvert}
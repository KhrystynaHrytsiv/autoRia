import {createPriceDto, IPrice} from "./IPrice";
import {AdvertStatus} from "../enums/advertStatus";


interface IAdvert {
    id:string,
    userId:string,
    title:string,
    brand:string,
    model:string,
    price:IPrice
    year:number,
    description:string,
    status: AdvertStatus,
    attempts:number
}

interface createAdvertDto {
    title: string;
    brand: string;
    model: string;
    year: number;
    price: createPriceDto;
    description: string;
}

type updateAdvertDto = Partial <createAdvertDto>;
export type{createAdvertDto, updateAdvertDto, IAdvert}
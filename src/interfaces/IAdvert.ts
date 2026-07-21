// import {CurrencyEnum} from "../enums/currencyEnum";
import {AdvertStatus} from "../enums/advertStatus";

interface IAdvert {
    id:string,
    userId:string,
    title:string,
    brand:string,
    model:string,
    // price:{
    //     value:number,
    //     currency: CurrencyEnum
    // },
    price:number,
    year:number,
    description:string,
    status: AdvertStatus
}

type createAdvertDto = Pick<IAdvert, "title" | 'brand' | 'model' | 'price' | 'year' | 'description' >
type updateAdvertDto = Partial <createAdvertDto>;
export type{createAdvertDto, updateAdvertDto, IAdvert}
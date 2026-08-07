import { AdvertStatus } from "../enums/advertStatus";
import { IPrice } from "./IPrice";

interface IAdvert {
    id: string;
    userId: string;
    title: string;
    brand: string;
    model: string;
    price: IPrice;
    year: number;
    description: string;
    images: string[];
    location: {
        region: string;
        country: string;
    };
    status: AdvertStatus;
    attempts: number;
}

type createAdvertDto = Pick<
    IAdvert,
    | "title"
    | "description"
    | "brand"
    | "model"
    | "year"
    | "price"
    | "location"
    | "images"
>;

interface updateAdvertDto extends Partial<IAdvert> {
    removeImages?: string[];
}
export type { createAdvertDto, IAdvert, updateAdvertDto };

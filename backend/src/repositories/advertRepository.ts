import { QueryFilter } from "mongoose";

import { AdvertStatus } from "../enums/advertStatus";
import { createAdvertDto, IAdvert } from "../interfaces/IAdvert";
import { IAdvertQuery } from "../interfaces/IQuery";
import { Advertisement } from "../models/advertModel";
import { brandService } from "../services/brandService";
import { modelService } from "../services/modelService";

class AdvertRepository {
    public async create(
        userId: string,
        dto: createAdvertDto,
    ): Promise<IAdvert> {
        return await Advertisement.create({ ...dto, userId });
    }
    public getById(id: string): Promise<IAdvert | null> {
        return Advertisement.findById(id);
    }
    public async getAll(query: IAdvertQuery): Promise<[IAdvert[], number]> {
        const skip = query.pageSize * (query.page - 1);
        const filterObject: QueryFilter<IAdvert> = {
            status: AdvertStatus.active,
        };
        if (query.brand) {
            filterObject.brand = await brandService.getIdByName(query.brand);
        }
        if (query.model) {
            const { id } = await modelService.getByName(query.model);
            filterObject.model = id;
        }
        if (query.year) {
            filterObject.year = +query.year;
        }
        if (query.price) {
            filterObject["price.original.value"] = query.price;
        }
        return await Promise.all([
            Advertisement.find(filterObject)
                .limit(query.pageSize)
                .skip(skip)
                .sort(query.order),
            Advertisement.find(filterObject).countDocuments(),
        ]);
    }
    public update(id: string, dto: Partial<IAdvert>): Promise<IAdvert | null> {
        return Advertisement.findByIdAndUpdate(id, dto, {
            returnDocument: "after",
        });
    }
    public delete(id: string): Promise<IAdvert | null> {
        return Advertisement.findByIdAndDelete(id);
    }
    public countAdverts(userId: string): Promise<number> {
        return Advertisement.countDocuments({ userId });
    }
    public incrementViews(advertId: string) {
        return Advertisement.findByIdAndUpdate(
            advertId,
            { $inc: { views: 1 } },
            { returnDocument: "after" },
        );
    }
    public async countAvgPriceByCountry(advert: Partial<IAdvert>) {
        const result = await Advertisement.aggregate([
            {
                $match: {
                    brand: advert.brand,
                    model: advert.model,
                    "location.country": advert.location!.country,
                    status: AdvertStatus.active,
                },
            },
            {
                $group: {
                    _id: null,
                    averagePrice: {
                        $avg: "$price.original.value",
                    },
                },
            },
        ]);
        return result[0]?.averagePrice ?? 0;
    }

    public async countAvgPriceByRegion(advert: Partial<IAdvert>) {
        const result = await Advertisement.aggregate([
            {
                $match: {
                    brand: advert.brand,
                    model: advert.model,
                    "location.region": advert.location!.region,
                    status: AdvertStatus.active,
                },
            },
            {
                $group: {
                    _id: null,
                    averagePrice: {
                        $avg: "$price.original.value",
                    },
                },
            },
        ]);
        return result[0]?.averagePrice ?? 0;
    }
}
export const advertRepository = new AdvertRepository();

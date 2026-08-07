import { AdvertStatus } from "../enums/advertStatus";
import { RolesEnum } from "../enums/rolesEnum";
import { StatusCodes } from "../enums/statusCodes";
import { apiError } from "../error/apiError";
import { advertHelper } from "../helper/advertHelper";
import {
    createAdvertDto,
    IAdvert,
    updateAdvertDto,
} from "../interfaces/IAdvert";
import { IResPagination } from "../interfaces/IPagination";
import { IAdvertQuery } from "../interfaces/IQuery";
import { advertRepository } from "../repositories/advertRepository";
import { advertViewRepository } from "../repositories/advertViewRepository";
import { textModerationService } from "./textModerationService";

class AdvertService {
    public async getAll(query: IAdvertQuery): Promise<IResPagination<IAdvert>> {
        const [data, totalItems] = await advertRepository.getAll(query);
        const totalPages = Math.ceil(totalItems / query.pageSize);
        return {
            totalItems,
            totalPages,
            prevPage: !!(query.page - 1),
            nextPage: query.page < totalPages,
            data,
        };
    }

    public async create(
        userId: string,
        dto: createAdvertDto,
    ): Promise<IAdvert> {
        await advertHelper.checkAdvertLimit(userId);
        const advertData = await advertHelper.prepareAdvert(dto);
        advertData.userId = userId;
        const status = textModerationService.check(
            `${dto.title} ${dto.description}`,
        )
            ? (advertData.status = AdvertStatus.pending_edit)
            : (advertData.status = AdvertStatus.active);

        return await advertRepository.create(userId, { ...advertData, status });
    }

    public async getById(id: string): Promise<IAdvert | null> {
        const advert = await advertRepository.getById(id);
        if (!advert) {
            throw new apiError(
                "Advertisement not found",
                StatusCodes.NOT_FOUND,
            );
        }
        await advertRepository.incrementViews(id);
        await advertViewRepository.create(id);
        return advert;
    }
    public async update(
        id: string,
        userId: string,
        dto: updateAdvertDto,
        role: RolesEnum,
    ): Promise<IAdvert | null> {
        if (role !== RolesEnum.ADMIN && role !== RolesEnum.MANAGER) {
            await advertHelper.isOwner(id, userId);
        }
        const advert = await advertRepository.getById(id);
        if (!advert) {
            throw new apiError(
                "Advertisement not found",
                StatusCodes.NOT_FOUND,
            );
        }
        await advertHelper.updateImages(advert, dto);
        const advertData = await advertHelper.prepareAdvert(dto);
        const hasBadWords = advertHelper.checkModeration(advert, advertData);
        if (hasBadWords) {
            const newAttempt = (advert.attempts ?? 0) + 1;
            if (newAttempt >= 3) {
                await advertHelper.blockAdvert(id, advertData, newAttempt);
            }
            return await advertRepository.update(id, {
                ...advertData,
                images: advert.images,
                status: AdvertStatus.pending_edit,
                attempts: newAttempt,
            });
        }
        console.log("advert.images after updateImages:", advert.images);
        return await advertRepository.update(id, {
            ...advertData,
            images: advert.images,
            status: AdvertStatus.active,
            attempts: advert.attempts,
        });
    }
    public async delete(
        id: string,
        userId: string,
        role: RolesEnum,
    ): Promise<void> {
        const hasPermission =
            role === RolesEnum.MANAGER || role === RolesEnum.ADMIN;
        if (!hasPermission) {
            await advertHelper.isOwner(id, userId);
        }
        await advertRepository.delete(id);
    }
    public getByIdWithoutViews(id: string) {
        return advertRepository.getById(id);
    }
}
export const advertService = new AdvertService();

import { AccountTypeEnum } from "../enums/accountTypeEnum";
import { AdvertStatus } from "../enums/advertStatus";
import { RolesEnum } from "../enums/rolesEnum";
import { StatusCodes } from "../enums/statusCodes";
import { apiError } from "../error/apiError";
import {
    createAdvertDto,
    IAdvert,
    updateAdvertDto,
} from "../interfaces/IAdvert";
import { advertRepository } from "../repositories/advertRepository";
import { advertViewRepository } from "../repositories/advertViewRepository";
import { brandService } from "./brandService";
import { currencyService } from "./currencyService";
import { modelService } from "./modelService";
import { notificationService } from "./notificationService";
import { textModerationService } from "./textModerationService";
import { userService } from "./userService";

class AdvertService {
    public async prepareAdvert(dto: createAdvertDto | updateAdvertDto) {
        const data: any = { ...dto };
        if (dto.brand) {
            data.brand = await brandService.getIdByName(dto.brand);
        }
        if (dto.model) {
            data.model = await modelService.getIdByName(dto.model);
        }
        if (dto.price) {
            data.price = await currencyService.convertCurrency(dto.price);
        }
        return data;
    }

    public async create(
        userId: string,
        dto: createAdvertDto,
    ): Promise<IAdvert> {
        await this.checkAdvertLimit(userId);
        const advertData = await this.prepareAdvert(dto);
        advertData.userId = userId;
        const status = textModerationService.check(
            `${dto.title} ${dto.description}`,
        )
            ? (advertData.status = AdvertStatus.pending_edit)
            : (advertData.status = AdvertStatus.active);

        return await advertRepository.create(userId, { ...advertData, status });
    }

    public getAll(): Promise<IAdvert[]> {
        return advertRepository.getAll();
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
    public async isOwner(advertId: string, userId: string) {
        const advert = await advertRepository.getById(advertId);
        if (!advert) {
            throw new apiError(
                "Advertisement not found",
                StatusCodes.NOT_FOUND,
            );
        }
        const isOwner = advert.userId.toString() === userId;
        if (!isOwner) {
            throw new apiError(
                "No have permission as is owner",
                StatusCodes.FORBIDDEN,
            );
        }
    }
    public async update(
        id: string,
        userId: string,
        dto: Partial<IAdvert>,
        role: RolesEnum,
    ): Promise<IAdvert | null> {
        if (role !== RolesEnum.ADMIN && role !== RolesEnum.MANAGER) {
            await this.isOwner(id, userId);
        }
        const advert = await advertRepository.getById(id);
        if (!advert) {
            throw new apiError(
                "Advertisement not found",
                StatusCodes.NOT_FOUND,
            );
        }
        const advertData = await this.prepareAdvert(dto);
        const updatedAdvert = {
            title: advert.title,
            description: advert.description,
            ...advertData,
        };
        const text = `${updatedAdvert.title ?? ""} ${updatedAdvert.description ?? ""}`;
        const hasBadWords = textModerationService.check(text);
        if (hasBadWords) {
            const newAttempt = (advert.attempts ?? 0) + 1;
            if (newAttempt >= 3) {
                const blockedAdvert = await advertRepository.update(id, {
                    ...advertData,
                    status: AdvertStatus.inactive,
                    attempts: newAttempt,
                });
                if (blockedAdvert) {
                    await notificationService.sendToManager(blockedAdvert);
                }
                throw new apiError(
                    "Advertisement blocked after 3 attempts",
                    StatusCodes.BAD_REQUEST,
                );
            }
            return await advertRepository.update(id, {
                ...advertData,
                status: AdvertStatus.pending_edit,
                attempts: newAttempt,
            });
        }
        return await advertRepository.update(id, {
            ...advertData,
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
            await this.isOwner(id, userId);
        }
        await advertRepository.delete(id);
    }

    public async checkAdvertLimit(userId: string) {
        const user = await userService.getById(userId);
        if (!user) {
            throw new apiError("User not found", StatusCodes.NOT_FOUND);
        }
        if (user.accountType === AccountTypeEnum.PREMIUM) {
            return;
        }
        const counts = await advertRepository.countAdverts(userId);
        if (counts >= 1) {
            throw new apiError(
                "Basic account can crete only one advertisement",
                StatusCodes.FORBIDDEN,
            );
        }
    }
    public getByIdWithoutViews(id: string) {
        return advertRepository.getById(id);
    }
}
export const advertService = new AdvertService();

import fs from "node:fs/promises";
import path from "node:path";

import { AccountTypeEnum } from "../enums/accountTypeEnum";
import { AdvertStatus } from "../enums/advertStatus";
import { StatusCodes } from "../enums/statusCodes";
import { apiError } from "../error/apiError";
import type {
    createAdvertDto,
    IAdvert,
    updateAdvertDto,
} from "../interfaces/IAdvert";
import { advertRepository } from "../repositories/advertRepository";
import { brandService } from "../services/brandService";
import { currencyService } from "../services/currencyService";
import { modelService } from "../services/modelService";
import { notificationService } from "../services/notificationService";
import { textModerationService } from "../services/textModerationService";
import { userService } from "../services/userService";

class AdvertHelper {
    public async prepareAdvert(dto: createAdvertDto | updateAdvertDto) {
        const data: any = { ...dto };

        if (dto.brand) {
            data.brand = await brandService.getIdByName(dto.brand);
        }
        if (dto.model) {
            const model = await modelService.getByName(dto.model);

            if (dto.brand && model.brandId !== data.brand) {
                throw new Error('Selected model does not belong to selected brand');
            }
            data.model = model.id;
        }
        if (dto.price) {
            data.price = await currencyService.convertCurrency(dto.price);
        }
        return data;
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

    public async updateImages(
        advert: IAdvert,
        dto: updateAdvertDto,
    ): Promise<void> {
        const removeImages = (
            Array.isArray(dto.removeImages)
                ? dto.removeImages
                : dto.removeImages
                  ? [dto.removeImages]
                  : []
        ).map((image) => path.basename(image));
        if (removeImages.length) {
            for (const image of removeImages) {
                const filename = path.basename(image);
                const filePath = path.join(process.cwd(), "uploads", filename);
                await fs.unlink(filePath);
            }
            advert.images = advert.images.filter(
                (image) => !removeImages.includes(image),
            );
        }

        if (dto.images?.length) {
            advert.images.push(...dto.images);
        }
    }
    public checkModeration(
        advert: IAdvert,
        advertData: Partial<IAdvert>,
    ): boolean {
        const updatedAdvert = {
            title: advert.title,
            description: advert.description,
            ...advertData,
        };

        const text = `${updatedAdvert.title ?? ""} ${updatedAdvert.description ?? ""}`;

        return textModerationService.check(text);
    }
    public async blockAdvert(
        id: string,
        advertData: Partial<IAdvert>,
        attempts: number,
    ) {
        const advert = await advertRepository.update(id, {
            ...advertData,
            status: AdvertStatus.inactive,
            attempts,
        });

        if (advert) {
            await notificationService.sendToManager(advert);
        }

        throw new apiError(
            "Advertisement blocked after 3 attempts",
            StatusCodes.BAD_REQUEST,
        );
    }
}
export const advertHelper = new AdvertHelper();

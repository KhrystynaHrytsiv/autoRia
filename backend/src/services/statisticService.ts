import { startOfDay, subDays, subMonths } from "date-fns";

import { AccountTypeEnum } from "../enums/accountTypeEnum";
import { RolesEnum } from "../enums/rolesEnum";
import { StatusCodes } from "../enums/statusCodes";
import { apiError } from "../error/apiError";
import { IAdvert } from "../interfaces/IAdvert";
import { advertRepository } from "../repositories/advertRepository";
import { advertViewRepository } from "../repositories/advertViewRepository";
import { advertService } from "./advertService";
import { userService } from "./userService";

class StatisticService {
    public async getViews(advertId: string) {
        return {
            total: await advertViewRepository.countAll(advertId),
            today: await advertViewRepository.countFromDate(
                advertId,
                startOfDay(new Date()),
            ),
            week: await advertViewRepository.countFromDate(
                advertId,
                subDays(new Date(), 7),
            ),
            month: await advertViewRepository.countFromDate(
                advertId,
                subMonths(new Date(), 1),
            ),
        };
    }

    public async calcAvgPrice(advert: IAdvert) {
        return {
            averagePriceByCountry:
                await advertRepository.countAvgPriceByCountry(advert),
            averagePriceByRegion:
                await advertRepository.countAvgPriceByRegion(advert),
        };
    }

    private async checkStatisticAccess(advertId: string, userId: string) {
        const user = await userService.getById(userId);
        if (!user) {
            throw new apiError("User not found", StatusCodes.NOT_FOUND);
        }
        const advert = await advertService.getByIdWithoutViews(advertId);
        if (!advert) {
            throw new apiError(
                "Advertisement not found",
                StatusCodes.NOT_FOUND,
            );
        }
        if (user.role === RolesEnum.MANAGER || user.role === RolesEnum.ADMIN) {
            return advert;
        }
        if (user.accountType !== AccountTypeEnum.PREMIUM) {
            throw new apiError(
                "Premium account required",
                StatusCodes.FORBIDDEN,
            );
        }
        if (advert.userId.toString() !== userId) {
            throw new apiError(
                "You can see statistics only for your advertisements",
                StatusCodes.FORBIDDEN,
            );
        }

        return advert;
    }
    public async getStatistics(advertId: string, userId: string) {
        const advert = await this.checkStatisticAccess(advertId, userId);
        const [views, averagePrice] = await Promise.all([
            this.getViews(advertId),
            this.calcAvgPrice(advert),
        ]);
        return { views, ...averagePrice };
    }
}
export const statisticService = new StatisticService();

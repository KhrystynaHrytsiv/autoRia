import { config } from "../configs/config";
import { emailConstants } from "../constants/emailData";
import { EmailEnum } from "../enums/emailEnum";
import { StatusCodes } from "../enums/statusCodes";
import { apiError } from "../error/apiError";
import { IAdvert } from "../interfaces/IAdvert";
import { IBrandRequest, IModelRequest } from "../interfaces/ICarRequest";
import { IUser } from "../interfaces/IUser";
import { userRepository } from "../repositories/userRepository";
import { emailService } from "./emailService";
import { userService } from "./userService";

class NotificationService {
    public async sendCreateRequest(
        userId: string,
        request: IBrandRequest | IModelRequest,
    ) {
        const user = await userService.getById(userId);
        await emailService.sendEmail(
            user.email,
            emailConstants[EmailEnum.request],
            { name: user.name, car: request.name },
        );
    }
    public async sendStatusRequest(
        updatedRequest: IBrandRequest | IModelRequest,
    ) {
        const { email } = await userService.getById(updatedRequest.userId);
        await emailService.sendEmail(
            email,
            emailConstants[EmailEnum.statusRequest],
            { status: updatedRequest.status },
        );
    }
    public async sendToManager(advert: IAdvert) {
        const manager = await userRepository.getByEmail(config.EMAIL_USER);
        if (!manager) {
            throw new apiError("Manager not found", StatusCodes.NOT_FOUND);
        }
        await emailService.sendEmail(
            manager.email,
            emailConstants[EmailEnum.invalidAdvert],
            { name: manager.name, advert: advert.id },
        );
    }

    public async premiumAccount(user: IUser) {
        await emailService.sendEmail(
            user.email,
            emailConstants[EmailEnum.premium],
            { name: user.name },
        );
    }
    public async blockedAccount(user: IUser) {
        await emailService.sendEmail(
            user.email,
            emailConstants[EmailEnum.blockedAccount],
            { name: user.name },
        );
    }
    public async activateAccount(user: IUser) {
        await emailService.sendEmail(
            user.email,
            emailConstants[EmailEnum.unblockedAccount],
            { name: user.name },
        );
    }
}
export const notificationService = new NotificationService();

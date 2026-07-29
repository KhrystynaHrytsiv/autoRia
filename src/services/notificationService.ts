import {emailService} from "./emailService";
import {emailConstants} from "../constants/emailData";
import {EmailEnum} from "../enums/emailEnum";
import {userService} from "./userService";
import {IBrandRequest, IModelRequest} from "../interfaces/IBrandRequest";
import {IAdvert} from "../interfaces/IAdvert";
import {config} from "../configs/config";
import {userRepository} from "../repositories/userRepository";
import {apiError} from "../error/apiError";
import {StatusCodes} from "../enums/statusCodes";

class NotificationService {
    public async sendCreateRequest (userId:string, request:IBrandRequest | IModelRequest){
        const user = await userService.getById(userId);
        await emailService.sendEmail(user.email, emailConstants[EmailEnum.request], {name: user.name, car: request.name });
    }
    public async sendStatusRequest (updatedRequest:IBrandRequest | IModelRequest){
        const {email} = await userService.getById(updatedRequest.userId);
        await emailService.sendEmail(email, emailConstants[EmailEnum.statusRequest], {status:updatedRequest.status})
    }
    public async sendToManager (advert:IAdvert){
        const manager = await userRepository.getByEmail(config.EMAIL_USER);
        if(!manager){
            throw new apiError("Manager not found", StatusCodes.NOT_FOUND)
        }
       await emailService.sendEmail(manager.email, emailConstants[EmailEnum.blockedAdvert], {name:manager.name ,advert: advert.id})
    }
}
export const notificationService = new NotificationService();

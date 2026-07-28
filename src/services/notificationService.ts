import {emailService} from "./emailService";
import {emailConstants} from "../constants/emailData";
import {EmailEnum} from "../enums/emailEnum";
import {userService} from "./userService";
import {IBrandRequest, IModelRequest} from "../interfaces/IBrandRequest";

class NotificationService {
    public async sendCreateRequest (userId:string, request:IBrandRequest | IModelRequest){
        const user = await userService.getById(userId);
        await emailService.sendEmail(user.email, emailConstants[EmailEnum.request], {name: user.name, car: request.name });
    }
    public async sendStatusRequest (updatedRequest:IBrandRequest | IModelRequest){
        const {email} = await userService.getById(updatedRequest.userId);
        await emailService.sendEmail(email, emailConstants[EmailEnum.statusRequest], {status:updatedRequest.status})
    }
}
export const notificationService = new NotificationService();

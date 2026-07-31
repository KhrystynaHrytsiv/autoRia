import {IUser, IUserCreateDto} from "./IUser";
import {userRepository} from "./userRepository";
import {apiError} from "../../common/error/apiError";
import {StatusCodes} from "../../common/enums/statusCodes";
import {RolesEnum} from "../../common/enums/rolesEnum";
import {passwordService} from "../../services/passwordService";
import {AccountTypeEnum} from "../../common/enums/accountTypeEnum";
import {notificationService} from "../../services/notificationService";

class UserService{
    async getAll ():Promise<IUser[]>{
        return await userRepository.getAllUsers()
    }
    async getById(id:string):Promise<IUser>{
        const user = await userRepository.getById(id);
        if(!user){
            throw new apiError("Invalid id or user not found", StatusCodes.BAD_REQUEST)
        }
        return user
    }

    public async isEmailUniq(email:string):Promise<void>{
        const user = await userRepository.getByEmail(email);
        if(user){
            throw new apiError("User is already exists", StatusCodes.BAD_REQUEST)
        }
    }
    public async createWithRole (dto:IUserCreateDto, role:RolesEnum):Promise<IUser> {
        await this.isEmailUniq(dto.email);
        const password = await passwordService.hashPassword(dto.password);
        return  userRepository.create({...dto, password, role});
    }
    public async createManager (dto:IUserCreateDto):Promise<IUser>{
       return await this.createWithRole(dto, RolesEnum.MANAGER)
    }
    public async blockUser (id:string):Promise<IUser>{
        const user = await userRepository.blockUser(id);
        if(!user){
            throw new apiError("User not found", StatusCodes.NOT_FOUND)
        }
        await notificationService.blockedAccount(user);
        return user

    }
    public async unBlockUser (id:string):Promise<IUser>{
        const user = await userRepository.unBlockUser(id);
        if(!user){
            throw new apiError("User not found", StatusCodes.NOT_FOUND)
        }
        await notificationService.activateAccount(user)
        return user

    }
    public async changeToPremiumAccount (id:string):Promise<IUser | null>{
        const user = await userRepository.update(id, {accountType: AccountTypeEnum.PREMIUM});
        if (!user){
            throw new apiError("User not found", StatusCodes.NOT_FOUND)
        }
        await notificationService.premiumAccount(user);
        return user
    }
}
export const userService = new UserService();
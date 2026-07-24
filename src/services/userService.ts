import {IUser, IUserCreateDto} from "../interfaces/IUser";
import {userRepository} from "../repositories/userRepository";
import {apiError} from "../error/apiError";
import {StatusCodes} from "../enums/statusCodes";
import {RolesEnum} from "../enums/rolesEnum";
import {passwordService} from "./passwordService";

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
        return user

    }
    public async unBlockUser (id:string):Promise<IUser>{
        const user = await userRepository.unBlockUser(id);
        if(!user){
            throw new apiError("User not found", StatusCodes.NOT_FOUND)
        }
        return user

    }
}
export const userService = new UserService();
import {IUser} from "../interfaces/IUser";
import {userRepository} from "../repositories/userRepository";
import {apiError} from "../error/apiError";
import {StatusCodes} from "../enums/statusCodes";

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
}
export const userService = new UserService();
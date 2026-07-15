import type {IUser, IUserCreateDto} from "../interfaces/IUser";
import {User} from "../models/userModel";

class UserRepository {
    getAllUsers ():Promise<IUser[]>{
        return User.find()
    }
    async getById(id:string):Promise<IUser | null>{
        return User.findById(id);
    }
    public async getByEmail(email:string):Promise<IUser | null>{
        return User.findOne({email})
    }
    public async create (user:IUserCreateDto):Promise<IUser>{
        return User.create(user)
    }

}
export const userRepository = new UserRepository();
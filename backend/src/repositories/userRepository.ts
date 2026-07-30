import type {IUser, IUserCreateDto} from "../interfaces/IUser";
import {User} from "../models/userModel";
import {RolesEnum} from "../enums/rolesEnum";

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
    public async create (user:IUserCreateDto & {role:RolesEnum}):Promise<IUser>{
        return User.create(user)
    }
    public async update (id:string, dto:Partial<IUser>):Promise<IUser | null>{
        return User.findByIdAndUpdate(id, dto, {returnDocument: "after"})
    }
   public async blockUser (id:string):Promise<IUser | null>{
        return User.findByIdAndUpdate(id, {isActive: false}, { returnDocument: "after" })
   }
   public async unBlockUser (id:string):Promise<IUser | null>{
        return User.findByIdAndUpdate(id, {isActive: true}, { returnDocument: "after" })
   }

}
export const userRepository = new UserRepository();
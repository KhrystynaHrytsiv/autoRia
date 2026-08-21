import { RolesEnum } from "../enums/rolesEnum";
import { UserStatus } from "../enums/userActionEnum";
import type { IUser, IUserCreateDto } from "../interfaces/IUser";
import { User } from "../models/userModel";

class UserRepository {
    public getAllUsers(): Promise<IUser[]> {
        return User.find();
    }
    public getById(id: string): Promise<IUser | null> {
        return User.findById(id);
    }
    public getByEmail(email: string): Promise<IUser | null> {
        return User.findOne({ email });
    }
    public async create(
        user: IUserCreateDto & { role: RolesEnum },
    ): Promise<IUser> {
        return await User.create(user);
    }
    public update(id: string, dto: Partial<IUser>): Promise<IUser | null> {
        return User.findByIdAndUpdate(id, dto, {
            returnDocument: "after",
        });
    }
    public changeStatus(id: string, status: UserStatus) {
        return User.findByIdAndUpdate(
            id,
            { status },
            { returnDocument: "after" },
        );
    }
}
export const userRepository = new UserRepository();

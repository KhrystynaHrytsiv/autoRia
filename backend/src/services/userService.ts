import { AccountTypeEnum } from "../enums/accountTypeEnum";
import { RolesEnum } from "../enums/rolesEnum";
import { StatusCodes } from "../enums/statusCodes";
import { apiError } from "../error/apiError";
import { IUser, IUserCreateDto } from "../interfaces/IUser";
import { userRepository } from "../repositories/userRepository";
import { notificationService } from "./notificationService";
import { passwordService } from "./passwordService";

class UserService {
    async getAll(): Promise<IUser[]> {
        return await userRepository.getAllUsers();
    }
    async getById(id: string): Promise<IUser> {
        const user = await userRepository.getById(id);
        if (!user) {
            throw new apiError(
                "Invalid id or user not found",
                StatusCodes.BAD_REQUEST,
            );
        }
        return user;
    }

    public async isEmailUniq(email: string): Promise<void> {
        const user = await userRepository.getByEmail(email);
        if (user) {
            throw new apiError(
                "User is already exists",
                StatusCodes.BAD_REQUEST,
            );
        }
    }
    public async createWithRole(
        dto: IUserCreateDto,
        role: RolesEnum,
    ): Promise<IUser> {
        await this.isEmailUniq(dto.email);
        const password = await passwordService.hashPassword(dto.password);
        return await userRepository.create({ ...dto, password, role });
    }
    public async createManager(dto: IUserCreateDto): Promise<IUser> {
        return await this.createWithRole(dto, RolesEnum.MANAGER);
    }
    public async changeStatus(id: string, isActive: boolean): Promise<IUser> {
        const user = await userRepository.changeStatus(id, isActive);
        if (!user) {
            throw new apiError("User not found", StatusCodes.NOT_FOUND);
        }
        if (isActive) {
            await notificationService.activateAccount(user);
        } else {
            await notificationService.blockedAccount(user);
        }
        return user;
    }
    public async changeToPremiumAccount(id: string): Promise<IUser | null> {
        const user = await userRepository.update(id, {
            accountType: AccountTypeEnum.PREMIUM,
        });
        if (!user) {
            throw new apiError("User not found", StatusCodes.NOT_FOUND);
        }
        await notificationService.premiumAccount(user);
        return user;
    }
}
export const userService = new UserService();

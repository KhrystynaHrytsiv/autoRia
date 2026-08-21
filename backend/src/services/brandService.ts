import { StatusCodes } from "../enums/statusCodes";
import { apiError } from "../error/apiError";
import { IBrand } from "../interfaces/ICar";
import { brandRepository } from "../repositories/brandRepository";

class BrandService {
    public getAll(): Promise<IBrand[]> {
        return brandRepository.getAll();
    }
    public async create(dto: { name: string }): Promise<IBrand> {
        const isBrandExist = await brandRepository.getByName(dto.name);
        if (isBrandExist) {
            throw new apiError("Brand already exists", StatusCodes.BAD_REQUEST);
        }
        const brand = await brandRepository.create(dto);
        if (!brand) {
            throw new apiError("Brand not found ", StatusCodes.NOT_FOUND);
        }
        return brand;
    }
    public async getIdByName(name: string): Promise<string> {
        const brand = await brandRepository.getByName(name);
        if (!brand) {
            throw new apiError("Brand not found ", StatusCodes.NOT_FOUND);
        }
        return brand.id;
    }

    public async delete(id: string): Promise<void> {
        const brand = await brandRepository.getById(id);
        if (!brand) {
            throw new apiError("Brand not found", StatusCodes.NOT_FOUND);
        }
        await brandRepository.delete(id);
    }
}
export const brandService = new BrandService();

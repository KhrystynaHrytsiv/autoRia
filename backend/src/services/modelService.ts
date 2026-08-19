import { StatusCodes } from "../enums/statusCodes";
import { apiError } from "../error/apiError";
import { CreateModelDto, IModel } from "../interfaces/ICar";
import { brandRepository } from "../repositories/brandRepository";
import { modelRepository } from "../repositories/modelRepository";

class ModelService {
    public getAll(brandId: string): Promise<IModel[]> {
        return modelRepository.getAll(brandId);
    }
    public async create(brandId: string, dto: CreateModelDto): Promise<IModel> {
        const brand = await brandRepository.getById(brandId);
        if (!brand) {
            throw new apiError("Brand not found", StatusCodes.NOT_FOUND);
        }
        const isModelExist = await modelRepository.getByName(dto.name);
        if (isModelExist) {
            throw new apiError("Model already exist", StatusCodes.BAD_REQUEST);
        }
        return await modelRepository.create(brandId, { name: dto.name });
    }
    public async getByName(name: string) {
        const model = await modelRepository.getByName(name);
        if (!model) {
            throw new apiError("Model not found", StatusCodes.NOT_FOUND);
        }
        return model;
    }

    public async delete(id: string): Promise<void> {
        const model = await modelRepository.getById(id);
        if (!model) {
            throw new apiError("Model not found", StatusCodes.NOT_FOUND);
        }
        await modelRepository.delete(id);
    }
}
export const modelService = new ModelService();

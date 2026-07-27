import {brandRepository} from "../repositories/brandRepository";
import {apiError} from "../error/apiError";
import {StatusCodes} from "../enums/statusCodes";
import {requestRepository} from "../repositories/requestRepository";
import {modelRepository} from "../repositories/modelRepository";
import {createBrandReq, createModelReq} from "../interfaces/IBrandRequest";

class RequestService {
    public async createBrandRequest(userId: string, dto:createBrandReq) {
        const isExist = await brandRepository.getByName(dto.name);
        if (isExist) {
            throw new apiError("Brand already exists", StatusCodes.BAD_REQUEST)
        }
        return requestRepository.createBrandRequest(userId, dto)
    }

    public async createModelRequest(userId: string, dto:createModelReq) {
        const isExist = await modelRepository.getByName(dto.name);
        if (isExist) {
            throw new apiError("Model already exists", StatusCodes.BAD_REQUEST)
        }
        return requestRepository.createModelRequest(userId, dto)
    }
}

export const requestService = new RequestService();
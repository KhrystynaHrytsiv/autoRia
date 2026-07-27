import {BrandRequest} from "../models/reqBrandModel";
import type {createBrandReq, createModelReq, IBrandRequest, IModelRequest} from "../interfaces/IBrandRequest";
import {ModelRequest} from "../models/modelRequestModel";

class RequestRepository {
    public createBrandRequest(userId: string, dto: createBrandReq): Promise<IBrandRequest> {
        return BrandRequest.create({userId, ...dto})
    }

    public createModelRequest(userId: string, dto: createModelReq): Promise<IModelRequest> {
        return ModelRequest.create({userId, ...dto})
    }
}

export const requestRepository = new RequestRepository();

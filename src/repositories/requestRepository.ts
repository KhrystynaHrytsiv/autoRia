import {BrandRequest} from "../models/brandRequestModel";
import type {createBrandReq, createModelReq, IBrandRequest, IModelRequest} from "../interfaces/IBrandRequest";
import {ModelRequest} from "../models/modelRequestModel";

class RequestRepository {
    public createBrandRequest(userId: string, dto: createBrandReq): Promise<IBrandRequest> {
        return BrandRequest.create({userId, ...dto})
    }

    public createModelRequest(userId: string, dto: createModelReq): Promise<IModelRequest> {
        return ModelRequest.create({userId, ...dto})
    }
    public getAllBrandRequest ():Promise<IBrandRequest[]>{
        return BrandRequest.find()
    }
    public getBrandRequestById (id:string):Promise<IBrandRequest | null>{
        return BrandRequest.findById(id)
    }
    public getModelRequest ():Promise<IModelRequest[]>{
        return ModelRequest.find()
    }
    public getModelRequestById(id:string):Promise<IModelRequest | null>{
        return ModelRequest.findById(id)
    }

    public updateBrandRequest (id:string, dto:Partial<IBrandRequest>):Promise<IBrandRequest | null>{
        return BrandRequest.findByIdAndUpdate(id, dto, {returnDocument: "after"})
    }
    public updateModelRequest (id:string, dto:Partial<IModelRequest>):Promise<IModelRequest | null>{
        return ModelRequest.findByIdAndUpdate(id, dto, {returnDocument: "after"})
    }
}

export const requestRepository = new RequestRepository();

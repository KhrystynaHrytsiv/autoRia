import {brandRepository} from "../car/brandRepository";
import {apiError} from "../../common/error/apiError";
import {StatusCodes} from "../../common/enums/statusCodes";
import {requestRepository} from "./requestRepository";
import {modelRepository} from "../car/modelRepository";
import {createBrandReq, createModelReq, IBrandRequest, IModelRequest} from "./ICarRequest";
import {RequestStatus} from "../../common/enums/requestStatus";
import {IModel} from "../car/ICar";
import {notificationService} from "../../services/notificationService";

class RequestService {
    public async createBrandRequest(userId: string, dto:createBrandReq) {
        const isExist = await brandRepository.getByName(dto.name);
        if (isExist) {
            throw new apiError("Brand already exists", StatusCodes.BAD_REQUEST)
        }
        const request = await requestRepository.createBrandRequest(userId, dto);
        await notificationService.sendCreateRequest(userId, request)
        return request;
    }

    public async createModelRequest(userId: string, dto:createModelReq): Promise<IModelRequest> {
        const isExist = await modelRepository.getByName(dto.name);
        if (isExist) {
            throw new apiError("Model already exists", StatusCodes.BAD_REQUEST)
        }
        const request = await requestRepository.createModelRequest(userId,  {brand: dto.brand, name: dto.name});
        await notificationService.sendCreateRequest(userId, request);
        return request
    }

    public async getAllBrandRequests ():Promise<IBrandRequest[]>{
        return await requestRepository.getAllBrandRequest()
    }
    public async getAllModelRequests ():Promise<IModelRequest[]>{
        return await requestRepository.getModelRequest()
    }

    private async getBrandRequest(id: string): Promise<IBrandRequest> {
        const request = await requestRepository.getBrandRequestById(id);
        if (!request) {
            throw new apiError("Request not found", StatusCodes.NOT_FOUND);
        }
        if (request.status !== RequestStatus.pending) {
            throw new apiError("Request already processed", StatusCodes.BAD_REQUEST);
        }
        return request;
    }

    private async getModelRequest(id: string): Promise<IModelRequest> {
        const request = await requestRepository.getModelRequestById(id);
        if (!request) {
            throw new apiError("Request not found", StatusCodes.NOT_FOUND);
        }
        if (request.status !== RequestStatus.pending) {
            throw new apiError("Request already processed", StatusCodes.BAD_REQUEST);
        }
        return request;
    }

    private async updateBrandStatus(id: string, status: RequestStatus): Promise<IBrandRequest> {
        const request = await requestRepository.updateBrandRequest(id, { status });
        if (!request) {
            throw new apiError("Brand request invalid", StatusCodes.BAD_REQUEST);
        }
        await notificationService.sendStatusRequest(request);
        return request;
    }
    private async updateModelStatus(id:string, status: RequestStatus):Promise<IModelRequest>{
        const request = await requestRepository.updateModelRequest(id, {status});
        if(!request){
            throw new apiError("Model request invalid", StatusCodes.BAD_REQUEST)
        }
        await notificationService.sendStatusRequest(request)
        return request;
    }

     public async approveBrandRequest (id:string){
        const request = await this.getBrandRequest(id);
        const brand = await brandRepository.create({name: request.name});
        await this.updateBrandStatus(id, RequestStatus.approved)
        return brand
     }

     public async approveModelRequest (id:string):Promise<IModel>{
        const request = await this.getModelRequest(id);
         const brand = await brandRepository.getByName(request.brand);
         if(!brand) {
             throw new apiError("Brand not found", StatusCodes.NOT_FOUND);
         }
        const model = await modelRepository.create({name: request.name,   brandId:brand.id.toString()});
        await this.updateModelStatus(id, RequestStatus.approved)
        return model
     }

     public async rejectBrandRequest (id:string):Promise<IBrandRequest>{
        await this.getBrandRequest(id);
        return this.updateBrandStatus(id, RequestStatus.rejected );

     }

     public async rejectModelRequest (id:string):Promise<IModelRequest>{
        await this.getModelRequest(id);
        return this.updateModelStatus(id, RequestStatus.rejected)
     }
}

export const requestService = new RequestService();
import {brandRepository} from "../repositories/brandRepository";
import {apiError} from "../error/apiError";
import {StatusCodes} from "../enums/statusCodes";
import {requestRepository} from "../repositories/requestRepository";
import {modelRepository} from "../repositories/modelRepository";
import {createBrandReq, createModelReq, IBrandRequest, IModelRequest} from "../interfaces/IBrandRequest";
import {RequestStatus} from "../enums/requestStatus";
import {IModel} from "../interfaces/IBrand";

class RequestService {
    public async createBrandRequest(userId: string, dto:createBrandReq) {
        const isExist = await brandRepository.getByName(dto.name);
        if (isExist) {
            throw new apiError("Brand already exists", StatusCodes.BAD_REQUEST)
        }
        return requestRepository.createBrandRequest(userId, dto)
    }

    public async createModelRequest(userId: string, dto:createModelReq): Promise<IModelRequest> {
        const brand = await brandRepository.getByName(dto.brand);
        if (!brand) {
            throw new apiError("Brand not found from create request", StatusCodes.NOT_FOUND);
        }
        const isExist = await modelRepository.getByName(dto.name, brand.id.toString());
        if (isExist) {
            throw new apiError("Model already exists", StatusCodes.BAD_REQUEST)
        }
        return requestRepository.createModelRequest(userId,  {brand: brand.id.toString(), name: dto.name})
    }

    public async getAllBrandRequests ():Promise<IBrandRequest[]>{
        return await requestRepository.getAllBrandRequest()
    }
    public async getAllModelRequests ():Promise<IModelRequest[]>{
        return await requestRepository.getModelRequest()
    }
     public async approveBrandRequest (id:string){
        const request = await requestRepository.getBrandRequestById(id);
        if(!request){
            throw new apiError("Request not found", StatusCodes.NOT_FOUND)
        }
        if( request.status !== RequestStatus.pending){
            throw new apiError("Request already processed", StatusCodes.BAD_REQUEST)
        }
        const brand = await brandRepository.create({name: request.name});
        await requestRepository.updateBrandRequest(id, {status: RequestStatus.approved});
        return brand
     }

     public async approveModelRequest (id:string):Promise<IModel>{
        const request = await requestRepository.getModelRequestById(id);
        if (!request){
            throw new apiError("Request not found", StatusCodes.NOT_FOUND)
        }
        if(request.status !== RequestStatus.pending){
            throw new apiError("Request already processed", StatusCodes.BAD_REQUEST)
        }
        const model = await modelRepository.create({name: request.name,  brandId: request.brandId});
        await requestRepository.updateModelRequest(id, {status:RequestStatus.approved});
        return model
     }
}

export const requestService = new RequestService();
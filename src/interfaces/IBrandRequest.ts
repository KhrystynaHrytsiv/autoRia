import {RequestStatus} from "../enums/requestStatus";

export interface IBrandRequest {
    id:string,
    userId:string,
    name:string,
    status:RequestStatus
}

export interface IModelRequest {
    id:string,
    userId:string,
    brandId:string,
    name:string,
    status:RequestStatus
}
export type createBrandReq = Pick<IBrandRequest, "name">
export type createModelReq = Pick<IModelRequest, "name"| "brandId">
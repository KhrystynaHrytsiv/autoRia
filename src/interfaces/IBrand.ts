interface IBrand {
    id:string,
    name: string
}

interface IModel{
    id:string,
    name:string,
    brandId:string
}
type CreateModelDto = {
    name:string,
    brand:string
}
type CreateModelDbDto = Pick<IModel, "name" | "brandId">
export type {IBrand, IModel, CreateModelDto, CreateModelDbDto}
interface IBrand {
    id:string,
    name: string
}

interface IModel{
    id:string,
    name:string,
    brandId:string
}

type CreateModelDto = Pick<IModel, "name">
export type {IBrand, IModel, CreateModelDto}
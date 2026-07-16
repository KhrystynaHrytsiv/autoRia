interface IBrand {
    id:string,
    name: string
}

interface IModel{
    id:string,
    name:string,
    brandId:string
}

export {IBrand, IModel}
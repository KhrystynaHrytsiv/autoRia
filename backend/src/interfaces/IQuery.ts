export interface IQuery {
    page: number;
    pageSize: number;
    order?: string;
}

export interface IAdvertQuery extends IQuery {
    brand?: string;
    model?: string;
    year?: string;
    price?: number;
}

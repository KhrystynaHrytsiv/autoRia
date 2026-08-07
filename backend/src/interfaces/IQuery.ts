export interface IAdvertQuery {
    page: number;
    pageSize: number;
    order?: string;
    brand?: string;
    model?: string;
    year?: string;
    price?: number;
}

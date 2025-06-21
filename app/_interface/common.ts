export interface ListData<T> {
    contents: T[];
    first: boolean;
    last: boolean;
    pageNumber: number;
    size: number;
    totalElements: number;
    totalPages: number;
}
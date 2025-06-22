// 페이지네이션 구현을 위한 페이지 인터페이스
export interface ListData<T> {
    contents: T[];
    first: boolean;
    last: boolean;
    pageNumber: number;
    size: number;
    totalElements: number;
    totalPages: number;
}
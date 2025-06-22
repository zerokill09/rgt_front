// 책 데이터
export interface Book { 
    bookId: number;
    bookName: string;
    bookAuthor: string;
    bookPublisher: string;
    bookDescription: string;
    stockQuantity: number;
    creationDateTime: Date;
    updateDateTime: Date;
}

// 검색 쿼리용
export class SearchParam { 
    page?: number;
    bookName: string;
    bookAuthor: string;

    constructor() {
        this.page = 1;
        this.bookName = "";
        this.bookAuthor = "";
    }
}

//서버 사이드 컴포넌트에서 책 ID를 파라미터로 받기 위한 인터페이스
export interface BookParams {
    bookId: string;
}

export interface BookPageProps {
    params: BookParams;
}
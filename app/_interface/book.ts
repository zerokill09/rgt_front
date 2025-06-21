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

export interface BookParams {
    bookId: string;
}

export interface BookPageProps {
    params: BookParams;
}
import { useAxios } from "../_hook/useAxios";
import { ApiError } from "next/dist/server/api-utils";
import { ListData } from "../_interface/common";
import { Book, SearchParam } from "../_interface/book";
import qs from "qs";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

// 책 목록 조회(검색)
export const useBookListQuery = ({
    page,
    bookName,
    bookAuthor
}: SearchParam) => {
    const axios = useAxios();
    return useQuery<ListData<Book>, ApiError>({
        queryKey : ["bookList", { page, bookName, bookAuthor }],
        queryFn : async () => {
            const query = qs.stringify({
                page, bookName, bookAuthor
            });

            const res = await axios.request<ListData<Book>>({
                url: `/api/books?${query}`,
                method: "GET"
            });

            return res.data;
        }
    })
}

// 책 상세 조회
export const useBookDetailQuery = (bookId: string) => {
    const axios = useAxios();
    return useQuery<Book, ApiError>({
        queryKey: ["bookDetail", bookId],
        queryFn: async () => {
            const res = await axios.request<Book>({
                url: `/api/books/${bookId}`,
                method: "GET"
            });
            return res. data;
        },
        enabled: !!bookId
    })
}

// 책 추가/수정
export const useBookWriteMutation = () => {
    const axios = useAxios();
    return useMutation<Book, ApiError, {bookId?: string, bookData: Partial<Book> }>({
        mutationFn :async(params) => {
        const { bookId, bookData } = params;

        /**
         * bookId 가 없으면 추가, 있으면 수정
         */
        const url = bookId != undefined ? `/api/books/${bookId}` : `/api/books`; 
        const method = bookId != undefined ? "PUT" : "POST";

        const res = await axios.request({
            url, method, data : bookData
        });

        return res.data;        
    }})
}

// 책 삭제
export const useBookDeleteMutaion = () => {
  const axios = useAxios();
  return useMutation<AxiosResponse<void>, ApiError, { bookId: string }>({
    mutationFn : async (params) => {
      const { bookId } = params;

      const res = await axios.request({
        url: `/api/books/${bookId}`,
        method: "DELETE",
      });

      return res;
    }});
};

// 서버사이드 컴포넌트에서 책 상세 정보 조회를 하기 위한 함수
export async function getBookForServer(bookId: string): Promise<Book | null> {
  try {
    const res = await axios.get<Book>(`${process.env.NEXT_PUBLIC_API_URL}/api/books/${bookId}`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw new Error(`[Server] 오류가 발생했습니다. ID: ${bookId}`);
  }
}
import { useAxios } from "../_hook/useAxios";
import { ApiError } from "next/dist/server/api-utils";
import { ListData } from "../_interface/common";
import { Book, SearchParam } from "../_interface/book";
import qs from "qs";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { API_HOST_URL } from "../_constants/apiHost";

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
                url: `/books?${query}`,
                method: "GET"
            });

            return res.data;
        }
    })
}

export const useBookDetailQuery = (bookId: string) => {
    const axios = useAxios();
    return useQuery<Book, ApiError>({
        queryKey: ["bookDetail", bookId],
        queryFn: async () => {
            const res = await axios.request<Book>({
                url: `/books/${bookId}`,
                method: "GET"
            });
            return res. data;
        },
        enabled: !!bookId
    })
}

export const useBookWriteMutation = () => {
    const axios = useAxios();
    return useMutation<Book, ApiError, {bookId?: string, bookData: Partial<Book> }>({
        mutationFn :async(params) => {
        const { bookId, bookData } = params;
        const url = bookId != undefined ? `/books/${bookId}` : `/books`;
        const method = bookId != undefined ? "PUT" : "POST";

        const res = await axios.request({
            url, method, data : bookData
        });

        return res.data;        
    }})
}

export const useBookDeleteMutaion = () => {
  const axios = useAxios();
  return useMutation<AxiosResponse<void>, ApiError, { bookId: string }>({
    mutationFn : async (params) => {
      const { bookId } = params;

      const res = await axios.request({
        url: `/books/${bookId}`,
        method: "DELETE",
      });

      return res;
    }});
};

export async function getBookForServer(bookId: string): Promise<Book | null> {
  try {
    const res = await axios.get<Book>(`${API_HOST_URL}/books/${bookId}`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw new Error(`[Server] Error getting book details for ID: ${bookId}`);
  }
}
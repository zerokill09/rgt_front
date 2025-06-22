import BookFormClient from "@/app/_component/BookFormClient";
import { getBookForServer } from "@/app/_query/book";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";

type PageParams = Promise<{ bookId: string }>;

/**
 * 책 수정 페이지 컴포넌트
 */
export default async function EditBook({ params }: { params: PageParams }) {
  const { bookId } = await params;

  const queryClient = new QueryClient();

  const initialBookData = await getBookForServer(bookId); // 서버 사이드에서 책 상세 정보 API 요청
  if (!initialBookData) {
    notFound();
  }

  await queryClient.prefetchQuery({
    queryKey: ["bookDetail", bookId],
    queryFn: () => Promise.resolve(initialBookData),
  }); // 받은 데이터를 react query에 주입

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BookFormClient bookId={bookId} bookData={initialBookData} />
    </HydrationBoundary>
  );
}

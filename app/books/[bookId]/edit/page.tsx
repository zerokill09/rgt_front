import BookFormClient from "@/app/_component/BookFormClient";
import { getBookForServer } from "@/app/_query/book";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";

type PageParams = Promise<{ bookId: string }>;

export default async function EditBook({ params }: { params: PageParams }) {
  const { bookId } = await params;

  const queryClient = new QueryClient();

  const initialBookData = await getBookForServer(bookId);
  if (!initialBookData) {
    notFound();
  }

  await queryClient.prefetchQuery({
    queryKey: ["bookDetail", bookId],
    queryFn: () => Promise.resolve(initialBookData),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* bookId를 전달하지 않아 추가 모드로 작동 */}
      <BookFormClient bookId={bookId} bookData={initialBookData} />
    </HydrationBoundary>
  );
}

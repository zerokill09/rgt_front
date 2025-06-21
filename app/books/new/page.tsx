import BookFormClient from "@/app/_component/BookFormClient";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default function NewBook() {
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* bookId를 전달하지 않아 추가 모드로 작동 */}
      <BookFormClient />
    </HydrationBoundary>
  );
}

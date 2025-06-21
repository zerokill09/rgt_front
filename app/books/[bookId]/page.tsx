import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";
import React from "react";
import BookDetailClient from "../../_component/BookDetailClient";
import { getBookForServer } from "@/app/_query/book";

type PageParams = Promise<{ bookId: string }>;

export default async function BookDetail({ params }: { params: PageParams }) {
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
      <BookDetailClient bookId={bookId} />
    </HydrationBoundary>
  );
}

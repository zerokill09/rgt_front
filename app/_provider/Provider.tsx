"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

type Props = {
  children: React.ReactNode;
};

/**
 * react query 적용을 위한 Prodvider
 */
function Providers({ children }: Props) {
  const [client] = React.useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
        },
      },
    })
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

export default Providers;

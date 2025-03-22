import { PropsWithChildren, useState } from "react";

import { QueryClientProvider } from "@tanstack/react-query";

import CustomQueryClient from "./query-client";

const QueryProvider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(CustomQueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;

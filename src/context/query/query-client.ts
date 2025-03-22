import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const CustomQueryClient = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
    queryCache: new QueryCache({
      onError: (error) => {
        toast.error(error?.message ?? "오류가 발생했습니다.");
        console.log(error);
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        toast.error(error?.message ?? "오류가 발생했습니다.");
        console.log(error);
      },
    }),
  });

  return queryClient;
};

export default CustomQueryClient;

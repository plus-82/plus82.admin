import { queryOptions } from "@tanstack/react-query";

import { boardApi } from "./request";

export const boardQueries = {
  all: ["board"],
  list: () =>
    queryOptions({
      queryKey: [...boardQueries.all, "list"],
      queryFn: () => boardApi.getList(),
    }),
  details: (id: number) => [...boardQueries.all, "detail", id],
  detail: (id: number) =>
    queryOptions({
      queryKey: [...boardQueries.details(id), id],
      queryFn: () => {
        return boardApi.getPost(id)
      },
    }),
};

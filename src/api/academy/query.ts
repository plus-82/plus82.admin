import { queryOptions } from "@tanstack/react-query";

import { academyApi } from "./request";

export const academyQueries = {
  all: ["academy"],
  list: () =>
    queryOptions({
      queryKey: [...academyQueries.all, "list"],
      queryFn: () => academyApi.getList(),
    }),
//   details: (id: number) => [...academyQueries.all, "detail", id],
//   detail: (id: number) =>
//     queryOptions({
//       queryKey: [...academyQueries.details(id), id],
//       queryFn: () => {
//         console.log(id)
//         return academyQueries.getPost(id)
//       },
//     }),
};

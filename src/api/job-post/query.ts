import { queryOptions } from "@tanstack/react-query";

import { jobPostApi } from "./request";

export const jobPostQueries = {
  all: ["jobPost"],
  list: (page: number, size: number) =>
    queryOptions({
      queryKey: [...jobPostQueries.all, "list", page, size],
      queryFn: () => jobPostApi.getList(page, size), // page와 size를 전달
    }),
//   details: (id: number) => [...jobPostQueries.all, "detail", id],
//   detail: (id: number) =>
//     queryOptions({
//       queryKey: [...jobPostQueries.details(id), id],
//       queryFn: () => {
//         console.log(id)
//         return jobPostQueries.get(id)
//       },
//     }),
};

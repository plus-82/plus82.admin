import { teacherApi } from './request'

export const teacherQueries = {
  // 이력서 목록 조회
  list: (page: number, size: number) => ({
    queryKey: ['teacherResumeList', page, size],
    queryFn: () => teacherApi.getResumeList(page, size),
  }),
}

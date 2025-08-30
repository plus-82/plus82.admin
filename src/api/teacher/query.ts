import { teacherApi } from './request'

export const teacherQueries = {
  // 이력서 목록 조회
  list: (page: number, size: number) => ({
    queryKey: ['teacherResumeList', page, size],
    queryFn: () => teacherApi.getResumeList(page, size),
  }),

  // 이력서 상세 조회
  detail: (resumeId: number) => ({
    queryKey: ['teacherResumeDetail', resumeId],
    queryFn: () => teacherApi.getResumeDetail(resumeId),
  }),
}

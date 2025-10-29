import { teacherApi } from './request'

export const teacherQueries = {
  // 이력서 목록 조회
  list: (
    page: number,
    size: number,
    filters?: {
      genderType?: 'MALE' | 'FEMALE'
      countryIdList?: number
      fromBirthDate?: string
      toBirthDate?: string
      hasVisa?: boolean
      visaTypeList?: 'E7' | 'E2' | 'OTHERS'
    },
  ) => ({
    queryKey: ['teacherResumeList', page, size, filters],
    queryFn: () => teacherApi.getResumeList(page, size, filters),
  }),

  // 이력서 상세 조회
  detail: (resumeId: number) => ({
    queryKey: ['teacherResumeDetail', resumeId],
    queryFn: () => teacherApi.getResumeDetail(resumeId),
  }),
}

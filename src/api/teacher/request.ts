import http from '../instance'

import type { TeacherResume } from '../../type/teacher'
import type { Resume } from '../../type/resume'

// API 엔드포인트
const TEACHER_API = {
  RESUME: '/resumes/representatives',
}

// 선생님 이력서 API 함수들
export const teacherApi = {
  // 이력서 목록 조회 (대표 이력서 등록한 선생님들의 이력서)
  getResumeList: async (
    page: number,
    size: number,
  ): Promise<{
    content: TeacherResume[]
    pageable: {
      pageNumber: number
      pageSize: number
      offset: number
      paged: boolean
      unpaged: boolean
    }
    totalElements: number
    totalPages: number
    first: boolean
    last: boolean
    numberOfElements: number
    empty: boolean
  }> => {
    return await http.getPaged<TeacherResume>({
      url: TEACHER_API.RESUME,
      data: { page, size },
      useAuth: true,
    })
  },

  // 이력서 상세 조회
  getResumeDetail: async (resumeId: number): Promise<Resume> => {
    return await http.get<Resume>({
      url: `${TEACHER_API.RESUME}/${resumeId}`,
      useAuth: true,
    })
  },
}

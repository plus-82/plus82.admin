import http from '../instance'

import type {
  ResumeList,
  JobPostRelationDetail,
  Resume,
  ResumeListItem,
} from '../../type/resume'

// API 엔드포인트
const RESUME_API = {
  BASE: '/job-post-resume-relations',
  RESUME: '/resumes',
}

// API 함수들
export const resumeApi = {
  // 목록 조회
  getList: async (
    page: number,
    size: number,
    status?: string,
  ): Promise<ResumeList> => {
    return await http.getPaged<ResumeListItem>({
      url: RESUME_API.BASE,
      data: { page, size, status },
    })
  },

  getDetail: async (
    jobPostResumeRelationId: number,
  ): Promise<JobPostRelationDetail> => {
    return await http.get<JobPostRelationDetail>({
      url: `${RESUME_API.BASE}/${jobPostResumeRelationId}`,
      useAuth: true,
    })
  },

  updateStatus: async ({
    jobPostResumeRelationId,
    status,
  }: {
    jobPostResumeRelationId: number
    status: string
  }): Promise<void> => {
    return await http.put<void>({
      url: `${RESUME_API.BASE}/${jobPostResumeRelationId}/status`,
      data: { status },
      useAuth: true,
    })
  },

  updateMemo: async ({
    jobPostResumeRelationId,
    memo,
  }: {
    jobPostResumeRelationId: number
    memo: string
  }): Promise<void> => {
    return await http.put<void>({
      url: `${RESUME_API.BASE}/${jobPostResumeRelationId}/memo`,
      data: { memo },
      useAuth: true,
    })
  },

  getResume: async (resumeId: number): Promise<Resume> => {
    return await http.get<Resume>({
      url: `${RESUME_API.RESUME}/${resumeId}`,
      useAuth: true,
    })
  },
}

import http from '../instance'

import type {
  JobPostList,
  JobPostDetail,
  CreateJobPostInput,
  JobPostListItem,
} from '../../type/jobpost'

// API 엔드포인트
const JOB_POST_API = {
  BASE: '/job-posts',
}

// API 함수들
export const jobPostApi = {
  // 목록 조회
  getList: async (page: number, size: number): Promise<JobPostList> => {
    return await http.getPaged<JobPostListItem>({
      url: JOB_POST_API.BASE + '/by-admin',
      data: { page, size },
    })
  },

  // 상세 조회
  getDetail: async (jobPostId: number): Promise<JobPostDetail> => {
    return await http.get<JobPostDetail>({
      url: `${JOB_POST_API.BASE}/${jobPostId}`,
    })
  },

  // 생성
  createJobPost: async (data: CreateJobPostInput): Promise<void> => {
    try {
      return await http.post({
        url: JOB_POST_API.BASE + '/by-admin/academy/' + data.academyId,
        data,
      })
    } catch (error) {
      console.error('Error creating job post:', error)
      throw new Error('Failed to create job post')
    }
  },

  // 수정
  updateJobPost: async (
    jobPostId: number,
    data: CreateJobPostInput,
  ): Promise<void> => {
    try {
      return await http.put({
        url: `${JOB_POST_API.BASE}/${jobPostId}/by-admin/academy/${data.academyId}`,
        data,
      })
    } catch (error) {
      console.error('Error updating job post:', error)
      throw new Error('Failed to update job post')
    }
  },
}

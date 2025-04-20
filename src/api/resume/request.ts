import http from "../instance";

import type { ResumeList } from "../../type/resume";

// API 엔드포인트
const RESUME_API = {
  BASE: "/job-post-resume-relations",
};

// API 함수들
export const resumeApi = {

  // 목록 조회
  getList: async (page: number, size: number, status?: string): Promise<ResumeList> => {
    return await http.getPaged<ResumeList>({
      url: RESUME_API.BASE,
      data: { page, size, status },
    });
  },

};
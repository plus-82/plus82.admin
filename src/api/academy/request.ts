import type { Academy } from "../../type/academy";
import http from "../instance";

// API 엔드포인트
const ACADEMY_API = {
  BASE: "/academies",
};

// API 함수들
export const academyApi = {

  // 로그인
  getList: async (): Promise<Academy[]> => {
    try {
      return await http.get<Academy[]>({
        url: ACADEMY_API.BASE,
      });
    } catch (error) {
      throw new Error("조회 실패");
    }
  }
}
import type { AcademyListItem } from "../../type/academy";
import http from "../instance";

// API 엔드포인트
const ACADEMY_API = {
  BASE: "/academies",
};

// API 함수들
export const academyApi = {

  // 로그인
  getList: async (): Promise<AcademyListItem[]> => {
    return await http.get<AcademyListItem[]>({
      url: ACADEMY_API.BASE,
    });
  }
}
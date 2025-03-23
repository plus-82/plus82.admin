import type { SignInRequest, SignInResponse } from "../../type/auth";
import http from "../instance";

// API 엔드포인트
const AUTH_API = {
  BASE: "/auth",
  SIGN_IN: "/sign-in",
};

// API 함수들
export const authApi = {

  // 로그인
  signIn: async (
    data: SignInRequest
  ): Promise<SignInResponse> => {
    try {
      const response = await http.post<SignInResponse>({
        // url: AUTH_API.BASE + AUTH_API.SIGN_IN,
        url: "http://localhost:8080/api/v1/auth/sign-in",  // 절대 경로 사용
        data,
      });
      return response;
    } catch (error) {
      // TODO : responseCode 분기
      throw new Error("로그인 실패");
    }
  }
}
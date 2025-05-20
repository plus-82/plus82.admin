import http from '../instance'

import type { SignInRequest, SignInResponse } from '../../type/auth'

// API 엔드포인트
const AUTH_API = {
  BASE: '/auth/admin/sign-in',
}

// API 함수들
export const authApi = {
  // 로그인
  signIn: async (data: SignInRequest): Promise<SignInResponse> => {
    try {
      const response = await http.post<SignInResponse>({
        url: AUTH_API.BASE,
        data,
        useAuth: false,
      })
      return response
    } catch (error) {
      console.log(error)
      // TODO : responseCode 분기
      throw new Error('로그인 실패')
    }
  },
}

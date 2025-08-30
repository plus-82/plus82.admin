import http from '../instance'

export interface Country {
  id: number
  countryNameEn: string
  countryNameLocal: string
  countryCode: string
  countryCallingCode: string
  flag: string
}

export const countryApi = {
  // 국가 목록 조회
  getList: async (): Promise<Country[]> => {
    try {
      const response = await http.get<Country[] | { data: Country[] }>({
        url: '/countries',
      })
      console.log('Countries API response:', response) // 디버깅용 로그

      // 응답 구조에 따라 데이터 추출
      if (Array.isArray(response)) {
        return response
      } else if (
        response &&
        typeof response === 'object' &&
        'data' in response
      ) {
        return response.data || []
      } else {
        console.warn('Unexpected countries API response structure:', response)
        return []
      }
    } catch (error) {
      console.error('Countries API error:', error) // 에러 로깅
      return []
    }
  },
}

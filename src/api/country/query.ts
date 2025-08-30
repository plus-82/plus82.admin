import { countryApi } from './request'

export const countryQueries = {
  // 국가 목록 조회
  list: () => ({
    queryKey: ['countries'],
    queryFn: () => countryApi.getList(),
  }),
}

/**
 * 숫자를 원화 표시와 천 단위 구분자로 포맷팅합니다.
 * @param amount - 포맷팅할 금액 (숫자)
 * @returns 포맷팅된 문자열 (예: "₩1,000,000")
 */
export const formatCurrency = (amount: number): string => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '₩0'
  }

  return `₩${amount.toLocaleString('ko-KR')}`
}

/**
 * 숫자를 천 단위 구분자로만 포맷팅합니다.
 * @param number - 포맷팅할 숫자
 * @returns 포맷팅된 문자열 (예: "1,000,000")
 */
export const formatNumber = (number: number): string => {
  if (typeof number !== 'number' || isNaN(number)) {
    return '0'
  }

  return number.toLocaleString('ko-KR')
}

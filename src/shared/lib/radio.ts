import { useCallback, useState } from 'react'

export type CheckedValue = string | number | undefined

export const useRadio = () => {
  const [checkedValue, setCheckedValue] = useState<CheckedValue>()

  const updateCheckedValue = useCallback((value: CheckedValue) => {
    setCheckedValue(value)
  }, [])

  const isChecked = (value: CheckedValue) => checkedValue === value

  return { checkedValue, isChecked, updateCheckedValue }
}

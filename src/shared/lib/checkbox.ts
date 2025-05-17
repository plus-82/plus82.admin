import { isEqual, isFunction } from 'lodash-es'
import { useEffect, useState } from 'react'

import { CheckboxValue } from '@/shared/component/checkbox'

import { List } from './list'

export type CheckboxChangeHandler = (
  callback?: (updatedCheckedValues: CheckboxValue[]) => void,
) => void

export type GetCheckboxPropsReturnType = {
  name?: string
  value: CheckboxValue
  checked: boolean
  onChange: CheckboxChangeHandler
}

export type GetIndeterminateCheckboxPropsReturnType = Omit<
  GetCheckboxPropsReturnType,
  'value'
> & {
  value?: CheckboxValue
  indeterminate: boolean | null
}

export type GetCheckboxProps =
  | GetCheckboxPropsReturnType
  | GetIndeterminateCheckboxPropsReturnType

export type UseCheckboxProps = {
  name?: string
  options: CheckboxValue[]
  defaultCheckedValues?: CheckboxValue[]
}

export const useCheckbox = ({
  name,
  options,
  defaultCheckedValues,
}: UseCheckboxProps) => {
  const [checkedValues, setCheckedValues] = useState<CheckboxValue[]>(
    defaultCheckedValues ?? [],
  )

  useEffect(() => {
    if (defaultCheckedValues && !isEqual(defaultCheckedValues, checkedValues)) {
      setCheckedValues(defaultCheckedValues)
    }
  }, [defaultCheckedValues])

  const isChecked = (value: CheckboxValue) => checkedValues.includes(value)

  const isAllChecked = () => List(checkedValues).equal(options)

  const isIndeterminate = () => {
    if (List(checkedValues).isEmpty()) return null

    return !isAllChecked()
  }

  const toggleChecked =
    (value: CheckboxValue) =>
    (prevCheckedValues = checkedValues) => {
      if (isChecked(value)) return List(prevCheckedValues).remove(value).get()

      return List(prevCheckedValues).add(value).get()
    }

  const toggleAllChecked = () => (isAllChecked() ? [] : options)

  const updateCheckedValue = (value: CheckboxValue) => {
    setCheckedValues(toggleChecked(value))
  }

  const resetCheckedValues = () => {
    setCheckedValues([])
  }

  const handleCheckboxChange =
    (value: CheckboxValue): CheckboxChangeHandler =>
    callback => {
      const updatedCheckedValues = toggleChecked(value)()
      setCheckedValues(updatedCheckedValues)

      if (isFunction(callback)) callback(updatedCheckedValues)
    }

  const handleIndeterminateCheckboxChange: CheckboxChangeHandler = callback => {
    const updatedCheckedValues = toggleAllChecked()
    setCheckedValues(updatedCheckedValues)
    callback?.(updatedCheckedValues)
  }

  const getCheckboxProps = (
    value: CheckboxValue,
  ): GetCheckboxPropsReturnType => ({
    name,
    value,
    checked: isChecked(value),
    onChange: handleCheckboxChange(value),
  })

  const getIndeterminateCheckboxProps = (
    value?: CheckboxValue,
  ): GetIndeterminateCheckboxPropsReturnType => ({
    name,
    value,
    checked: !List(checkedValues).isEmpty(),
    onChange: handleIndeterminateCheckboxChange,
    indeterminate: isIndeterminate(),
  })

  return {
    checkedValues,
    isChecked,
    isAllChecked,
    updateCheckedValue,
    resetCheckedValues,
    getCheckboxProps,
    getIndeterminateCheckboxProps,
  }
}

import { castArray, isEqual, isNull, isUndefined } from 'lodash-es'
import { useCallback, useEffect, useState } from 'react'

import { SelectRootProps, SelectValue } from '@/shared/component/select-field'

import { useClickAway } from './click-away'
import { useEscape } from './escape'
import { isEmptyString } from './helper'
import { List } from './list'

import type { KeyboardEvent, MouseEvent, RefObject } from 'react'

type Props = Required<
  Pick<
    SelectRootProps,
    'multiple' | 'selectionLimit' | 'disabled' | 'readOnly' | 'nullable'
  >
> &
  Pick<
    SelectRootProps,
    'value' | 'defaultValue' | 'onChange' | 'displayValue'
  > & {
    selectRef: RefObject<HTMLDivElement | null>
  }

export const useSelect = ({
  value: externalValue,
  defaultValue,
  disabled,
  readOnly,
  multiple,
  displayValue = (value: SelectValue) => value,
  nullable,
  onChange,
  selectionLimit,
  selectRef,
}: Props) => {
  const getDefaultSelectedValues = () => {
    if (defaultValue) return castArray(defaultValue)

    if (isEmptyString(externalValue) || isUndefined(externalValue)) return []
    if (!nullable && isNull(externalValue)) return []

    return castArray(externalValue)
  }

  const [selectedValues, setSelectedValues] = useState<SelectValue[]>(
    getDefaultSelectedValues(),
  )

  const selectedValuesForDisplay = selectedValues.map(value =>
    displayValue(value),
  )

  const selectedValuesAsString = selectedValuesForDisplay.join(', ')

  useEffect(() => {
    if (isUndefined(externalValue)) return

    const externalValues =
      isEmptyString(externalValue) || (!nullable && isNull(externalValue))
        ? []
        : castArray(externalValue)

    if (!isEqual(externalValues, selectedValues)) {
      setSelectedValues(externalValues)
    }
  }, [externalValue, nullable, selectedValues])

  /* isFocused
      true : 사용자가 직접적으로 Select 필드를 활성화 & 드롭다운이 열리는 경우 (마우스 클릭, 엔터 등) / multiple & 선택 제한 개수를 다 채운 뒤 드롭다운이 강제로 닫히는 경우
      false : 필드 외부를 클릭해 포커스가 벗어나는 경우
  */
  // &:focus : Tab 키를 사용하는 경우와 같이 해당 필드로 focus가 이동하는 경우
  const [isFocused, setIsFocused] = useState(false)

  const focus = useCallback(() => setIsFocused(true), [])
  const removeFocus = useCallback(() => setIsFocused(false), [])

  const [isOpen, setIsOpen] = useClickAway({
    ref: selectRef,
    callback: removeFocus,
  })

  const open = useCallback(() => setIsOpen(true), [setIsOpen])
  const close = useCallback(() => {
    setIsOpen(false)
    removeFocus()
  }, [setIsOpen, removeFocus])

  const handleEscapeKeyDown = useCallback(() => {
    close()
    removeFocus()
  }, [close, removeFocus])

  useEscape({ isOpen, onClose: handleEscapeKeyDown })

  const canEditSelectedValuesInMultiSelect = multiple && !(disabled || readOnly)

  const hasLimitExceeded = useCallback(
    (values: SelectValue[]) => values.length === selectionLimit,
    [selectionLimit],
  )

  const hasSelected = useCallback(
    (value: SelectValue) => selectedValues.includes(value),
    [selectedValues],
  )

  const hasSelectedInMultiSelect = useCallback(
    (value: SelectValue) => multiple && hasSelected(value),
    [hasSelected, multiple],
  )

  const isSelectedValuesEmpty = List(selectedValues).isEmpty()

  const isSelectable = (() => {
    let selectable = true

    if (multiple) selectable = !hasLimitExceeded(selectedValues)

    return selectable
  })()

  const updateSelectedValuesState = useCallback(
    (event: MouseEvent | null, updatedSelectedValues: SelectValue[]) => {
      setSelectedValues(updatedSelectedValues)
      onChange(event, updatedSelectedValues)
    },
    [onChange],
  )

  const updateSelectedValues = useCallback(
    (event: MouseEvent, itemValue: SelectValue) => {
      let updatedSelectedValues: SelectValue[]

      if (hasSelected(itemValue)) updatedSelectedValues = selectedValues
      else if (hasLimitExceeded(selectedValues))
        updatedSelectedValues = List(selectedValues)
          .reset()
          .add(itemValue)
          .get()
      else updatedSelectedValues = List(selectedValues).add(itemValue).get()

      updateSelectedValuesState(event, updatedSelectedValues)

      return updatedSelectedValues
    },
    [hasLimitExceeded, hasSelected, selectedValues, updateSelectedValuesState],
  )

  const updateIsOpen = () => {
    if (disabled) return

    focus()

    if (readOnly) return

    if (isOpen) close()
    else {
      if (multiple && !hasLimitExceeded(selectedValues)) open()
      if (!multiple) open()
    }
  }

  const handleTriggerClick = () => updateIsOpen()

  const handleTriggerKeyDown = (event: KeyboardEvent) => {
    if (!event.defaultPrevented) {
      if (event.key === 'Enter') {
        updateIsOpen()
      }
      if (event.key === 'Tab') {
        close()
      }
    }
  }

  const handleRemoveButtonClick = () => {
    updateSelectedValuesState(null, [])
  }

  const handleSelectedValueClickInRenderProp =
    (value: SelectValue) => (event: MouseEvent) => {
      event.stopPropagation()
      const updatedSelectedValues = List(selectedValues).remove(value).get()
      updateSelectedValuesState(null, updatedSelectedValues)
    }

  const contextValue = {
    close,
    hasSelected,
    hasSelectedInMultiSelect,
    hasLimitExceeded,
    updateSelectedValues,
  }

  return {
    isOpen,
    isFocused,
    isSelectedValuesEmpty,
    isSelectable,
    canEditSelectedValuesInMultiSelect,
    selectedValues,
    selectedValuesForDisplay,
    selectedValuesAsString,
    contextValue,
    handleTriggerClick,
    handleTriggerKeyDown,
    handleRemoveButtonClick,
    handleSelectedValueClickInRenderProp,
  }
}

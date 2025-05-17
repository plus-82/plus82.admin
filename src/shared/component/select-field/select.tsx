import { PropsWithChildren, useEffect, useRef } from 'react'

import { colors } from '@/shared/config'
import { ListValue } from '@/shared/lib/list'
import { useSelect } from '@/shared/lib/select'
import { cn } from '@/shared/lib/util'

import SelectProvider, { useSelectContext } from './context'
import { SelectVariants } from './variants'
import * as css from './variants'
import {
  Dropdown,
  DropdownItemProps,
  DropdownRootProps,
} from '../dropdown/dropdown'
import { Icon } from '../icon'

import type { MouseEvent, ReactNode, SelectHTMLAttributes } from 'react'

export type SelectValue = ListValue

export type SelectRootProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'onChange' | 'onBlur' | 'size'
> &
  SelectVariants &
  Pick<DropdownRootProps, 'displayLimit'> & {
    children?: ReactNode
    error?: boolean
    readOnly?: boolean
    placeholder?: string
    selectionLimit?: number
    displayValue?: (value: SelectValue) => SelectValue
    nullable?: boolean
    render?: (
      selected: SelectValue[],
      handleSelectedOptionClick: (
        value: SelectValue,
      ) => (event: MouseEvent) => void,
    ) => ReactNode
    onChange: (event: MouseEvent | null, updatedValues: SelectValue[]) => void
    onBlur?: () => void
  }

const DEFAULT_SELECTION_LIMIT_IN_SINGLE_SELECT = 1
const DEFAULT_SELECTION_LIMIT_IN_MULTI_SELECT = 3

const SelectRoot = ({
  name,
  size = 'large',
  multiple = false,
  selectionLimit: customSelectionLimit,
  displayLimit,
  displayValue,
  nullable = false,
  error = false,
  render,
  disabled = false,
  readOnly = false,
  placeholder: customPlaceholder,
  children,
  defaultValue,
  value,
  onChange = () => {},
  onBlur,
  className,
}: SelectRootProps) => {
  const selectRef = useRef<HTMLDivElement>(null)

  const selectionLimit = (() => {
    if (multiple)
      return customSelectionLimit || DEFAULT_SELECTION_LIMIT_IN_MULTI_SELECT

    return DEFAULT_SELECTION_LIMIT_IN_SINGLE_SELECT
  })()

  const {
    isOpen,
    isFocused,
    isSelectedValuesEmpty,
    isSelectable,
    canEditSelectedValuesInMultiSelect,
    selectedValuesForDisplay,
    selectedValuesAsString,
    contextValue,
    handleTriggerClick,
    handleTriggerKeyDown,
    handleRemoveButtonClick,
    handleSelectedValueClickInRenderProp,
  } = useSelect({
    value,
    defaultValue,
    disabled,
    readOnly,
    multiple,
    displayValue,
    nullable,
    onChange,
    selectionLimit,
    selectRef,
  })

  const dropdownId = `${name}-dropdown`

  const placeholder = (() => {
    if (readOnly) return '—'

    if (customPlaceholder) return customPlaceholder

    return null
  })()

  const isRemoveButtonVisible =
    canEditSelectedValuesInMultiSelect && !isSelectedValuesEmpty

  const showPlaceholder = placeholder && isSelectedValuesEmpty

  const renderValue = () => {
    if (render && !readOnly)
      return render(
        selectedValuesForDisplay,
        handleSelectedValueClickInRenderProp,
      )

    return selectedValuesAsString
  }

  return (
    <div
      className={cn(
        css.wrapper({
          disabled,
          className,
        }),
      )}
      ref={selectRef}
    >
      <div
        tabIndex={disabled ? -1 : 0}
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={dropdownId}
        aria-haspopup="listbox"
        className={cn(
          css.selected({
            size,
            error,
            disabled,
            readOnly,
            isFocused,
            isSelectable,
            isRemoveButtonVisible,
          }),
        )}
        onClick={handleTriggerClick}
        onKeyDown={handleTriggerKeyDown}
        onBlur={onBlur}
      >
        {!isSelectedValuesEmpty && renderValue()}
        {showPlaceholder && (
          <span className={cn(css.placeholder({ size, readOnly }))}>
            {placeholder}
          </span>
        )}
        {!readOnly && (
          <Icon
            name="ChevronDown"
            color={colors.gray['700']}
            className={cn(css.arrowIcon({ isOpen, size }))}
          />
        )}
      </div>
      {isRemoveButtonVisible && (
        <button
          type="button"
          onClick={handleRemoveButtonClick}
          aria-label="Remove all values"
          className={cn(css.removeButton())}
        >
          <Icon name="Close" color={colors.gray['700']} />
        </button>
      )}
      {isOpen && (
        <SelectProvider value={contextValue}>
          <Dropdown id={dropdownId} role="listbox" displayLimit={displayLimit}>
            {children}
          </Dropdown>
        </SelectProvider>
      )}
    </div>
  )
}

type SelectItemProps = Pick<DropdownItemProps, 'selected'> & {
  value: SelectValue
}

const SelectItem = ({
  value,
  children,
  ...restProps
}: PropsWithChildren<SelectItemProps>) => {
  const {
    close,
    hasSelected,
    hasSelectedInMultiSelect,
    hasLimitExceeded,
    updateSelectedValues,
  } = useSelectContext()

  const scrollRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'instant', block: 'center' })
    }
  }, [])

  if (hasSelectedInMultiSelect(value)) return null

  const handleDropdownItemClick = (event: MouseEvent) => {
    const updatedSelectedValues = updateSelectedValues(event, value)
    if (hasLimitExceeded(updatedSelectedValues)) close()
  }

  return (
    <Dropdown.Item
      ref={hasSelected(value) ? scrollRef : null}
      role="option"
      selected={hasSelected(value)}
      onClick={handleDropdownItemClick}
      {...restProps}
    >
      {children}
    </Dropdown.Item>
  )
}

export const Select = Object.assign(SelectRoot, {
  Item: SelectItem,
})

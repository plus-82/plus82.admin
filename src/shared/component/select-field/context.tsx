import { createContext, PropsWithChildren, useContext, useMemo } from 'react'

import type { SelectValue } from './select'
import type { MouseEvent } from 'react'

type SelectState = {
  close: () => void
  hasSelected: (value: SelectValue) => boolean
  hasSelectedInMultiSelect: (value: SelectValue) => boolean
  hasLimitExceeded: (values: SelectValue[]) => boolean
  updateSelectedValues: (event: MouseEvent, value: SelectValue) => SelectValue[]
}

const SelectContext = createContext<SelectState | null>(null)

export const useSelectContext = () => {
  const context = useContext(SelectContext)

  if (!context) {
    throw new Error('This component must be used within SelectField component')
  }

  return context
}

type SelectProviderProps = {
  value: SelectState
}

const SelectProvider = ({
  value,
  children,
}: PropsWithChildren<SelectProviderProps>) => {
  const {
    close,
    hasSelected,
    hasSelectedInMultiSelect,
    hasLimitExceeded,
    updateSelectedValues,
  } = value

  const contextValue = useMemo(
    () => ({
      close,
      hasSelected,
      hasSelectedInMultiSelect,
      hasLimitExceeded,
      updateSelectedValues,
    }),
    [
      close,
      hasLimitExceeded,
      hasSelected,
      hasSelectedInMultiSelect,
      updateSelectedValues,
    ],
  )

  return (
    <SelectContext.Provider value={contextValue}>
      {children}
    </SelectContext.Provider>
  )
}

export default SelectProvider

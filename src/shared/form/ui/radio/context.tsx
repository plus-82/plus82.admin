import { createContext, useContext } from 'react'

import type { FieldValues, Path, UseControllerReturn } from 'react-hook-form'

type RadioState<T extends FieldValues, U extends Path<T>> = {
  controller: UseControllerReturn<T, U>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const RadioContext = createContext<RadioState<any, any> | null>(null)

export const useRadioContext = <T extends FieldValues>() => {
  const context = useContext<RadioState<T, Path<T>> | null>(RadioContext)

  if (!context) {
    throw new Error(
      'useRadioContext should be used within RadioContext.Provider',
    )
  }

  return context
}

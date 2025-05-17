'use client'

import { createContext, useContext } from 'react'

export const ModalContext = createContext<{
  open?: boolean
  changeOpen?: (open: boolean) => void
} | null>(null)

export const useModalContext = () => {
  const context = useContext(ModalContext)

  if (!context) {
    throw new Error('useModalContext must be used within a Modal')
  }

  return context
}

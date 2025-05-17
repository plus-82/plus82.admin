'use client'

import { createContext, useContext } from 'react'

type ButtonState = {
  size: 'small' | 'medium' | 'large'
}

export const ButtonContext = createContext<ButtonState | null>(null)

export const useButtonContext = () => {
  const context = useContext(ButtonContext)

  if (!context) {
    throw new Error('ButtonContext is not found')
  }

  return context
}

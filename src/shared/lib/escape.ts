import { useEffect } from 'react'

import type { SyntheticEvent } from 'react'

type Props = {
  isOpen?: boolean
  onClose?: (event: SyntheticEvent | Event | null) => void
}

export const useEscape = ({ isOpen, onClose }: Props) => {
  useEffect(() => {
    if (!isOpen) return undefined

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!event.defaultPrevented) {
        if (event.key === 'Escape' || event.key === 'Esc') {
          onClose?.(event)
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])
}

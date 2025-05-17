import { useRef, useState } from 'react'

export const useFocus = <T extends HTMLElement>() => {
  const [focused, setFocused] = useState(false)

  const ref = useRef<T>(null)

  const handleElementClick = () => {
    if (ref.current) {
      ref.current.focus()
    }
  }

  const handleElementFocus = () => {
    setFocused(true)
  }

  const handleElementBlur = () => {
    setFocused(false)
  }

  return {
    focused,
    elementRef: ref,
    handleElementClick,
    handleElementFocus,
    handleElementBlur,
  }
}

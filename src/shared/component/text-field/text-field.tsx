import {
  forwardRef,
  InputHTMLAttributes,
  useImperativeHandle,
  MouseEvent,
  FocusEvent,
} from 'react'

import {
  textField,
  input,
  TextFieldVariants,
} from '@/shared/component/text-field/variants'
import { useFocus } from '@/shared/lib/focus'
import { createSlot } from '@/shared/lib/slot'
import { cn } from '@/shared/lib/util'

export type Props = InputHTMLAttributes<HTMLInputElement> &
  TextFieldVariants & {
    error?: boolean
  }

export const TextField = forwardRef<HTMLInputElement, Props>(
  (
    {
      type = 'text',
      className,
      fullWidth = false,
      error = false,
      readOnly = false,
      disabled = false,
      maxLength = 255,
      children,
      autoComplete = 'off',
      onClick,
      onFocus,
      onBlur,
      ...restProps
    },
    ref,
  ) => {
    const { slots, hasSlot } = createSlot(children, ['left', 'right'])

    const slotClass = (() => {
      if (hasSlot('left') && hasSlot('right')) {
        return 'both'
      }

      if (hasSlot('left')) {
        return 'left'
      }

      if (hasSlot('right')) {
        return 'right'
      }

      return null
    })()

    const {
      focused,
      elementRef,
      handleElementClick,
      handleElementFocus,
      handleElementBlur,
    } = useFocus<HTMLInputElement>()

    useImperativeHandle(ref, () => elementRef.current as HTMLInputElement)

    const handleClick = (event: MouseEvent<HTMLInputElement>) => {
      onClick?.(event)
      handleElementClick()
    }

    const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
      onFocus?.(event)
      handleElementFocus()
    }

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
      onBlur?.(event)
      handleElementBlur()
    }

    return (
      <div
        className={cn(
          textField({
            fullWidth,
            error,
            disabled,
            focused,
            className,
          }),
        )}
        onClick={handleClick}
      >
        {slots?.left && <div className="py-3 pl-2.5">{slots.left}</div>}
        <input
          {...restProps}
          type={type}
          className={cn(
            input({
              slots: slotClass,
            }),
          )}
          autoComplete={autoComplete}
          readOnly={readOnly}
          disabled={disabled}
          maxLength={maxLength}
          data-error={error}
          ref={elementRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {slots?.right && <div className="py-3 pr-2.5">{slots.right}</div>}
      </div>
    )
  },
)

TextField.displayName = 'TextField'

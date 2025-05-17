import { forwardRef, TextareaHTMLAttributes } from 'react'

import { cn } from '@/shared/lib/util'

import * as css from './variants'
import { type TextAreaVariants } from './variants'

export type Props = TextareaHTMLAttributes<HTMLTextAreaElement> &
  TextAreaVariants

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      placeholder,
      fullWidth = false,
      className,
      value,
      onChange,
      error,
      disabled,
      ...restProps
    },
    ref,
  ) => {
    return (
      <textarea
        ref={ref}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(css.textarea({ fullWidth, error, disabled }), className)}
        disabled={disabled}
        {...restProps}
      />
    )
  },
)
TextArea.displayName = 'TextArea'

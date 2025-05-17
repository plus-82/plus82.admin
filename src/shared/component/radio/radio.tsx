import { forwardRef } from 'react'

import { CheckedValue } from '@/shared/lib/radio'
import { cn } from '@/shared/lib/util'

import * as css from './variants'

import type { RadioVariants } from './variants'
import type { InputHTMLAttributes, KeyboardEvent } from 'react'

export type Props = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'defaultValue' | 'defaultChecked' | 'readOnly' | 'value'
> & {
  label?: string
  error?: boolean
  onChange?: () => void
  value: CheckedValue
} & RadioVariants

export const Radio = forwardRef<HTMLInputElement, Props>(
  (
    {
      name,
      label,
      value,
      checked = false,
      error = false,
      disabled = false,
      readOnly = false,
      onChange,
      ...restProps
    },
    ref,
  ) => {
    const labelId = `${name}-${label}`

    const handleLabelClick = () => {
      onChange?.()
    }

    const handleLabelKeyDown = (event: KeyboardEvent) => {
      if (!event.defaultPrevented) {
        if (readOnly) return

        if (event.key === 'Enter') {
          onChange?.()
        }
      }
    }

    return (
      <div
        className={cn(css.radioWrapper({ disabled, readOnly }))}
        role="radio"
        tabIndex={disabled ? -1 : 0}
        aria-checked={checked}
        aria-labelledby={labelId}
        onClick={handleLabelClick}
        onKeyDown={handleLabelKeyDown}
      >
        <input
          {...restProps}
          className={cn(css.radio({ error, disabled }))}
          id={`${name}-${value}`}
          name={name}
          type="radio"
          tabIndex={-1}
          onChange={onChange}
          disabled={disabled}
          checked={checked}
          data-readonly={readOnly}
          ref={ref}
        />
        {label && (
          <span id={labelId} className={cn(css.label())}>
            {label}
          </span>
        )}
      </div>
    )
  },
)

Radio.displayName = 'Radio'

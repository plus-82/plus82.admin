import { isString } from 'lodash-es'
import { forwardRef } from 'react'

import { colors } from '@/shared/config'
import { ListValue } from '@/shared/lib/list'
import { cn } from '@/shared/lib/util'

import * as css from './variants'
import { Icon } from '../icon'

import type { InputHTMLAttributes, KeyboardEvent, ReactNode } from 'react'

export type CheckboxValue = ListValue

export type Props = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value' | 'size'
> & {
  label?: string | ((className: string) => ReactNode)
  value?: CheckboxValue
  error?: boolean
  indeterminate?: boolean | null
  onChange?: () => void
}

export const Checkbox = forwardRef<HTMLInputElement, Props>(
  (
    {
      name,
      label,
      value,
      error = false,
      checked = false,
      readOnly = false,
      disabled = false,
      indeterminate,
      onChange = () => {},
      className,
      ...restProps
    },
    ref,
  ) => {
    const labelId = `${name}-label`

    const handleLabelClick = () => {
      if (disabled || readOnly) return
      onChange?.()
    }

    const handleLabelKeyDown = (event: KeyboardEvent) => {
      if (disabled || readOnly) return

      if (!event.defaultPrevented) {
        if (event.key === 'Enter') {
          onChange?.()
        }
      }
    }

    return (
      <div
        className={cn(css.checkboxWrapper({ readOnly, disabled, className }))}
        role="checkbox"
        tabIndex={0}
        aria-checked={checked}
        aria-labelledby={labelId}
        onClick={handleLabelClick}
        onKeyDown={handleLabelKeyDown}
      >
        <div className={cn(css.checkbox({ checked, error, disabled }))}>
          <input
            className={cn(css.input())}
            id={name}
            name={name}
            type="checkbox"
            tabIndex={-1}
            disabled={disabled}
            checked={checked}
            onChange={onChange}
            ref={ref}
            {...restProps}
          />
          {(checked || indeterminate) && (
            <Icon
              name={indeterminate ? 'CheckIndeterminate' : 'Check'}
              size="small"
              color={disabled && !error ? colors.gray['500'] : colors.white}
              className={cn(css.checkboxIcon())}
            />
          )}
        </div>
        {label && isString(label) && (
          <span className={cn(css.label())} id={labelId}>
            {label}
          </span>
        )}
        {label && !isString(label) && label(css.label())}
      </div>
    )
  },
)

Checkbox.displayName = 'Checkbox'

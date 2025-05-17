import { forwardRef, useState } from 'react'

import { colors } from '@/shared/config'
import { Slot } from '@/shared/lib/slot'

import { TextField, type Props as TextFieldProps } from './text-field'
import { Icon } from '../icon'

export interface Props extends TextFieldProps {
  showToggle?: boolean
}

export const PasswordField = forwardRef<HTMLInputElement, Props>(
  ({ showToggle, ...restProps }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
      setShowPassword(prev => !prev)
    }

    return (
      <TextField
        {...restProps}
        type={showPassword ? 'text' : 'password'}
        ref={ref}
      >
        {showToggle && (
          <Slot name="right">
            <button
              type="button"
              aria-label="Toggle password visibility"
              onClick={togglePasswordVisibility}
            >
              <Icon
                name={showPassword ? 'EyesOn' : 'EyesOff'}
                size="large"
                color={colors.gray['500']}
              />
            </button>
          </Slot>
        )}
      </TextField>
    )
  },
)

PasswordField.displayName = 'PasswordField'

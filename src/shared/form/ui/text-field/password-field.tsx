'use client'

import { isEmpty } from 'lodash-es'
import { get, useFormContext } from 'react-hook-form'

import { PasswordField, type PasswordFieldProps } from '@/shared/component/text-field'

import { commonRules, type CommonFieldProps } from '../../lib'

import type { ChangeEvent, FocusEvent } from 'react'
import type { FieldValues, Path } from 'react-hook-form'

type Props<T extends FieldValues> = CommonFieldProps<PasswordFieldProps, T> & {
  resetErrorOnBlur?: boolean
}

export const FormPasswordField = <T extends FieldValues>({
  name = '' as Path<T>,
  rules,
  resetErrorOnBlur = true,
  required,
  ...restProps
}: Props<T>) => {
  const {
    register,
    formState: { errors },
    clearErrors,
  } = useFormContext<T>()

  const { onChange, onBlur } = restProps
  const error = get(errors, name)

  const textFieldRegister = register(name, commonRules(rules, required))

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    textFieldRegister.onChange(event)
    onChange?.(event)
  }

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (resetErrorOnBlur && error) clearErrors(name)

    textFieldRegister.onBlur(event)
    onBlur?.(event)
  }

  return (
    <PasswordField
      {...restProps}
      {...textFieldRegister}
      error={!isEmpty(error)}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  )
}

'use client'

import { isEmpty } from 'lodash-es'
import { get, useFormContext } from 'react-hook-form'

import { TextField, type TextFieldProps } from '@/shared/component/text-field'

import { CommonFieldProps, commonRules } from '../../lib'

import type { ChangeEvent, FocusEvent } from 'react'
import type { FieldValues, Path } from 'react-hook-form'

type Props<T extends FieldValues> = CommonFieldProps<TextFieldProps, T> & {
  resetErrorOnBlur?: boolean
}

export const FormTextField = <T extends FieldValues>({
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
    <TextField
      {...restProps}
      {...textFieldRegister}
      error={!isEmpty(error)}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  )
}

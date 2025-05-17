'use client'

import { isEmpty } from 'lodash-es'
import { get, useFormContext } from 'react-hook-form'

import { TextArea, type TextAreaProps } from '@/shared/component/text-area'

import { CommonFieldProps, commonRules } from '../../lib'

import type { ChangeEvent, FocusEvent } from 'react'
import type { FieldValues, Path } from 'react-hook-form'

type Props<T extends FieldValues> = CommonFieldProps<TextAreaProps, T> & {
  resetErrorOnBlur?: boolean
}

export const FormTextArea = <T extends FieldValues>({
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

  const textAreaRegister = register(name, commonRules(rules, required))

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    textAreaRegister.onChange(event)
    onChange?.(event)
  }

  const handleBlur = (event: FocusEvent<HTMLTextAreaElement>) => {
    if (resetErrorOnBlur && error) clearErrors(name)

    textAreaRegister.onBlur(event)
    onBlur?.(event)
  }

  return (
    <TextArea
      {...restProps}
      {...textAreaRegister}
      error={!isEmpty(error)}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  )
}

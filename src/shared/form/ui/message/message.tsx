'use client'

import { get, useFormContext } from 'react-hook-form'

import { HelperText, type HelperTextProps } from '@/shared/component/helper-text'

type FormErrorMessageProps = HelperTextProps & {
  name?: string
}

export const FormErrorMessage = ({ name = '' }: FormErrorMessageProps) => {
  const {
    formState: { errors },
  } = useFormContext()

  const error = get(errors, name)

  if (!error) return null

  return <HelperText variant="error">{error.message}</HelperText>
}

'use client'

import { PropsWithChildren } from 'react'

import { passPropsToChildren } from '@/shared/lib/render'

import type { FieldValues, RegisterOptions } from 'react-hook-form'

type FormControlProps<T extends FieldValues> = {
  name: string
  required?: boolean
  disabled?: boolean
  readOnly?: boolean
  rules?: RegisterOptions<T>
  size?: 'small' | 'medium'
}

export const FormControl = <T extends FieldValues>({
  children,
  ...props
}: PropsWithChildren<FormControlProps<T>>) =>
  passPropsToChildren(children, props)

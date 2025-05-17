'use client'

import { isEmpty } from 'lodash-es'
import { PropsWithChildren, useMemo } from 'react'
import { useController, useFormContext } from 'react-hook-form'

import { Radio, type RadioProps } from '@/shared/component/radio'

import { RadioContext, useRadioContext } from './context'
import { commonRules, type CommonFieldProps } from '../../lib'

import type { FieldValues, Path } from 'react-hook-form'

type FormRadioGroupProps<T extends FieldValues> = CommonFieldProps<
  Pick<RadioProps, 'name' | 'required'>,
  T
> & { className?: string }

type FormRadioProps = Omit<RadioProps, 'checked' | 'error'>

const FormRadioGroup = <T extends FieldValues>({
  name = '' as Path<T>,
  rules,
  required,
  className,
  children,
}: PropsWithChildren<FormRadioGroupProps<T>>) => {
  const { control } = useFormContext<T>()

  const controller = useController<T, string & Path<T>>({
    name,
    control,
    rules: commonRules(rules, required),
  })

  const value = useMemo(() => ({ controller }), [controller])

  return (
    <RadioContext.Provider value={value}>
      <div className={className}>{children}</div>
    </RadioContext.Provider>
  )
}

const FormRadioItem = (props: FormRadioProps) => {
  const { label, value, onChange, ...restProps } = props

  const { controller } = useRadioContext()
  const {
    field,
    fieldState: { error },
  } = controller

  const handleChange = () => {
    if (field.value === value) return

    field.onChange(value)
    onChange?.()
  }

  return (
    <Radio
      {...restProps}
      {...field}
      label={label}
      value={value}
      onChange={handleChange}
      checked={field.value === value}
      error={!isEmpty(error)}
    />
  )
}

export const FormRadio = Object.assign(FormRadioItem, {
  Group: FormRadioGroup,
})

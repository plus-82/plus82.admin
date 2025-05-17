'use client'

import { isEmpty, isEqual } from 'lodash-es'
import { type MouseEvent } from 'react'
import { get, useController, useFormContext } from 'react-hook-form'

import { Select, SelectRootProps, SelectValue } from '@/shared/component/select-field'

import { commonRules, type CommonFieldProps } from '../../lib'

import type { FieldValues, Path } from 'react-hook-form'

export type Props = Omit<SelectRootProps, 'onChange'> & {
  onChange?: SelectRootProps['onChange']
  resetErrorOnBlur?: boolean
}

const FormSelectRoot = <T extends FieldValues>({
  name = '' as Path<T>,
  rules,
  resetErrorOnBlur = true,
  ...restProps
}: CommonFieldProps<Props, T>) => {
  const { control, clearErrors } = useFormContext<T>()

  const {
    field,
    formState: { errors },
  } = useController({
    name,
    control,
    rules: commonRules(rules, restProps.required),
  })

  const error = get(errors, name)

  const handleChange = (event: MouseEvent | null, values: SelectValue[]) => {
    const convertedValues = restProps.multiple ? values : values[0]
    if (isEqual(convertedValues, field.value)) return

    field.onChange(convertedValues)
    restProps.onChange?.(event, values)
  }

  const handleBlur = () => {
    if (resetErrorOnBlur && error) clearErrors(name)

    field.onBlur()
    restProps.onBlur?.()
  }

  return (
    <Select
      {...restProps}
      error={!isEmpty(error)}
      onChange={handleChange}
      onBlur={handleBlur}
      value={field.value}
    />
  )
}

export const FormSelect = Object.assign(FormSelectRoot, {
  Item: Select.Item,
})

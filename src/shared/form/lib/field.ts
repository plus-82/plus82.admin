import { FieldPath, FieldValues, RegisterOptions } from 'react-hook-form'

export type CommonFieldProps<T, U extends FieldValues> = {
  name?: FieldPath<U>
  rules?: RegisterOptions<U>
} & Omit<T, 'error'>

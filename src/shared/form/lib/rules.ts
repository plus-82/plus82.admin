import { FieldValues, RegisterOptions } from 'react-hook-form'

export const commonRules = <T extends FieldValues>(
  rules?: RegisterOptions<T>,
  required?: boolean,
) => ({
  ...(required && { required: true }),
  ...rules,
})

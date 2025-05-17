import { isObject } from 'lodash-es'
import { FieldError } from 'react-hook-form'

export const hasError = (error: FieldError | undefined) =>
  isObject(error) && ('type' in error || 'message' in error)

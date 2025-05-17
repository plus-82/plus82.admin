/* eslint-disable @typescript-eslint/no-explicit-any */
import { isNil } from 'lodash-es'

export const isEmptyString = (value: any): value is '' => value === ''

export const isNilOrEmptyString = (
  value: any,
): value is null | undefined | '' => isNil(value) || isEmptyString(value)

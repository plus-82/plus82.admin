import { xor } from 'lodash-es'

export type ListValue = string | number | null

export const List = (values: ListValue[]) => ({
  add: (newValue: ListValue) => List([...values, newValue] as ListValue[]),
  remove: (valueToBeRemoved: ListValue) =>
    List(values.filter(value => value !== valueToBeRemoved)),
  reset: () => List([] as ListValue[]),
  isEmpty: () => values.length === 0,
  equal: (valuesToBeCompared: ListValue[]) =>
    xor(values, valuesToBeCompared).length === 0,
  get: () => values,
})

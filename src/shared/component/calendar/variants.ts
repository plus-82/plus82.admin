import { cva } from 'class-variance-authority'

export const wrapper = cva('w-full')

export const calendar = cva(
  'w-[344px] rounded-xl border border-gray-300 bg-white p-5',
)

export const weekDay = cva('text-gray-700')

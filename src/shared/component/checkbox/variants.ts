import { cva } from 'class-variance-authority'

export const checkboxWrapper = cva(
  'flex w-fit cursor-pointer items-start gap-2 focus:outline-none',
  {
    variants: {
      readOnly: {
        true: 'pointer-events-none cursor-default',
        false: '',
      },
      disabled: {
        true: 'pointer-events-none cursor-default opacity-50',
        false: '',
      },
    },
  },
)

export const checkbox = cva(
  'relative h-6 w-6 shrink-0 rounded-[0.25rem] border-2 border-gray-500 bg-white transition-all',
  {
    variants: {
      checked: {
        true: '',
        false: '',
      },
      disabled: {
        true: '',
        false: '',
      },
      error: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        checked: true,
        disabled: false,
        error: false,
        class: 'border-blue-800 bg-blue-800',
      },
      {
        checked: false,
        error: true,
        class: 'border-error',
      },
      {
        checked: true,
        error: true,
        class: 'border-error bg-error',
      },
      {
        checked: false,
        disabled: true,
        error: false,
        class: 'border-gray-500',
      },
      {
        checked: true,
        disabled: true,
        error: false,
        class: 'border-gray-500 bg-gray-200',
      },
    ],
  },
)

export const checkboxIcon = cva(
  'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 stroke-2 transition-all',
)

export const input = cva('absolute left-0 top-0 cursor-pointer opacity-0')

export const label = cva('body-large leading-6 text-gray-900')

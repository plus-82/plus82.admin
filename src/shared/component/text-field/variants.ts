import { cva, VariantProps } from 'class-variance-authority'

export const textField = cva(
  'body-medium flex h-12 w-[22.5rem] items-center gap-2 overflow-hidden rounded-lg border border-gray-300 bg-white transition-all',
  {
    variants: {
      fullWidth: {
        true: 'w-full',
        false: '',
      },
      error: {
        true: 'border-error',
        false: '',
      },
      disabled: {
        true: 'bg-gray-100 text-gray-500',
        false: '',
      },
      focused: {
        true: 'border-2',
        false: '',
      },
    },

    compoundVariants: [
      {
        error: false,
        disabled: false,
        focused: true,
        class: 'border-blue-800',
      },
      {
        error: true,
        disabled: false,
        class: 'border-error',
      },
    ],
  },
)

export const input = cva(
  'peer h-full w-full bg-transparent px-2.5 py-3 placeholder:text-gray-500 disabled:pointer-events-none',
  {
    variants: {
      slots: {
        left: 'pl-0',
        right: 'pr-0',
        both: 'px-0',
      },
    },
  },
)

export type TextFieldVariants = VariantProps<typeof textField>

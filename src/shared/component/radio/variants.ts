import { cva, VariantProps } from 'class-variance-authority'

export const radioWrapper = cva(
  'title-small flex w-fit items-center gap-2 font-bold text-gray-900 focus:outline-none',
  {
    variants: {
      disabled: {
        true: 'pointer-events-none cursor-default opacity-50',
        false: 'cursor-pointer',
      },
      readOnly: {
        true: 'pointer-events-none cursor-default',
        false: '',
      },
    },
  },
)

export const radio = cva(
  'h-6 w-6 cursor-pointer appearance-none rounded-full border-2 border-gray-500 checked:border-2 checked:shadow-[inset_0_0_0_3px_#fff]',
  {
    variants: {
      error: {
        true: 'border-error checked:border-error checked:bg-error',
        false: '',
      },
      disabled: {
        true: '',
        false: '',
      },
    },

    compoundVariants: [
      {
        error: false,
        disabled: false,
        class: 'border-gray-500 checked:border-blue-800 checked:bg-blue-800',
      },
      {
        error: false,
        disabled: true,
        class: 'border-gray-500 checked:border-gray-500 checked:bg-gray-500',
      },
    ],
  },
)

export const label = cva('body-large font-medium text-gray-900')

export type RadioVariants = VariantProps<typeof radioWrapper> &
  VariantProps<typeof radio>

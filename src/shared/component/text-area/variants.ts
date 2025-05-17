import { cva, VariantProps } from 'class-variance-authority'

export const textarea = cva(
  [
    'body-large resize-none rounded-[10px] border border-gray-300 p-4 text-gray-900 transition-all',
    'placeholder:text-gray-500',
  ],
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
    },
  },
)

export type TextAreaVariants = VariantProps<typeof textarea>

import { cva, VariantProps } from 'class-variance-authority'

export const wrapper = cva('flex gap-1')

export const helperText = cva('body-small', {
  variants: {
    variant: {
      default: 'text-gray-500',
      error: 'text-error',
      success: 'text-success',
    },
  },
})

export type HelperTextVariants = VariantProps<typeof helperText>

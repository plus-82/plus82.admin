import { cva, VariantProps } from 'class-variance-authority'

export const heading = cva(
  'flex items-center border-b border-b-gray-700 text-gray-900',
  {
    variants: {
      size: {
        small: 'title-small h-10',
        medium: 'title-medium h-11',
      },
      underline: {
        true: 'border-b',
        false: 'border-b-0',
      },
    },
  },
)

export type HeadingVariants = VariantProps<typeof heading>

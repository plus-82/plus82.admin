import { cva, VariantProps } from 'class-variance-authority'

export const button = cva(
  'flex items-center justify-center gap-1 transition-all focus:border-2 focus:border-blue-800 disabled:bg-gray-100 disabled:text-gray-500',
  {
    variants: {
      variant: {
        primary:
          'bg-blue-800 text-white outline outline-0 outline-white hover:bg-blue-900 focus:border-none focus:shadow-[0_0_0_4px_#3068E0] focus:outline-2',
        tonal:
          'bg-blue-50 text-blue-800 hover:bg-blue-100 focus:border-blue-800',
        lined:
          'border border-gray-300 bg-white text-gray-900 hover:bg-gray-100',
        text: 'bg-white text-gray-900 hover:text-blue-800 disabled:bg-white',
      },
      size: {
        small: 'body-small h-8 rounded-md px-3 py-2',
        medium: 'body-large h-10 rounded-md px-4 py-2.5',
        large: 'title-small h-12 rounded-lg px-5 py-3',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
  },
)

export type ButtonVariants = VariantProps<typeof button>

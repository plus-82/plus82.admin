import { cva } from 'class-variance-authority'

const spinnerVariants = cva(
  'animate-spin rounded-full border-4 border-blue-800 border-t-transparent',
  {
    variants: {
      size: {
        small: 'h-4 w-4 border-4',
        medium: 'h-10 w-10 border-4',
        large: 'h-16 w-16 border-8',
      },
    },
  },
)

type Props = {
  size?: 'small' | 'medium' | 'large'
}

export const Spinner = ({ size = 'medium' }: Props) => (
  <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-white/80">
    <div className={spinnerVariants({ size })} />
  </div>
)

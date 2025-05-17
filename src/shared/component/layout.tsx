import { cva, VariantProps } from 'class-variance-authority'
import { PropsWithChildren } from 'react'

import { cn } from '@/shared/lib/util'

export const outerWrapper = cva('h-fit w-fit flex-grow', {
  variants: {
    wide: {
      true: 'mx-auto my-0 flex',
      false: 'mx-auto my-0 flex',
    },
  },
})

export const innerWrapper = cva('flex-shrink-0', {
  variants: {
    wide: {
      true: 'm-[40px] w-[1060px] min-w-[1060px]',
      false: 'm-[50px] w-[360px] min-w-[360px]',
    },
  },
})

export type LayoutVariants = VariantProps<typeof outerWrapper>


type Props = LayoutVariants & {
  className?: string
}

export const Layout = ({
  wide = false,
  className,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <div className={cn(outerWrapper({ wide }))}>
      <div className={cn(innerWrapper({ wide, className }))}>
        {children}
      </div>
    </div>
  )
}

import { ComponentProps, ElementType } from 'react'

import { cn } from '@/shared/lib/util'

import * as css from './variants'
import { HeadingVariants } from './variants'

type HeadingProps<E extends ElementType> = HeadingVariants & {
  as?: E
}

type Props<E extends ElementType> = HeadingProps<E> &
  Omit<ComponentProps<E>, keyof HeadingProps<E>>

export const Heading = <E extends ElementType>({
  as,
  size,
  underline = true,
  className,
  ...restProps
}: Props<E>) => {
  const $Element = as || 'h1'

  return (
    <$Element
      className={cn(css.heading({ size, underline, className }))}
      {...restProps}
    />
  )
}

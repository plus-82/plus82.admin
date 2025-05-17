import { PropsWithChildren } from 'react'

import { colors } from '@/shared/config'
import { cn } from '@/shared/lib/util'

import * as css from './variants'
import { HelperTextVariants } from './variants'
import { Icon } from '../icon'

export type Props = HelperTextVariants & {
  hasIcon?: boolean
  className?: string
}

const ICON_COLOR = {
  default: colors.gray['500'],
  error: colors.error,
  success: colors.success,
}

export const HelperText = ({
  variant = 'default',
  hasIcon = false,
  className,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <div className={cn(css.wrapper({ className }))}>
      {hasIcon && (
        <Icon
          name="Check"
          color={ICON_COLOR[variant!]}
          size="small"
          className="shrink-0"
        />
      )}
      <p className={cn(css.helperText({ variant }))}>{children}</p>
    </div>
  )
}

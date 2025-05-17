import { flatMap, values } from 'lodash-es'

import { colors as colorTokens } from '@/shared/config'
import { cn } from '@/shared/lib/util'

import { IconComponent, IconType } from './assets'
import { icon, IconVariants } from './variants'

export const colors = flatMap(values(colorTokens), value =>
  typeof value === 'object' ? values(value) : value,
)

export type Props = IconVariants & {
  name: IconType
  color?: (typeof colors)[number] | 'currentColor'
  className?: string
}

export const Icon = ({
  name,
  size = 'large',
  color = '#000000',
  className,
}: Props) => {
  const Component = IconComponent[name]

  return (
    <Component
      viewBox="0 0 24 24"
      color={color}
      className={cn(icon({ size, className }))}
    />
  )
}

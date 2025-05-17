import {
  type ComponentProps,
  type ElementType,
  ForwardedRef,
  forwardRef,
  useMemo,
} from 'react'
import { useNavigate } from 'react-router-dom'

import { cn } from '@/shared/lib/util'

import { ButtonContext, useButtonContext } from './context'
import { button, ButtonVariants } from './variants'
import { Icon } from '../icon'
import { IconType } from '../icon/assets'

type ButtonProps = ButtonVariants & {
  as?: 'button' | 'a'
}

type Props<E extends ElementType> = ButtonProps &
  Omit<ComponentProps<E>, keyof ButtonProps>

export const ButtonRoot = forwardRef(
  <E extends ElementType>(
    {
      as,
      variant = 'primary',
      size = 'medium',
      fullWidth = false,
      className,
      ...restProps
    }: Props<E>,
    ref: ForwardedRef<ComponentProps<E>>,
  ) => {
    const $Element = as || 'button'

    const navigate = useNavigate()

    const value = useMemo(
      () => ({
        size: size as 'small' | 'medium' | 'large',
      }),
      [size],
    )

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      navigate(restProps?.href)
    }

    if (as === 'a') {
      return (
        <ButtonContext.Provider value={value}>
          <a href={restProps?.href} onClick={handleLinkClick}>
            <$Element
              ref={ref}
              className={cn(button({ variant, size, fullWidth, className }))}
              {...restProps}
            />
          </a>
        </ButtonContext.Provider>
      )
    }

    return (
      <ButtonContext.Provider value={value}>
        <$Element
          ref={ref}
          className={cn(button({ variant, size, fullWidth, className }))}
          {...restProps}
        />
      </ButtonContext.Provider>
    )
  },
)
ButtonRoot.displayName = 'Button'

type ButtonIconProps = {
  name: IconType
}

const ButtonIcon = ({ name }: ButtonIconProps) => {
  const { size } = useButtonContext()

  return <Icon name={name} size={size} color="currentColor" />
}

export const Button = Object.assign(ButtonRoot, {
  Icon: ButtonIcon,
})

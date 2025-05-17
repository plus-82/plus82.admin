import {
  AriaRole,
  LiHTMLAttributes,
  MouseEvent,
  PropsWithChildren,
} from 'react'
import { forwardRef } from 'react'

import { colors } from '@/shared/config'
import { cn } from '@/shared/lib/util'

import { ITEM_HEIGHT } from './constants'
import {
  dropdownWrapper,
  dropdownGroup,
  dropdownItemContent,
  dropdownItem,
  dropdown,
} from './variants'
import { Icon } from '../icon'

export type DropdownRootProps = PropsWithChildren<{
  id?: string
  className?: string
  onClick?: (event?: MouseEvent) => void
  displayLimit?: number
  role?: AriaRole
  scrollable?: boolean
  align?: 'left' | 'right'
}>

const DropdownRoot = forwardRef<HTMLDivElement, DropdownRootProps>(
  (
    {
      role = 'menu',
      className,
      displayLimit = 5,
      scrollable = true,
      align = 'left',
      children,
      ...restProps
    },
    ref,
  ) => {
    const itemHeight = ITEM_HEIGHT.DEFAULT
    const dropdownHeight = displayLimit * itemHeight + itemHeight / 2

    return (
      <div
        className={cn(dropdownWrapper({ scrollable, className, align }))}
        ref={ref}
      >
        <ul
          className={cn(dropdown({ scrollable }))}
          role={role}
          style={{ maxHeight: `${dropdownHeight}rem` }}
          onWheel={event => event.stopPropagation()}
          {...restProps}
        >
          {children}
        </ul>
      </div>
    )
  },
)

DropdownRoot.displayName = 'Dropdown'

type DropdownGroupProps = {
  className?: string
}

const DropdownGroup = ({
  className,
  children,
}: PropsWithChildren<DropdownGroupProps>) => (
  <li className={cn(dropdownGroup({ className }))}>
    <ul>{children}</ul>
  </li>
)

export type DropdownItemProps = LiHTMLAttributes<HTMLLIElement> & {
  selected?: boolean
  role?: AriaRole
}

const DropdownItem = forwardRef<
  HTMLLIElement,
  PropsWithChildren<DropdownItemProps>
>(
  (
    { children, className, selected = false, role = 'menuitem', ...restProps },
    ref,
  ) => {
    return (
      <li
        role={role}
        className={cn(dropdownItem({ className }))}
        aria-selected={selected}
        data-selected={selected}
        {...restProps}
        ref={ref}
      >
        <div className={cn(dropdownItemContent())}>
          {children}
          {selected && (
            <Icon name="Check" size="medium" color={colors.gray['700']} />
          )}
        </div>
      </li>
    )
  },
)
DropdownItem.displayName = 'DropdownItem'

export const Dropdown = Object.assign(DropdownRoot, {
  Group: DropdownGroup,
  Item: DropdownItem,
})

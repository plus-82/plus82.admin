import { intersection, isEmpty } from 'lodash-es'
import { Children, cloneElement, isValidElement, ReactNode } from 'react'

import { NewObject } from '@/type/utility'

export const passPropsToSingleChild = (child: ReactNode, props: NewObject) => {
  if (isValidElement(child)) {
    const originProps = child.props as NewObject
    const childProps = { ...props, ...originProps }

    const commonKeys = intersection(
      Object.keys(props),
      Object.keys(originProps),
    )
    const differentValues = commonKeys.filter(
      key => props[key] !== originProps[key],
    )

    if (!isEmpty(differentValues)) {
      console.log(
        'Prop conflicts detected:',
        differentValues.map(
          key =>
            `${key}: ${props[key]} (original) vs ${originProps[key]} (new)`,
        ),
      )
    }

    const newChild = cloneElement(child, childProps)

    return newChild
  }

  return child
}

export const passPropsToChildren = (children: ReactNode, props: NewObject) =>
  Children.map(children, child => passPropsToSingleChild(child, props))

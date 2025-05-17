import { ReactNode } from 'react'

type Props = {
  name: string
  children: ReactNode
}

export const Slot = ({ children }: Props) => {
  return <>{children}</>
}

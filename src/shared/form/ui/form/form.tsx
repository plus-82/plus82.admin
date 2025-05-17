'use client'

import { PropsWithChildren } from 'react'
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form'

import { cn } from '@/shared/lib/util'

type Props<T extends FieldValues> = UseFormReturn<T> & {
  className?: string
}

export const Form = <T extends FieldValues>({
  children,
  className,
  ...form
}: PropsWithChildren<Props<T>>) => (
  <FormProvider {...form}>
    <form
      className={cn('w-full', className)}
      onSubmit={event => event.preventDefault()}
    >
      {children}
    </form>
  </FormProvider>
)

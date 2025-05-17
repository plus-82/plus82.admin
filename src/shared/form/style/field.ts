import { cva } from 'class-variance-authority'

export const fieldWrapper = cva('flex flex-col gap-[6px] not-last:mb-6')

export const textFieldWrapper = cva('flex gap-2')

export const passwordFieldWrapper = cva('flex flex-col gap-2')

export const radioFieldWrapper = cva('flex gap-[30px]')

export const field = cva('flex flex-col gap-[6px]')

export const helperText = cva('flex flex-col gap-2')

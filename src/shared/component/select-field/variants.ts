import { cva, VariantProps } from 'class-variance-authority'

export const wrapper = cva('relative flex w-full shrink-0 items-center gap-2', {
  variants: {
    disabled: {
      true: 'pointer-events-none',
      false: '',
    },
  },
})

export const selected = cva(
  'flex h-auto w-full cursor-pointer flex-wrap items-center gap-2 rounded-lg border border-gray-300 bg-white pr-10 text-gray-900 outline-none transition-all focus:border-2',
  {
    variants: {
      size: {
        small: 'body-small min-h-[30px] px-[11px] py-[6px]',
        medium: 'body-large min-h-[36px] px-[11px] py-[7px]',
        large: 'body-large min-h-[46px] px-[11px] py-[10px]',
      },
      error: {
        true: '',
        false: '',
      },
      readOnly: {
        true: 'cursor-text',
        false: '',
      },
      disabled: {
        true: 'bg-gray-100 text-gray-500',
        false: '',
      },
      isFocused: {
        true: 'border-2',
        false: '',
      },
      isSelectable: {
        true: '',
        false: 'cursor-default',
      },
      isRemoveButtonVisible: {
        true: 'pr-[4.25rem]',
        false: '',
      },
    },

    compoundVariants: [
      {
        error: false,
        disabled: false,
        isFocused: true,
        class: 'border-blue-800',
      },
      {
        error: true,
        disabled: false,
        class: 'border-error',
      },
    ],
  },
)

export const placeholder = cva('select-none text-gray-500', {
  variants: {
    size: {
      small: 'body-small',
      medium: 'body-large',
      large: 'body-large',
    },
    readOnly: {
      true: 'text-gray-900',
      false: '',
    },
  },
})

export const removeButton = cva('absolute right-11 top-1/2 -translate-y-1/2')

export const arrowIcon = cva(
  'pointer-events-none absolute right-3 top-1/2 z-auto origin-center -translate-y-1/2 rotate-0 transform transition-all duration-200',
  {
    variants: {
      isOpen: {
        true: 'rotate-180 transform',
        false: 'rotate-0',
      },
      size: {
        small: 'h-4 w-4',
        medium: 'h-5 w-5',
        large: 'h-6 w-6',
      },
    },
  },
)

export type SelectVariants = VariantProps<typeof selected>

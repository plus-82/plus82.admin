'use client'

import { useState } from 'react'

import { colors } from '@/shared/config'
import { Slot } from '@/shared/lib/slot'

import { Calendar, type CalendarProps } from '../calendar'
import { Icon } from '../icon'
import { TextField, type TextFieldProps } from '../text-field'

export type Props = Omit<CalendarProps, 'placeholderText' | 'popperPlacement'> &
  Pick<TextFieldProps, 'error' | 'fullWidth' | 'placeholder'>

export const DatePicker = ({
  error,
  fullWidth,
  placeholder,
  ...restProps
}: Props) => {
  const [selectedDate, setSelectedDate] = useState<string | null>()

  return (
    <Calendar
      {...restProps}
      onChange={date => setSelectedDate(date)}
      selected={selectedDate}
      placeholderText={placeholder}
      customInput={
        <TextField error={error} fullWidth={fullWidth}>
          <Slot name="left">
            <Icon
              name="Date"
              size="large"
              color={colors.gray['500']}
              className="relative -top-px"
            />
          </Slot>
        </TextField>
      }
    />
  )
}

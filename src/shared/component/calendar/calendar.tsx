'use client'

import { getYear } from 'date-fns'
import { isNil, range } from 'lodash-es'
import {
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type FocusEvent,
} from 'react'
import DatePicker, { type DatePickerProps } from 'react-datepicker'

import { CustomHeader } from '@/shared/component/calendar/header'

import './calendar.css'
import { formatDate } from './utils'
import * as css from './variants'

import 'react-datepicker/dist/react-datepicker.css'

export type Props = Pick<
  DatePickerProps,
  | 'dateFormat'
  | 'placeholderText'
  | 'onBlur'
  | 'onFocus'
  | 'onKeyDown'
  | 'minDate'
  | 'maxDate'
  | 'name'
  | 'customInput'
  | 'excludeDates'
  | 'disabled'
  | 'readOnly'
  | 'inline'
  | 'popperPlacement'
> & {
  onChange: (
    date: string | null,
    event?: SyntheticEvent<unknown, Event>,
  ) => void
  selected?: string | Date | null
}

export const Calendar = ({
  selected,
  readOnly,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  ...restProps
}: Props) => {
  const dateFormat = restProps.dateFormat || 'MM-dd-yyyy'

  const placeholderText = readOnly
    ? '—'
    : restProps.placeholderText || 'MM-DD-YYYY'

  const years: number[] = range(1900, getYear(new Date()) + 1, 1)

  const minDate = restProps.minDate || new Date(years[0], 0, 1)
  const maxDate = restProps.maxDate || new Date(years[years.length - 1], 11, 31)

  const datePickerRef = useRef<DatePicker>(null)

  const [preventOpenOnFocus, setPreventOpenOnFocus] = useState<boolean>(true)
  const [isFocused, setFocused] = useState<boolean>(false)

  useEffect(() => {
    if (datePickerRef.current) {
      const { isCalendarOpen } = datePickerRef.current
      const shouldPreventOpenOnFocus = !isCalendarOpen() && !isFocused
      setPreventOpenOnFocus(shouldPreventOpenOnFocus)
    }
  }, [isFocused])

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    setFocused(true)
    onFocus?.(event)
  }

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    setFocused(false)
    onBlur?.(event)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    onKeyDown?.(event)

    if (datePickerRef.current && !datePickerRef.current.isCalendarOpen()) {
      if (event.key === 'Enter') {
        event.preventDefault()
        datePickerRef.current.setOpen(true)
      }
    }
  }

  const handleChange = (
    date: Date | null,
    event: SyntheticEvent<unknown, Event> | undefined,
  ) => {
    const formattedDate = date ? formatDate(date) : null

    if (selected !== formattedDate) onChange(formattedDate, event)
  }

  return (
    <DatePicker
      {...restProps}
      ref={datePickerRef}
      wrapperClassName={css.wrapper()}
      calendarClassName={css.calendar()}
      weekDayClassName={() => css.weekDay()}
      formatWeekDay={day => day.substring(0, 3)}
      dateFormat={dateFormat}
      placeholderText={placeholderText}
      minDate={minDate}
      maxDate={maxDate}
      preventOpenOnFocus={preventOpenOnFocus}
      showPopperArrow={false}
      renderCustomHeader={props => <CustomHeader {...props} years={years} />}
      selected={isNil(selected) ? selected : new Date(selected)}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      readOnly={readOnly}
    />
  )
}

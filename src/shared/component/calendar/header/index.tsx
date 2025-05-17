import { getMonth, getYear } from 'date-fns'
import { isNumber, isString } from 'lodash-es'
import { ReactDatePickerCustomHeaderProps } from 'react-datepicker'

import { colors } from '@/shared/config'

import { months } from './constants'
import { Icon } from '../../icon'
import { Select } from '../../select-field'

type Props = {
  years: number[]
} & ReactDatePickerCustomHeaderProps

export const CustomHeader = ({
  date,
  years,
  decreaseMonth,
  increaseMonth,
  changeYear,
  changeMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: Props) => {
  return (
    <div className="flex gap-4">
      {/* TODO: IconButton으로 교체 */}
      <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
        <Icon name="ChevronLeft" size="large" color={colors.gray['700']} />
      </button>
      <div className="flex gap-3">
        <Select
          defaultValue={months[getMonth(date)]}
          onChange={(_, [month]) => {
            if (isString(month)) {
              changeMonth(months.indexOf(month as string))
            }
          }}
          className="w-32"
          displayLimit={3}
        >
          {months.map(month => (
            <Select.Item key={month} value={month}>
              {month}
            </Select.Item>
          ))}
        </Select>
        <Select
          defaultValue={getYear(date)}
          onChange={(_, [year]) => isNumber(year) && changeYear(year)}
          className="w-[5.375rem]"
          displayLimit={3}
        >
          {years.map(year => (
            <Select.Item key={year} value={year}>
              {year}
            </Select.Item>
          ))}
        </Select>
      </div>
      {/* TODO: IconButton으로 교체 */}
      <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
        <Icon name="ChevronRight" size="large" color={colors.gray['700']} />
      </button>
    </div>
  )
}

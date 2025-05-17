import { FormCheckbox } from './checkbox'
import { FormControl } from './control'
import { FormDatePicker } from './date-picker'
import { Form as FormRoot } from './form'
import { FormErrorMessage } from './message'
import { FormRadio } from './radio'
import { FormSelect } from './select'
import { FormTextArea } from './text-area'
import { FormTextField, FormPasswordField } from './text-field'
export type { FormSelectProps } from './select'

export const Form = Object.assign(FormRoot, {
  CheckboxGroup: FormCheckbox.Group,
  Checkbox: FormCheckbox,
  Control: FormControl,
  DatePicker: FormDatePicker,
  ErrorMessage: FormErrorMessage,
  RadioGroup: FormRadio.Group,
  Radio: FormRadio,
  Select: FormSelect,
  SelectItem: FormSelect.Item,
  TextArea: FormTextArea,
  TextField: FormTextField,
  PasswordField: FormPasswordField,
})

import { Form, FormSelectProps } from '@/shared/form'
import { ApplicationStatus } from '@/type/resume'

export const StatusLabel = {
  [ApplicationStatus.SUBMITTED]: '접수',
  [ApplicationStatus.REVIEWED]: '검토',
  [ApplicationStatus.ACCEPTED]: '합격',
  [ApplicationStatus.REJECTED]: '불합격',
}

export const ApplicationStatusSelect = (props: FormSelectProps) => {
  return (
    <Form.Select
      name="status"
      size="medium"
      className="w-[85px]"
      displayValue={value => StatusLabel[value as ApplicationStatus]}
      {...props}
    >
      <Form.SelectItem value={ApplicationStatus.SUBMITTED}>
        접수
      </Form.SelectItem>
      <Form.SelectItem value={ApplicationStatus.REVIEWED}>검토</Form.SelectItem>
      <Form.SelectItem value={ApplicationStatus.ACCEPTED}>합격</Form.SelectItem>
      <Form.SelectItem value={ApplicationStatus.REJECTED}>
        불합격
      </Form.SelectItem>
    </Form.Select>
  )
}

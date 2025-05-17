'use client'

import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/shared/component/button'
import { Modal } from '@/shared/component/modal'
import { ApplicationStatus } from '@/type/resume'

import { FormValues } from './model/form-values'
import { StatusLabel } from '../application-status-select'

type Props = {
  status: {
    prev: ApplicationStatus
    next: ApplicationStatus
  }
  disabled: boolean
  hasToOpenModal: boolean
  onSubmit: (data: FormValues) => void
}

export const SubmitButton = ({ hasToOpenModal, onSubmit, ...props }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const form = useFormContext<FormValues>()

  const handleSubmitButtonClick = () => {
    if (hasToOpenModal) {
      setIsOpen(true)
    } else {
      form.handleSubmit(onSubmit)()
    }
  }

  const handleConfirmButtonClick = () => {
    form.handleSubmit(onSubmit)()
  }

  return (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <Button
        variant="primary"
        fullWidth
        size="large"
        onClick={handleSubmitButtonClick}
        {...props}
      >
        저장하기
      </Button>
      <Modal.Content className="flex h-[244px] w-[500px] flex-col">
        <Modal.Title className="hidden">채용 단계 변경</Modal.Title>
        <div className="mb-7 w-full text-center">
          <p>
            채용 단계를 &apos;
            <mark className="bg-white font-bold">
              {StatusLabel[props.status.prev]}
            </mark>
            &apos;에서 &apos;
            <mark className="bg-white font-bold">
              {StatusLabel[props.status.next]}
            </mark>
            &apos;으로 변경했어요.
          </p>
          <p>저장하면 지원자에게 결과가 전달돼요.</p>
          <p>변경 사항을 저장할까요?</p>
        </div>
        <div className="flex w-full gap-2">
          <Modal.Close asChild>
            <Button variant="lined" size="large" fullWidth>
              취소
            </Button>
          </Modal.Close>
          <Modal.Close asChild>
            <Button
              variant="primary"
              size="large"
              fullWidth
              onClick={handleConfirmButtonClick}
            >
              저장하기
            </Button>
          </Modal.Close>
        </div>
      </Modal.Content>
    </Modal>
  )
}

import { TextField, Button } from '@mui/material'
import { useState } from 'react'
import DaumPostcode, { type Address as AddressType } from 'react-daum-postcode'
import { Controller, useFormContext } from 'react-hook-form'

import { Modal } from '@/shared/component/modal'
import { type CreateAcademyInput } from '@/type/academy'

import {
  convertToLocationType,
  useGeocoding,
} from '../[academyId]/lib/geocoding'

import type { ComponentType } from 'react'

interface DaumPostcodeProps {
  style?: React.CSSProperties
  onComplete: (data: AddressType) => void
}

const DaumPostcodeComponent = DaumPostcode as ComponentType<DaumPostcodeProps>

export const Address = () => {
  const [isOpen, setIsOpen] = useState(false)

  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useFormContext<CreateAcademyInput>()

  console.log(
    getValues(['address', 'detailedAddress', 'locationType', 'lat', 'lng']),
  )

  const { geocode } = useGeocoding()

  const handleButtonClick = () => {
    setIsOpen(true)
  }

  const handleCompleteSearchingCode = (data: AddressType) => {
    setValue('address', data.address)
    setValue('detailedAddress', '')
    setValue('locationType', convertToLocationType(data.sido)!)

    geocode(data.address, ({ lat, lng }) => {
      setValue('lat', lat)
      setValue('lng', lng)
    })

    setIsOpen(false)
  }

  return (
    <>
      <div className="flex gap-2">
        <Controller
          control={control}
          name="address"
          render={({ field }) => (
            <TextField
              label="주소"
              {...field}
              error={!!errors.address}
              helperText={errors.address?.message}
              className="w-full"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />
          )}
        />

        <Modal open={isOpen} onOpenChange={setIsOpen}>
          <Button
            type="button"
            size="large"
            variant="outlined"
            onClick={handleButtonClick}
            className="shrink-0"
          >
            검색
          </Button>
          <Modal.Content className="h-[600px] w-[450px]">
            <DaumPostcodeComponent
              style={{ height: '500px' }}
              onComplete={handleCompleteSearchingCode}
            />
          </Modal.Content>
        </Modal>
      </div>
      <TextField label="상세 주소" {...register('detailedAddress')} />
    </>
  )
}

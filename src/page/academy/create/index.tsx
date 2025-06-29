import { zodResolver } from '@hookform/resolvers/zod'
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  Avatar,
} from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { academyApi } from '@/api/academy/request'
import NavigationBar from '@/shared/component/NavigationBar'
import { CreateAcademySchema, type CreateAcademyInput } from '@/type/academy'
import { Location } from '@/type/code'

import { Address } from '../component/address'

const defaultValues: CreateAcademyInput = {
  name: '',
  nameEn: '',
  representativeName: '',
  representativeEmail: '',
  description: '',
  locationType: Location.SEOUL,
  address: '',
  detailedAddress: '',
  lat: 0.0,
  lng: 0.0,
  forKindergarten: false,
  forElementary: false,
  forMiddleSchool: false,
  forHighSchool: false,
  forAdult: false,
  images: [],
}

const NewAcademy = () => {
  const navigate = useNavigate()
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])

  const form = useForm<CreateAcademyInput>({
    resolver: zodResolver(CreateAcademySchema),
    defaultValues,
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  const createAcademy = useMutation({
    mutationFn: academyApi.createAcademy,
    onSuccess: () => {
      navigate('/academy')
    },
    onError: () => {
      alert('학원 생성에 실패했습니다.')
    },
  })

  const onSubmit = (data: CreateAcademyInput) => {
    console.log(data)
    if (selectedFiles.length === 0) {
      toast.error('최소 1장의 이미지를 추가해주세요.')
      return
    }
    createAcademy.mutate({
      ...data,
      images: selectedFiles,
    })
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileList = Array.from(event.target.files)
      setSelectedFiles(fileList)

      // 미리보기 이미지 URL 생성
      const previewUrls = fileList.map(file => URL.createObjectURL(file))
      setPreviewImages(previewUrls)
    }
  }

  return (
    <FormProvider {...form}>
      <NavigationBar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          학원 추가
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="학원명 (국문)"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label="학원명 (영문)"
            {...register('nameEn')}
            error={!!errors.nameEn}
            helperText={errors.nameEn?.message}
          />
          <TextField
            label="대표자명"
            {...register('representativeName')}
            error={!!errors.representativeName}
            helperText={errors.representativeName?.message}
          />
          <TextField
            label="대표자 이메일"
            {...register('representativeEmail')}
            error={!!errors.representativeEmail}
            helperText={errors.representativeEmail?.message}
          />
          <TextField
            label="설명"
            multiline
            rows={4}
            {...register('description')}
            error={!!errors.description}
            helperText={errors.description?.message}
          />

          <Address />

          <Box display="flex" flexDirection="column" gap={1}>
            <FormControlLabel
              control={<Checkbox {...register('forKindergarten')} />}
              label="유아 대상"
            />
            <FormControlLabel
              control={<Checkbox {...register('forElementary')} />}
              label="초등학생 대상"
            />
            <FormControlLabel
              control={<Checkbox {...register('forMiddleSchool')} />}
              label="중학생 대상"
            />
            <FormControlLabel
              control={<Checkbox {...register('forHighSchool')} />}
              label="고등학생 대상"
            />
            <FormControlLabel
              control={<Checkbox {...register('forAdult')} />}
              label="성인 대상"
            />
          </Box>

          <Button variant="outlined" component="label">
            이미지 업로드
            <input
              type="file"
              hidden
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>
          <Typography variant="body2">
            선택한 파일 수: {selectedFiles.length}
          </Typography>

          {/* 이미지 미리보기 */}
          {previewImages.length > 0 && (
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {previewImages.map((previewUrl, index) => (
                <Avatar
                  key={index}
                  src={previewUrl}
                  alt={`미리보기 ${index + 1}`}
                  sx={{ width: 100, height: 100 }}
                  variant="rounded"
                />
              ))}
            </Box>
          )}

          <Box display="flex" gap={2} mt={2}>
            <Button variant="outlined" onClick={() => navigate('/academy')}>
              취소
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={createAcademy.isPending}
            >
              {createAcademy.isPending ? (
                <CircularProgress size={24} />
              ) : (
                '작성'
              )}
            </Button>
          </Box>
        </Box>
      </Container>
    </FormProvider>
  )
}

export default NewAcademy

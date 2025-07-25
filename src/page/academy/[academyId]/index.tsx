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
} from '@mui/material'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { academyApi } from '@/api/academy/request'
import NavigationBar from '@/shared/component/NavigationBar'
import { CreateAcademySchema, type CreateAcademyInput } from '@/type/academy'
import { Location } from '@/type/code'

import { Address } from '../component/address'

const EditAcademy = () => {
  const navigate = useNavigate()
  const { academyId } = useParams()
  const [imageFiles, setImageFiles] = useState<
    { file: File; previewUrl: string; id?: number }[]
  >([])

  const {
    data: academy,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['academyDetail', academyId],
    queryFn: () => academyApi.getDetail(Number(academyId)),
    enabled: !!academyId,
  })

  const form = useForm<CreateAcademyInput>({
    resolver: zodResolver(CreateAcademySchema),
    defaultValues: {
      name: '',
      nameEn: '',
      representativeName: '',
      representativeEmail: '',
      description: '',
      locationType: Location.SEOUL,
      address: '',
      detailedAddress: '',
      lat: 0,
      lng: 0,
      forKindergarten: false,
      forElementary: false,
      forMiddleSchool: false,
      forHighSchool: false,
      forAdult: false,
    },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = form

  // academy 데이터가 로드되면 폼 값 설정
  useEffect(() => {
    if (academy) {
      setValue('name', academy.name)
      setValue('nameEn', academy.nameEn)
      setValue('representativeName', academy.representativeName)
      setValue('representativeEmail', academy.representativeEmail)
      setValue('description', academy.description || '')
      setValue('locationType', academy.locationType)
      setValue('address', academy.address || '')
      setValue('detailedAddress', academy.detailedAddress || '')
      setValue('lat', academy.lat ?? 0)
      setValue('lng', academy.lng ?? 0)
      setValue('forKindergarten', academy.forKindergarten ?? false)
      setValue('forElementary', academy.forElementary ?? false)
      setValue('forMiddleSchool', academy.forMiddleSchool ?? false)
      setValue('forHighSchool', academy.forHighSchool ?? false)
      setValue('forAdult', academy.forAdult ?? false)

      // 기존 이미지 URL을 미리보기에 추가
      if (academy.imageList) {
        setImageFiles(
          academy.imageList.map(image => ({
            file: new File([], ''),
            previewUrl: `https://d1zl1w0yhwh5x4.cloudfront.net/${image.path}`,
            id: image.id,
          })),
        )
      }
    }
  }, [academy, setValue])

  const updateAcademy = useMutation({
    mutationFn: (data: CreateAcademyInput) => {
      // 기존 이미지 ID 추출
      const existingImageIds = imageFiles
        .filter(file => file.id !== undefined)
        .map(file => file.id as number)

      return academyApi.updateAcademy(Number(academyId), data, existingImageIds)
    },
    onSuccess: () => {
      toast.success('학원이 성공적으로 수정되었습니다.')
      navigate('/academy')
    },
    onError: () => {
      toast.error('학원 수정에 실패했습니다.')
    },
  })

  const onSubmit = (data: CreateAcademyInput) => {
    // 새로운 이미지 파일만 추출
    const newImageFiles = imageFiles
      .filter(file => file.id === undefined)
      .map(file => file.file)

    if (newImageFiles.length > 0) {
      data.images = newImageFiles
    }
    updateAcademy.mutate(data)
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).map(file => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }))
      setImageFiles(prev => [...prev, ...newFiles])
    }
  }

  const handleDeleteImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index))
  }

  if (isLoading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    )
  }
  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography color="error">
          학원 정보를 불러오는데 실패했습니다.
        </Typography>
      </Container>
    )
  }

  return (
    <FormProvider {...form}>
      <NavigationBar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          학원 수정
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
              control={
                <Checkbox
                  {...register('forKindergarten')}
                  checked={watch('forKindergarten')}
                />
              }
              label="유아 대상"
            />
            <FormControlLabel
              control={
                <Checkbox
                  {...register('forElementary')}
                  checked={watch('forElementary')}
                />
              }
              label="초등학생 대상"
            />
            <FormControlLabel
              control={
                <Checkbox
                  {...register('forMiddleSchool')}
                  checked={watch('forMiddleSchool')}
                />
              }
              label="중학생 대상"
            />
            <FormControlLabel
              control={
                <Checkbox
                  {...register('forHighSchool')}
                  checked={watch('forHighSchool')}
                />
              }
              label="고등학생 대상"
            />
            <FormControlLabel
              control={
                <Checkbox
                  {...register('forAdult')}
                  checked={watch('forAdult')}
                />
              }
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
            선택한 파일 수: {imageFiles.length}
          </Typography>

          {/* 이미지 미리보기 */}
          {imageFiles.length > 0 && (
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {imageFiles.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 150,
                    border: '1px solid #ccc',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <img
                    src={item.previewUrl}
                    alt={`미리보기 ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <Button
                    size="small"
                    color="error"
                    sx={{
                      position: 'absolute',
                      top: 4,
                      right: 4,
                      minWidth: 'auto',
                      padding: '4px',
                      backgroundColor: 'rgba(63, 57, 57, 0.7)',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                      },
                    }}
                    onClick={() => handleDeleteImage(index)}
                  >
                    ✕
                  </Button>
                </Box>
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
              disabled={updateAcademy.isPending}
            >
              {updateAcademy.isPending ? (
                <CircularProgress size={24} />
              ) : (
                '수정'
              )}
            </Button>
          </Box>
        </Box>
      </Container>
    </FormProvider>
  )
}

export default EditAcademy

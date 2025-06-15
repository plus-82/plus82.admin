import { z } from 'zod'

import { LocationTypes } from './code'

// 이미지 VO 스키마
export const ImageVOSchema = z.object({
  id: z.number(),
  path: z.string(),
})

// 목록 조회 스키마
export const AcademyListItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  nameEn: z.string(),
  representativeName: z.string(),
  representativeEmail: z.string().email(),
  businessRegistrationNumber: z.string(),
  locationType: z.enum(LocationTypes),
  address: z.string(),
  detailedAddress: z.string().optional(),
  updatedAt: z.string().datetime(),
  byAdmin: z.boolean(),
})

// 상세 조회 스키마
export const AcademyDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  nameEn: z.string(),
  representativeName: z.string(),
  representativeEmail: z.string().email(),
  description: z.string().nullable(),
  businessRegistrationNumber: z.string(),
  locationType: z.enum(LocationTypes),
  address: z.string(),
  detailedAddress: z.string().optional(),
  lat: z.number(),
  lng: z.number(),
  forKindergarten: z.boolean(),
  forElementary: z.boolean(),
  forMiddleSchool: z.boolean(),
  forHighSchool: z.boolean(),
  forAdult: z.boolean(),
  imageList: z.array(ImageVOSchema),
})

export const CreateAcademySchema = z.object({
  name: z.string().min(1, '학원 이름을 입력해주세요'),
  nameEn: z.string().min(1, '학원 이름(영문)을 입력해주세요'),
  representativeName: z.string().min(1, '대표자명을 입력해주세요'),
  representativeEmail: z
    .string()
    .email('이메일 형식이 아닙니다')
    .min(1, '대표 메일을 입력해주세요'),
  description: z.string().optional(),
  locationType: z.enum(LocationTypes),
  address: z.string().min(1, '주소를 입력해주세요'),
  detailedAddress: z.string().optional(),
  lat: z.number(),
  lng: z.number(),
  forKindergarten: z.boolean(),
  forElementary: z.boolean(),
  forMiddleSchool: z.boolean(),
  forHighSchool: z.boolean(),
  forAdult: z.boolean(),
  images: z.any(), // multipart/form-data로 업로드되는 파일. 서버에서 multer 등으로 처리됨
})

export type AcademyListItem = z.infer<typeof AcademyListItemSchema>
export type AcademyDetail = z.infer<typeof AcademyDetailSchema>
export type CreateAcademyInput = z.infer<typeof CreateAcademySchema>

import { z } from "zod";

import { LocationTypes } from "./code";

// 공통 Academy 스키마
export const AcademySchema = z.object({
  id: z.number(),
  name: z.string(),
  nameEn: z.string(),
  representativeName: z.string(),
  representativeEmail: z.string().email(),
  description: z.string().nullable().optional(), // 상세 조회에서만 사용
  businessRegistrationNumber: z.string(),
  locationType: z.enum(LocationTypes),
  detailedAddress: z.string(),
  byAdmin: z.boolean().optional(), // 목록 조회에서만 사용
  lat: z.number().optional(), // 상세 조회에서만 사용
  lng: z.number().optional(), // 상세 조회에서만 사용
  forKindergarten: z.boolean().optional(), // 상세 조회에서만 사용
  forElementary: z.boolean().optional(), // 상세 조회에서만 사용
  forMiddleSchool: z.boolean().optional(), // 상세 조회에서만 사용
  forHighSchool: z.boolean().optional(), // 상세 조회에서만 사용
  forAdult: z.boolean().optional(), // 상세 조회에서만 사용
  imageUrls: z.array(z.string().url()).optional(), // 상세 조회에서만 사용
  updatedAt: z.string().datetime(),
});

// 목록 조회 스키마
export const AcademyListItemSchema = AcademySchema.pick({
  id: true,
  name: true,
  nameEn: true,
  representativeName: true,
  representativeEmail: true,
  businessRegistrationNumber: true,
  locationType: true,
  detailedAddress: true,
  updatedAt: true,
  byAdmin: true,
});

// 상세 조회 스키마
export const AcademyDetailSchema = AcademySchema.pick({
  id: true,
  name: true,
  nameEn: true,
  representativeName: true,
  representativeEmail: true,
  description: true,
  businessRegistrationNumber: true,
  locationType: true,
  detailedAddress: true,
  lat: true,
  lng: true,
  forKindergarten: true,
  forElementary: true,
  forMiddleSchool: true,
  forHighSchool: true,
  forAdult: true,
  imageUrls: true,
});

export const CreateAcademySchema = z.object({
  name: z.string().min(1, "학원 이름을 입력해주세요"),
  nameEn: z.string().min(1, "학원 이름(영문)을 입력해주세요"),
  representativeName: z.string().min(1, "대표자명을 입력해주세요"),
  representativeEmail: z.string().email("이메일 형식이 아닙니다").min(1, "대표 메일을 입력해주세요"),
  description: z.string().optional(),
  locationType: AcademySchema.shape.locationType,
  detailedAddress: z.string().min(1, "상세 주소를 입력해주세요"),
  lat: z.number(),
  lng: z.number(),
  forKindergarten: z.boolean(),
  forElementary: z.boolean(),
  forMiddleSchool: z.boolean(),
  forHighSchool: z.boolean(),
  forAdult: z.boolean(),
  images: z.any(), // multipart/form-data로 업로드되는 파일. 서버에서 multer 등으로 처리됨
});

export type AcademyListItem = z.infer<typeof AcademyListItemSchema>;
export type AcademyDetail = z.infer<typeof AcademyDetailSchema>;
export type CreateAcademyInput = z.infer<typeof CreateAcademySchema>;
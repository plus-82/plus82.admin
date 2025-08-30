import { z } from 'zod'

// 선생님 이력서 관련 타입 정의

export const TeacherResumeSchema = z.object({
  id: z.number(),
  title: z.string(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  email: z.string().nullable(),
  hasVisa: z.boolean(),
  visaType: z.string().nullable(),
  genderType: z.string().nullable(),
  birthDate: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  countryId: z.number().nullable(),
  countryNameEn: z.string().nullable(),
  countryCode: z.string().nullable(),
  userId: z.number(),
})

export type TeacherResume = z.infer<typeof TeacherResumeSchema>

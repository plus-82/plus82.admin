import { z } from "zod";

// 공통 Academy 스키마
export const AcademySchema = z.object({
  id: z.number(),
  name: z.string(),
  nameEn: z.string(),
  representativeName: z.string(),
  representativeEmail: z.string().email(),
  description: z.string().nullable().optional(), // 상세 조회에서만 사용
  businessRegistrationNumber: z.string(),
  locationType: z.enum([
    "SEOUL",
    "BUSAN",
    "DAEGU",
    "INCHEON",
    "GWANGJU",
    "DAEJEON",
    "ULSAN",
    "SEJONG",
    "GYEONGGI",
    "GANGWON",
    "CHUNGBUK",
    "CHUNGNAM",
    "JEONBUK",
    "JEONNAM",
    "GYEONGBUK",
    "GYEONGNAM",
    "JEJU",
  ]),
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
  byAdmin: true,
});

// 상세 조회 스키마
export const AcademyDetailSchema = AcademySchema.pick({
  id: true,
  name: true,
  nameEn: true,
  representativeName: true,
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

// 목록 조회와 상세 조회 타입
export type AcademyListItem = z.infer<typeof AcademyListItemSchema>;
export type AcademyDetail = z.infer<typeof AcademyDetailSchema>;
import { z } from "zod";

export const AcademySchema = z.object({
  id: z.number(),
  name: z.string().min(1, "학원 이름을 입력해주세요"),
  description: z.string().nullable(),
  businessRegistrationNumber: z.string().nullable(),
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
  detailedAddress: z.string().min(1, "상세 주소를 입력해주세요"),
  forKindergarten: z.boolean(),
  forElementary: z.boolean(),
  forMiddleSchool: z.boolean(),
  forHighSchool: z.boolean(),
  forAdult: z.boolean(),
  imageUrls: z.array(z.string().url()),  // URL 형태로 검증
});

export type Academy = z.infer<typeof AcademySchema>;
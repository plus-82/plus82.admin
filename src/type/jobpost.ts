import { z } from "zod";

// 공통 JobPost 스키마
export const JobPostSchema = z.object({
  id: z.number(),
  title: z.string().min(1, "공고 제목을 입력해주세요"),
  jobDescription: z.string().min(1, "직무 내용을 입력해주세요"),
  requiredQualification: z.string().min(1, "필수 자격 요건을 입력해주세요"),
  preferredQualification: z.string().optional(),
  benefits: z.string().min(1, "복리후생을 입력해주세요"),
  salary: z.number().min(0, "급여를 입력해주세요"),
  salaryNegotiable: z.boolean(),
  jobStartDate: z.string().refine(
    (date) => !isNaN(Date.parse(date)),
    "유효한 날짜를 입력해주세요"
  ),
  dueDate: z.string().refine(
    (date) => !isNaN(Date.parse(date)),
    "유효한 날짜를 입력해주세요"
  ),
  createdAt: z.string(),
  forKindergarten: z.boolean(),
  forElementary: z.boolean(),
  forMiddleSchool: z.boolean(),
  forHighSchool: z.boolean(),
  forAdult: z.boolean(),
  closed: z.boolean(), // 상태 (마감 여부)
  academyId: z.number(),
  academyName: z.string(),
});

// 목록 조회 스키마
export const JobPostListItemSchema = JobPostSchema.pick({
  id: true,
  title: true,
  dueDate: true,
  createdAt: true,
  salary: true,
  academyId: true,
  academyName: true,
}).extend({
  resumeCount: z.number(),
});

// 페이징 처리된 목록 스키마
export const JobPostListSchema = z.object({
  content: z.array(JobPostListItemSchema), // 목록 데이터
  pageable: z.object({
    pageNumber: z.number(),
    pageSize: z.number(),
    offset: z.number(),
    paged: z.boolean(),
    unpaged: z.boolean(),
  }),
  totalElements: z.number(),
  totalPages: z.number(),
  first: z.boolean(),
  last: z.boolean(),
  numberOfElements: z.number(),
  empty: z.boolean(),
});

// 상세 조회 스키마
export const JobPostDetailSchema = z.object({
  id: z.number(),
  title: z.string(),
  jobDescription: z.string(),
  requiredQualification: z.string(),
  preferredQualification: z.string().nullable(),
  benefits: z.string(),
  salary: z.number(),
  salaryNegotiable: z.boolean(),
  jobStartDate: z.string(),
  dueDate: z.string(),
  forKindergarten: z.boolean(),
  forElementary: z.boolean(),
  forMiddleSchool: z.boolean(),
  forHighSchool: z.boolean(),
  forAdult: z.boolean(),
  academyId: z.number(),
  academyName: z.string(),
  academyNameEn: z.string(),
  academyRepresentativeName: z.string(),
  academyDescription: z.string().nullable(),
  academyLocationType: z.string(),
  lat: z.number(),
  lng: z.number(),
});

// 생성/수정 요청 스키마
export const CreateJobPostSchema = JobPostSchema.pick({
  title: true,
  jobDescription: true,
  requiredQualification: true,
  preferredQualification: true,
  benefits: true,
  salary: true,
  salaryNegotiable: true,
  jobStartDate: true,
  dueDate: true,
  forKindergarten: true,
  forElementary: true,
  forMiddleSchool: true,
  forHighSchool: true,
  forAdult: true,
}).extend({
  academyId: z.number().min(1, "학원을 선택해주세요"),
});

// 타입 정의
export type JobPost = z.infer<typeof JobPostSchema>;
export type JobPostListItem = z.infer<typeof JobPostListItemSchema>;
export type JobPostDetail = z.infer<typeof JobPostDetailSchema>;
export type JobPostList = z.infer<typeof JobPostListSchema>;
export type CreateJobPostInput = z.infer<typeof CreateJobPostSchema>;
import { z } from "zod";

// 공통 JobPost 스키마
export const JobPostSchema = z.object({
  id: z.number(),
  title: z.string().min(1, "공고 제목을 입력해주세요"),
  dueDate: z.string().refine(
    (date) => !isNaN(Date.parse(date)),
    "유효한 날짜를 입력해주세요"
  ), // 마감일
  createdAt: z.string(), // 생성일
  salary: z.number().min(0, "급여를 입력해주세요"), // 급여
  forKindergarten: z.boolean(),
  forElementary: z.boolean(),
  forMiddleSchool: z.boolean(),
  forHighSchool: z.boolean(),
  forAdult: z.boolean(),
  closed: z.boolean(), // 상태 (마감 여부)
  academyId: z.number(),
  academyName: z.string(),
  locationType: z.string().nullable(), // 지역 타입 (nullable)
  imageUrls: z.array(z.string().url()).optional(), // 이미지 URL 배열
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
export const JobPostDetailSchema = JobPostSchema.pick({
  id: true,
  title: true,
  dueDate: true,
  forKindergarten: true,
  forElementary: true,
  forMiddleSchool: true,
  forHighSchool: true,
  forAdult: true,
  closed: true,
  academyId: true,
  academyName: true,
  locationType: true,
  imageUrls: true,
});


// // 생성/수정 요청 스키마
// export const CreateJobPostSchema = JobPostSchema.omit({
//   id: true,
// }).extend({
//   title: z.string().min(1, "공고 제목을 입력해주세요"),
//   dueDate: z.string().refine(
//     (date) => !isNaN(Date.parse(date)),
//     "유효한 날짜를 입력해주세요"
//   ),
//   imageFiles: z.any().optional(), // 이미지 파일 업로드용
// });

// 타입 정의
// export type JobPost = z.infer<typeof JobPostSchema>;
export type JobPostListItem = z.infer<typeof JobPostListItemSchema>;
export type JobPostDetail = z.infer<typeof JobPostDetailSchema>;
export type JobPostList = z.infer<typeof JobPostListSchema>;
// export type CreateJobPostInput = z.infer<typeof CreateJobPostSchema>;
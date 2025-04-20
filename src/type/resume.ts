import { z } from "zod";

export const ResumeStatus = ["SUBMITTED", "REVIEWING", "ACCEPTED" , "REJECTED"] as const;

export const ResumeSchema = z.object({
    id: z.number(),
    coverLetter: z.string(),
    status: z.enum(ResumeStatus),
    submittedDate: z.string().refine(
        (date) => !isNaN(Date.parse(date)),
        "유효한 날짜를 입력해주세요"
    ),
    academyMemo: z.string(),
    resumeTitle: z.string(),
    resumeFirstName: z.string(),
    resumeLastName: z.string(),
    jobPostId: z.number(),
    jobPostTitle: z.string(),
    academyId: z.number(),
    academyName: z.string(),
});

export const ResumeListItemSchema = ResumeSchema.pick({
    id: true,
    coverLetter: true,
    status: true,
    submittedDate: true,
    academyMemo: true,
    resumeTitle: true,
    resumeFirstName: true,
    resumeLastName: true,
    jobPostId: true,
    jobPostTitle: true,
    academyId: true,
    academyName: true,
});

// 페이징 처리된 목록 스키마
export const ResumeListSchema = z.object({
    content: z.array(ResumeListItemSchema), // 목록 데이터
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

export type ResumeListItem = z.infer<typeof ResumeListItemSchema>;
export type ResumeList = z.infer<typeof ResumeListSchema>;
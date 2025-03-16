import { z } from "zod";

export const PostSchema = z.object({
  id: z.number(),
  title: z.string().min(1, "제목을 입력해주세요"),
  content: z.string().min(1, "내용을 입력해주세요"),
  author: z.string().min(1, "작성자를 입력해주세요"),
  createdAt: z.string(),
});

export const CreatePostSchema = PostSchema.omit({
  id: true,
  createdAt: true,
});

export type Post = z.infer<typeof PostSchema>;
export type CreatePostInput = z.infer<typeof CreatePostSchema>;

import { z } from "zod";

export const SignInRequestSchema = z.object({
  email: z.string().min(1, "이메일을 입력해주세요").email("이메일 형식이 아닙니다"),
  password: z.string().min(1, "비밀번호를 입력해주세요"),
});

export const SignInResponseSchema = z.object({
  accessToken: z.string(),
});

export type SignInRequest = z.infer<typeof SignInRequestSchema>;
export type SignInResponse = z.infer<typeof SignInResponseSchema>;
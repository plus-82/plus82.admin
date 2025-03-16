import type { CommonResponseCode } from "./response-code";
import type { ExceptionCode } from "../error/exception-code";

type ResponseCodeType = CommonResponseCode | ExceptionCode;

export interface SuccessResponse<T> {
  code: CommonResponseCode.SUCCESS;
  data: T;
  message: string;
}

export interface NotSuccessResponse {
  code: Exclude<ResponseCodeType, CommonResponseCode.SUCCESS>;
  data: null;
  message: string;
}

export type CommonResponse<T = unknown> =
  | SuccessResponse<T>
  | NotSuccessResponse;

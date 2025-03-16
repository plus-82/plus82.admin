/* eslint-disable @typescript-eslint/no-explicit-any */

type HttpErrorPropsType = {
  code: number | string;
  data?: any;
  message?: string;
  status: number;
};

export class HttpError extends Error {
  data: any;

  code: number | string;

  status: number;

  constructor({ code, data, message, status }: HttpErrorPropsType) {
    super(message);
    this.name = "HttpError";
    this.code = code;
    this.data = data;
    this.status = status;
  }
}

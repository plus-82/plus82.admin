/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";
import fileDownload from "js-file-download";
import qs from "qs";

import { HttpError } from "@/api/error/http-error";
import type { CommonResponse, SuccessResponse } from "@/api/response/common";
import { CommonResponseCode } from "@/api/response/response-code";

import type { AxiosInstance, AxiosPromise } from "axios";


export enum ContentType {
  JSON = "application/json",
  MULTIPART = "multipart/form-data",
  URLENCODED = "application/x-www-form-urlencoded",
}

type AxiosMethodType = {
  url: string;
  data?: any;
  contentType?: ContentType;
};

const DEFAULT_ERROR_MESSAGE = "기술팀에 문의해주세요";

const ERROR_MESSAGES = {
  500: "기술팀에 문의해주세요",
};

class CustomAxios {
  private instance: AxiosInstance;

  constructor(baseURL?: string) {
    this.instance = axios.create({
      baseURL: baseURL ?? window.location.origin,
      timeout: 15000,
      headers: {
        "Content-Type": ContentType.JSON,
      },
    });

    this.instance.interceptors.request.use(
      config => config,
      error => Promise.reject(error)
    );

    this.instance.interceptors.response.use(
      response => {
        const commonResponse: CommonResponse = response.data;

        if (
          commonResponse.code !== CommonResponseCode.SUCCESS &&
          !(commonResponse instanceof Blob)
        ) {
          throw new HttpError({ ...commonResponse, status: response.status });
        }

        if (response.config.method === "get" && response.data instanceof Blob) {
          return response;
        }

        return response.data;
      },
      async error => {
        const status = error?.response?.status;

        if (error.response.data instanceof Blob) {
          const commonResponse: CommonResponse = JSON.parse(
            await error.response.data.text()
          );
          throw new HttpError({
            ...commonResponse,
            status,
          });
        } else if (status >= 400 && status < 500) {
          const { code, data, message } = error.response.data;
          throw new HttpError({ code, data, message, status });
        } else {
          throw new HttpError({
            code: status,
            message: ERROR_MESSAGES[status as keyof typeof ERROR_MESSAGES] ?? DEFAULT_ERROR_MESSAGE,
            status,
          });
        }
      }
    );
  }

  async get<T>({ url, data }: AxiosMethodType): Promise<T> {
    const queryParam = qs.stringify(data, { arrayFormat: "repeat" });
    const newUrl = queryParam ? `${url}?${queryParam}` : url;

    const commonResponse: SuccessResponse<T> = await this.instance.get(newUrl);

    return commonResponse.data;
  }

  async post<T>({ url, contentType, data }: AxiosMethodType): Promise<T> {
    const commonResponse: SuccessResponse<T> = await this.instance.post(
      url,
      data,
      {
        headers: {
          "Content-Type": contentType,
        },
      }
    );

    return commonResponse.data;
  }

  async put<T>({ url, contentType, data }: AxiosMethodType): Promise<T> {
    const commonResponse: SuccessResponse<T> = await this.instance.put(
      url,
      data,
      {
        headers: {
          "Content-Type": contentType,
        },
      }
    );

    return commonResponse.data;
  }

  async delete<T>({ url, data }: AxiosMethodType): Promise<T> {
    const commonResponse: SuccessResponse<T> = await this.instance.delete(url, {
      data,
    });

    return commonResponse.data;
  }

  async download<T>({ url, data }: AxiosMethodType): AxiosPromise<T> {
    const queryParam = qs.stringify(data);
    const newUrl = queryParam ? `${url}?${queryParam}` : url;
    const response = await this.instance.get(newUrl, {
      responseType: "blob",
    });

    // 에러 발생시에는 데이터 타입이 JSON 형태로 내려옴
    if (response.data instanceof Blob) {
      const contentDisposition = response.headers["content-disposition"];
      const fileName = contentDisposition?.match(
        /filename[*]=UTF-8''(.+)/
      )?.[1];
      if (fileName) fileDownload(response.data, decodeURI(fileName));
    }

    return response.data;
  }
}

// const baseURL = `${window.location.origin}/api/`;
const baseURL = `http://localhost:8080/api/v1/`;

const http = new CustomAxios(baseURL);

export default http;

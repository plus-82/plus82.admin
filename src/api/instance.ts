/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from 'axios'
import fileDownload from 'js-file-download'
import qs from 'qs'
import { getCookie } from 'typescript-cookie'

import { HttpError } from '@/api/error/http-error'
import type { CommonResponse, SuccessResponse } from '@/api/response/common'
import { CommonResponseCode } from '@/api/response/response-code'

import type { AxiosInstance, AxiosPromise } from 'axios'

export enum ContentType {
  JSON = 'application/json',
  MULTIPART = 'multipart/form-data',
  URLENCODED = 'application/x-www-form-urlencoded',
}

type AxiosMethodType = {
  url: string
  data?: any
  contentType?: ContentType
}

const DEFAULT_ERROR_MESSAGE = '기술팀에 문의해주세요'

const ERROR_MESSAGES = {
  500: '기술팀에 문의해주세요',
}

class CustomAxios {
  private instance: AxiosInstance

  constructor(baseURL?: string) {
    this.instance = axios.create({
      baseURL: baseURL ?? window.location.origin,
      timeout: 15000,
      headers: {
        'Content-Type': ContentType.JSON,
      },
    })

    this.instance.interceptors.request.use(
      config => config,
      error => Promise.reject(error),
    )

    this.instance.interceptors.response.use(
      response => {
        const commonResponse: CommonResponse = response.data

        if (
          commonResponse.code !== CommonResponseCode.SUCCESS &&
          !(commonResponse instanceof Blob)
        ) {
          throw new HttpError({ ...commonResponse, status: response.status })
        }

        if (response.config.method === 'get' && response.data instanceof Blob) {
          return response
        }

        return response.data
      },
      async error => {
        const status = error?.response?.status

        if (error.response.data instanceof Blob) {
          const commonResponse: CommonResponse = JSON.parse(
            await error.response.data.text(),
          )
          throw new HttpError({
            ...commonResponse,
            status,
          })
        } else if (status >= 400 && status < 500) {
          const { code, data, message } = error.response.data
          throw new HttpError({ code, data, message, status })
        } else {
          throw new HttpError({
            code: status,
            message:
              ERROR_MESSAGES[status as keyof typeof ERROR_MESSAGES] ??
              DEFAULT_ERROR_MESSAGE,
            status,
          })
        }
      },
    )
  }

  // Authorization 헤더를 동적으로 추가
  private addAuth(
    headers: Record<string, string>,
    useAuth: boolean,
  ): Record<string, string> {
    if (useAuth) {
      const token = getCookie('Authorization')
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }
    }
    return headers
  }

  async get<T>({
    url,
    data,
    useAuth = true,
  }: AxiosMethodType & { useAuth?: boolean }): Promise<T> {
    const queryParam = qs.stringify(data, { arrayFormat: 'repeat' })
    const newUrl = queryParam ? `${url}?${queryParam}` : url

    const headers = this.addAuth({}, useAuth)
    const commonResponse: SuccessResponse<T> = await this.instance.get(newUrl, {
      headers,
    })

    return commonResponse.data
  }

  async getPaged<T>({
    url,
    data,
    useAuth = true,
  }: AxiosMethodType & { useAuth?: boolean }): Promise<{
    content: T[]
    pageable: {
      pageNumber: number
      pageSize: number
      offset: number
      paged: boolean
      unpaged: boolean
    }
    totalElements: number
    totalPages: number
    first: boolean
    last: boolean
    numberOfElements: number
    empty: boolean
  }> {
    const queryParam = qs.stringify(data, { arrayFormat: 'repeat' })
    const newUrl = queryParam ? `${url}?${queryParam}` : url

    const headers = this.addAuth({}, useAuth)
    const commonResponse: SuccessResponse<{
      content: T[]
      pageable: {
        pageNumber: number
        pageSize: number
        offset: number
        paged: boolean
        unpaged: boolean
      }
      totalElements: number
      totalPages: number
      first: boolean
      last: boolean
      numberOfElements: number
      empty: boolean
    }> = await this.instance.get(newUrl, { headers })

    return commonResponse.data
  }

  async post<T>({
    url,
    contentType,
    data,
    useAuth = true,
  }: AxiosMethodType & { useAuth?: boolean }): Promise<T> {
    const headers = this.addAuth(
      { 'Content-Type': contentType ?? ContentType.JSON },
      useAuth,
    )

    const commonResponse: SuccessResponse<T> = await this.instance.post(
      url,
      data,
      { headers },
    )

    return commonResponse.data
  }

  async postMultipart<T>({
    url,
    data,
    useAuth = true,
  }: AxiosMethodType & { useAuth?: boolean }): Promise<T> {
    const headers = this.addAuth(
      { 'Content-Type': ContentType.MULTIPART },
      useAuth,
    )

    const commonResponse: SuccessResponse<T> = await this.instance.post(
      url,
      data,
      { headers },
    )

    return commonResponse.data
  }

  async putMultipart<T>({
    url,
    data,
    useAuth = true,
  }: AxiosMethodType & { useAuth?: boolean }): Promise<T> {
    const headers = this.addAuth(
      { 'Content-Type': ContentType.MULTIPART },
      useAuth,
    )

    const commonResponse: SuccessResponse<T> = await this.instance.put(
      url,
      data,
      { headers },
    )

    return commonResponse.data
  }

  async put<T>({
    url,
    contentType,
    data,
    useAuth = true,
  }: AxiosMethodType & { useAuth?: boolean }): Promise<T> {
    const headers = this.addAuth(
      { 'Content-Type': contentType ?? ContentType.JSON },
      useAuth,
    )

    const commonResponse: SuccessResponse<T> = await this.instance.put(
      url,
      data,
      { headers },
    )

    return commonResponse.data
  }

  async delete<T>({
    url,
    data,
    useAuth = true,
  }: AxiosMethodType & { useAuth?: boolean }): Promise<T> {
    const headers = this.addAuth({}, useAuth)

    const commonResponse: SuccessResponse<T> = await this.instance.delete(url, {
      data,
      headers,
    })

    return commonResponse.data
  }

  async download<T>({ url, data }: AxiosMethodType): AxiosPromise<T> {
    const queryParam = qs.stringify(data)
    const newUrl = queryParam ? `${url}?${queryParam}` : url
    const response = await this.instance.get(newUrl, {
      responseType: 'blob',
    })

    // 에러 발생시에는 데이터 타입이 JSON 형태로 내려옴
    if (response.data instanceof Blob) {
      const contentDisposition = response.headers['content-disposition']
      const fileName = contentDisposition?.match(/filename[*]=UTF-8''(.+)/)?.[1]
      if (fileName) fileDownload(response.data, decodeURI(fileName))
    }

    return response.data
  }
}

const baseURL =
  import.meta.env.ENVIRONMENT === 'production'
    ? `${window.location.origin}/api/v1/`
    : `${window.location.origin}/dev/api/v1/`

const http = new CustomAxios(baseURL)

export default http

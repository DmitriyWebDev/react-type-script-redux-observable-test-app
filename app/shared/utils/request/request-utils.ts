import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, ResponseType } from 'axios';
import { ApiError } from '../../types/common-types';

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;

type HttpMethod = keyof typeof HTTP_METHODS;

type RequestSettings = {
  responseType?: ResponseType;
  requestSettingsDataParam?: 'text' | 'json';
};

const axiosInstance = axios.create({
  baseURL: '/',
  timeout: 10000,
  headers: { 'X-Custom-Header': 'foobar' },
});

export function request<T>(
  url: string,
  method: HttpMethod,
  data: object | string = {},
  requestSettings: RequestSettings = {},
): Promise<T> {
  const { responseType = 'json', requestSettingsDataParam } = requestSettings;

  const requestConfig: AxiosRequestConfig = {
    method,
    url,
    responseType,
    data: getRequestDataParam(method, data, requestSettingsDataParam),
    transformResponse: (r: AxiosResponse<T>): T => (r && r.data ? r.data : ((r as unknown) as T)),
  };

  return new Promise<T>((resolve, reject) => {
    return axiosInstance
      .request<T, AxiosResponse<T>>(requestConfig)
      .then(({ data }: AxiosResponse<T>) => resolve(data))
      .catch(
        (
          error: AxiosError<{
            code: number;
            text: string;
          }>,
        ) => {
          const apiError: ApiError = {
            httpStatusCode: error.response?.status || -1,
          };

          reject(apiError);
        },
      );
  });
}

function getRequestDataParam(
  method: HttpMethod,
  data: object | string = {},
  requestSettingsDataParam = 'json',
): string | object {
  const defaultValue = method === 'GET' ? data : JSON.stringify(data);
  return requestSettingsDataParam === 'json' ? defaultValue : data;
}

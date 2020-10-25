import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, ResponseType } from 'axios';
import { ApiError, Nullable } from '../../types/common-types';

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

type RequestData = object | string;

const authTokenHeaderKey = 'auth-token';

export const axiosInstance = axios.create({
  baseURL: '/',
  timeout: 10000,
  headers: { 'X-Custom-Header': 'foobar' },
});

export const get = <T>(url: string, data: RequestData = {}, requestSettings: RequestSettings = {}) =>
  request<T>(url, HTTP_METHODS.GET, data, requestSettings);

export const post = <T>(url: string, data: RequestData = {}, requestSettings: RequestSettings = {}) =>
  request<T>(url, HTTP_METHODS.POST, data, requestSettings);

export const put = <T>(url: string, data: RequestData = {}, requestSettings: RequestSettings = {}) =>
  request<T>(url, HTTP_METHODS.PUT, data, requestSettings);

export const del = <T>(url: string, data: RequestData = {}, requestSettings: RequestSettings = {}) =>
  request<T>(url, HTTP_METHODS.DELETE, data, requestSettings);

export function request<T>(
  url: string,
  method: HttpMethod,
  data: RequestData = {},
  requestSettings: RequestSettings = {},
): Promise<T> {
  const { responseType = 'json', requestSettingsDataParam } = requestSettings;

  const requestConfig: AxiosRequestConfig = {
    method,
    url,
    responseType,
    data: getRequestDataParam(method, data, requestSettingsDataParam),
    transformResponse: (r: AxiosResponse<T>): T => (r && r.data ? r.data : ((r as unknown) as T)),
    headers: {
      [authTokenHeaderKey]: 'old-auth-token',
    },
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
            httpStatusCode: error?.response?.status || -1,
            apiErrorCode: error?.response?.data?.code || -1,
            apiErrorText: error?.response?.data?.text || '',
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

let refreshTokenPromise: Nullable<Promise<unknown>> = null;

const getRefreshToken = () => {
  return post<string>('/token/refresh', {}, { responseType: 'text' }).then(token => {
    console.log('new token ->', token);

    return token;
  });
};

axiosInstance.interceptors.response.use(
  r => r,
  error => {
    if (error.config && error.response && error.response.status === 401) {
      if (!refreshTokenPromise) {
        refreshTokenPromise = getRefreshToken()
          .then(token => {
            refreshTokenPromise = null;

            return token;
          })
          .catch(error => {
            throw error;
          });
      }

      return refreshTokenPromise.then(newToken => {
        return axiosInstance.request({
          ...error.config,
          headers: {
            ...error.config.headers,
            [authTokenHeaderKey]: newToken,
          },
        });
      });
    }

    return Promise.reject(error);
  },
);

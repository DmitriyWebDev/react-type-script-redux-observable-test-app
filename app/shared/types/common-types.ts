export type ApiError = {
  httpStatusCode: number;
  apiErrorCode: number;
  apiErrorText: string;
};

export type Nullable<T> = T | null;

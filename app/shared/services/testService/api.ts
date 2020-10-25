import { get, post, put, del } from '../../utils/request/request-utils';

const url = 'test-api';

export function requestDataOne(): Promise<void> {
  return get(url);
}

export function requestDataTwo(): Promise<void> {
  return post(url);
}

export function requestDataThree(): Promise<void> {
  return put(url);
}

export function requestDataFour(): Promise<void> {
  return del(url);
}

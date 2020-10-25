import { TestServiceDispatch } from './test-service-redux-types';
import { requestDataOne, requestDataTwo, requestDataThree, requestDataFour } from './api';
import { ApiError } from '../../types/common-types';
import { getDataOneSuccess, getDataTwoSuccess, getDataThreeSuccess, getDataFourSuccess } from './action-creators';

export const getDataOne = () => (dispatch: TestServiceDispatch) =>
  requestDataOne()
    .then(() => {
      dispatch(getDataOneSuccess());
    })
    .catch((error: ApiError) => {
      console.log('error data 1', error);
    });

export const getDataTwo = () => (dispatch: TestServiceDispatch) =>
  requestDataTwo()
    .then(() => {
      dispatch(getDataTwoSuccess());
    })
    .catch((error: ApiError) => {
      console.log('error data 2', error);
    });

export const getDataThree = () => (dispatch: TestServiceDispatch) =>
  requestDataThree()
    .then(() => {
      dispatch(getDataThreeSuccess());
    })
    .catch((error: ApiError) => {
      console.log('error data 3', error);
    });

export const getDataFour = () => (dispatch: TestServiceDispatch) =>
  requestDataFour()
    .then(() => {
      dispatch(getDataFourSuccess());
    })
    .catch((error: ApiError) => {
      console.log('error data 4', error);
    });

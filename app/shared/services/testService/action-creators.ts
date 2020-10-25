import {
  SHARED_TEST_SERVICE_LOAD_DATA_ONE_SUCCESS,
  SHARED_TEST_SERVICE_LOAD_DATA_TWO_SUCCESS,
  SHARED_TEST_SERVICE_LOAD_DATA_THREE_SUCCESS,
  SHARED_TEST_SERVICE_LOAD_DATA_FOUR_SUCCESS,
} from './action-constants';

export const getDataOneSuccess = () => ({ type: SHARED_TEST_SERVICE_LOAD_DATA_ONE_SUCCESS } as const);
export const getDataTwoSuccess = () => ({ type: SHARED_TEST_SERVICE_LOAD_DATA_TWO_SUCCESS } as const);
export const getDataThreeSuccess = () => ({ type: SHARED_TEST_SERVICE_LOAD_DATA_THREE_SUCCESS } as const);
export const getDataFourSuccess = () => ({ type: SHARED_TEST_SERVICE_LOAD_DATA_FOUR_SUCCESS } as const);

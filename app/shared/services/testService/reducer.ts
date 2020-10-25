import {
  SHARED_TEST_SERVICE_LOAD_DATA_ONE_SUCCESS,
  SHARED_TEST_SERVICE_LOAD_DATA_TWO_SUCCESS,
  SHARED_TEST_SERVICE_LOAD_DATA_THREE_SUCCESS,
  SHARED_TEST_SERVICE_LOAD_DATA_FOUR_SUCCESS,
} from './action-constants';
import { TestServiceStoreData, TestServiceActions } from './test-service-redux-types';

export const initialState: TestServiceStoreData = {
  isLoadedOne: false,
  isLoadedTwo: false,
  isLoadedThree: false,
  isLoadedFour: false,
};

export function sharedTestServiceReducer(
  state: TestServiceStoreData = initialState,
  action: TestServiceActions,
): TestServiceStoreData {
  switch (action.type) {
    case SHARED_TEST_SERVICE_LOAD_DATA_ONE_SUCCESS: {
      return {
        ...state,
        isLoadedOne: true,
      };
    }
    case SHARED_TEST_SERVICE_LOAD_DATA_TWO_SUCCESS: {
      return {
        ...state,
        isLoadedTwo: true,
      };
    }
    case SHARED_TEST_SERVICE_LOAD_DATA_THREE_SUCCESS: {
      return {
        ...state,
        isLoadedThree: true,
      };
    }
    case SHARED_TEST_SERVICE_LOAD_DATA_FOUR_SUCCESS: {
      return {
        ...state,
        isLoadedFour: true,
      };
    }
    default:
      return state;
  }
}

import { GetAllActionTypes } from '../../types/redux-types';
import { Dispatch } from 'redux';
import { sharedTestServiceReducer } from './reducer';
import * as testServiceActionsMap from './action-creators';

export type TestServiceRootStoreData = ReturnType<typeof sharedTestServiceReducer>;
export type TestServiceActions = ReturnType<GetAllActionTypes<typeof testServiceActionsMap>>;
export type TestServiceDispatch = Dispatch<TestServiceActions>;
export type TestServiceStoreData = {
  isLoadedOne: boolean;
  isLoadedTwo: boolean;
  isLoadedThree: boolean;
  isLoadedFour: boolean;
};

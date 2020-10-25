import { combineReducers } from 'redux';
import { TestServiceRootStoreData } from './testService/test-service-redux-types';
import { sharedTestServiceReducer } from './testService/reducer';

export const SHARED_SERVICES_REDUCER_NAMESPACES = {
  shared: 'shared',
  testService: 'testService',
} as const;

export type SharedStoreData = {
  [SHARED_SERVICES_REDUCER_NAMESPACES.testService]: TestServiceRootStoreData;
};

export const sharedServicesRootReducer = combineReducers<SharedStoreData>({
  [SHARED_SERVICES_REDUCER_NAMESPACES.testService]: sharedTestServiceReducer,
});

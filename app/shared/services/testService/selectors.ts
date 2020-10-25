import { createSelector } from 'reselect';
import { sharedServicesRootSelector } from '../sharedServicesRootSelector';
import { Nullable } from '../../types/common-types';
import { SHARED_SERVICES_REDUCER_NAMESPACES, SharedStoreData } from '../sharedServicesRootReducer';
import { TestServiceRootStoreData } from './test-service-redux-types';

type RootSelectorData = Nullable<TestServiceRootStoreData>;

export const testServiceRootSelector = createSelector(
  sharedServicesRootSelector,
  (state: Nullable<SharedStoreData>): RootSelectorData =>
    (state && state[SHARED_SERVICES_REDUCER_NAMESPACES.testService]) || null,
);

export const testServiceLoadedDataOneSelector = createSelector(
  testServiceRootSelector,
  (state: RootSelectorData): boolean => Boolean(state && state.isLoadedOne),
);

export const testServiceLoadedDataTwoSelector = createSelector(
  testServiceRootSelector,
  (state: RootSelectorData): boolean => Boolean(state && state.isLoadedTwo),
);

export const testServiceLoadedDataThreeSelector = createSelector(
  testServiceRootSelector,
  (state: RootSelectorData): boolean => Boolean(state && state.isLoadedThree),
);

export const testServiceLoadedDataFourSelector = createSelector(
  testServiceRootSelector,
  (state: RootSelectorData): boolean => Boolean(state && state.isLoadedFour),
);

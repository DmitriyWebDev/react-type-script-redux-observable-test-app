import { RootStoreData } from '../types/redux-types';
import { SHARED_SERVICES_REDUCER_NAMESPACES, SharedStoreData } from './sharedServicesRootReducer';
import { Nullable } from '../types/common-types';

export const sharedServicesRootSelector = (state: RootStoreData): Nullable<SharedStoreData> =>
  (state && state[SHARED_SERVICES_REDUCER_NAMESPACES.shared]) || null;

import { combineReducers } from 'redux';
import {
  sharedServicesRootReducer,
  SHARED_SERVICES_REDUCER_NAMESPACES,
} from '../shared/services/sharedServicesRootReducer';

export default combineReducers({
  [SHARED_SERVICES_REDUCER_NAMESPACES.shared]: sharedServicesRootReducer,
});

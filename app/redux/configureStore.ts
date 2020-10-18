import { applyMiddleware, createStore } from 'redux';
import rootReducer from './rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const enhancer = composeWithDevTools(applyMiddleware());

export default function configureStore(preloadedState = {}) {
  return createStore(rootReducer(), preloadedState, enhancer);
}

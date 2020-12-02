import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import reactotron from '@services/reactotron';

import sharedSlices from './slices';
import sharedSagas from './sagas';

const reducer = combineReducers({ ...sharedSlices });
export type RootState = ReturnType<typeof reducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer,
  middleware: [sagaMiddleware],
  enhancers: __DEV__ ? [reactotron!.createEnhancer!()] : undefined,
});

sagaMiddleware.run(sharedSagas);

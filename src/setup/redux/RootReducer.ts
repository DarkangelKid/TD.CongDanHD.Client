import {all} from 'redux-saga/effects';
import {combineReducers} from 'redux';

import * as auth from '../../app/modules/auth';
import {modalSlice} from './modal/Slice';
import {globalSlice} from './global/Slice';

export const rootReducer = combineReducers({
  auth: auth.reducer,
  modal: modalSlice.reducer,
  global: globalSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
  yield all([auth.saga()]);
}

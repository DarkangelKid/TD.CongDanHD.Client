import {modalSlice, callTypes} from './Slice';

const {actions} = modalSlice;

export const setRandom = () => (dispatch) => {
  dispatch(actions.setRandom());
};

import {modalSlice, callTypes} from './Slice';

const {actions} = modalSlice;

export const setDataModal = (data) => (dispatch) => {
  dispatch(actions.setDataModal(data));
};

export const setModalVisible = (data) => (dispatch) => {
  dispatch(actions.setModalVisible(data));
};

export const setDataSearch = (data) => (dispatch) => {
  dispatch(actions.setDataSearch(data));
};

export const resetData = () => (dispatch) => {
  dispatch(actions.resetData());
};

export const setRandom = () => (dispatch) => {
  dispatch(actions.setRandom());
};

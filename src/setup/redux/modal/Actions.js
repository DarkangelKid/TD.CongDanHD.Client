import {modalSlice, callTypes} from './Slice';

const {actions} = modalSlice;

export const setDataModal = (data) => (dispatch) => {
  dispatch(actions.setDataModal(data));
};

export const setModalVisible = (data) => (dispatch) => {
  dispatch(actions.setModalVisible(data));
};

export const setModalDanhSachChuyenDiVisible = (data) => (dispatch) => {
  dispatch(actions.setModalDanhSachChuyenDiVisible(data));
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

export const setDataTripModal = (data) => (dispatch) => {
  dispatch(actions.setDataTripModal(data));
};

export const setDataDanhSachChuyenDiSearch = (data) => (dispatch) => {
  dispatch(actions.setDataDanhSachChuyenDiSearch(data));
};

export const setModalTripVisible = (data) => (dispatch) => {
  dispatch(actions.setModalTripVisible(data));
};

export const setModalCategoryAttributeVisible = (data) => (dispatch) => {
  dispatch(actions.setModalCategoryAttributeVisible(data));
};

export const setModalAreaInfoVisible = (data) => (dispatch) => {
  dispatch(actions.setModalAreaInfoVisible(data));
};

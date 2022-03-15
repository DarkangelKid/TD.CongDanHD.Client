import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  random: null,
  dataModal: null,
  modalVisible: false,
  dataSearch: null,

  listLoading: false,
  actionsLoading: false,
  error: null,
};
export const callTypes = {
  list: 'list',
  action: 'action',
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState: initialState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },

    setDataModal: (state, action) => {
      const payload = action.payload;
      state.dataModal = payload;
    },
    setModalVisible: (state, action) => {
      const payload = action.payload;
      state.modalVisible = payload;
      if (!state.modalVisible) {
        state.dataModal = null;
      }
    },
    setDataSearch: (state, action) => {
      const payload = action.payload;
      state.dataSearch = payload;
    },
    resetData: (state, action) => {
      state = initialState;
    },
    setRandom: (state, action) => {
      state.random = Math.random().toString(32);
    },
  },
});

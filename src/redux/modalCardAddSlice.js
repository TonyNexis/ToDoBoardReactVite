import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalCardAddIsOpen: false,
};

const modalCardAddSlice = createSlice({
  name: 'modalCardAdd',
  initialState,
  reducers: {
    openModalCardAdd: (state) => {
      state.modalCardAddIsOpen = true;
    },
    closeModalCardAdd: (state) => {
      state.modalCardAddIsOpen = false;
    },
  },
});

export const { openModalCardAdd, closeModalCardAdd } = modalCardAddSlice.actions;

export default modalCardAddSlice.reducer;
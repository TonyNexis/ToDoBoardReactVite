import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalCardIsOpen: false,
};

const modalCardSlice = createSlice({
  name: 'modalCard',
  initialState,
  reducers: {
    openModalCard: (state) => {
      state.modalCardIsOpen = true;
    },
    closeModalCard: (state) => {
      state.modalCardIsOpen = false;
    },
  },
});

export const { openModalCard, closeModalCard } = modalCardSlice.actions;

export default modalCardSlice.reducer;
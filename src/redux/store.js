import { configureStore } from '@reduxjs/toolkit';
import modalCardAddSlice from './modalCardAddSlice';
import dataSlice from './dataSlice';
import editCardStatusSlice from './editCardStatusSlice';

export default configureStore({
  reducer: {
    cardAdd: modalCardAddSlice,
    dataToDo: dataSlice,
    editCardStatus: editCardStatusSlice,
  },
});
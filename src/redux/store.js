import { configureStore } from '@reduxjs/toolkit';
import modalCardAddSlice from './modalCardAddSlice';
import dataSlice from './dataSlice';

export default configureStore({
  reducer: {
    cardAdd: modalCardAddSlice,
    data: dataSlice,
  },
});
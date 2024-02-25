import { configureStore } from '@reduxjs/toolkit';
import modalCardAddSlice from './modalCardAddSlice';

export default configureStore({
  reducer: {
    cardAdd: modalCardAddSlice,
  },
});
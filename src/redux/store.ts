import { configureStore } from '@reduxjs/toolkit'
import dataSlice from './dataSlice'
import editCardDataSlice from './editCardDataSlice'
import modalCardSlice from './modalCardSlice'
// import filterSlice from './filterSlice'
// import showMenuSlice from './showMenuSlice'

const store = configureStore({
  reducer: {
    modalCard: modalCardSlice,
    dataToDo: dataSlice,
    editCardData: editCardDataSlice,
    // filterCards: filterSlice,
    // showMenu: showMenuSlice, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
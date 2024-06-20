import { configureStore } from '@reduxjs/toolkit'
import dataSlice from './dataSlice'
import editCardDataSlice from './editCardDataSlice'
import modalCardSlice from './modalCardSlice'
import filterSlice from './filterSlice'
import showMenuSlice from './showMenuSlice'

export default configureStore({
  reducer: {
    modalCard: modalCardSlice,
    dataToDo: dataSlice,
    editCardData: editCardDataSlice,
    filterCards: filterSlice,
    showMenu: showMenuSlice, 
  },
});
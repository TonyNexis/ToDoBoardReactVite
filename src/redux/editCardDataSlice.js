import { createSlice } from '@reduxjs/toolkit'

    const initialState = {
        data: null,
    };

    const editCardDataSlice = createSlice({
        name: 'editCardData',
        initialState,
        reducers: {
            setEditCard: (state, action) => { state.data = action.payload } ,
            clearEditCard: (state) => { state.data = null },
        },
    });

    export const { setEditCard, clearEditCard } = editCardDataSlice.actions;

    export default editCardDataSlice.reducer
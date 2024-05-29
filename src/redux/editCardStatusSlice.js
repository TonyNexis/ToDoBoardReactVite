import { createSlice } from '@reduxjs/toolkit'

    const initialState = {
        editCardStatus: false,
    };

    const editCardStatusSlice = createSlice({
        name: 'editCardStatus',
        initialState,
        reducers: {
            toggleEditCardStatus: (state) => {
                state.editCardStatus = !state.editCardStatus
            },
        },
    });

    export const { toggleEditCardStatus } = editCardStatusSlice.actions;

    export default editCardStatusSlice.reducer
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    hot: true,
    important: true,
    normal: true,
}

const filterStatusCardsSlice = createSlice({
    name: 'filterStatusCards',
    initialState: JSON.parse(localStorage.getItem('filterStatusCards')) || initialState,
    reducers: {
        toggleFilter: (state, action) => {
            state[action.payload] = !state[action.payload];
            localStorage.setItem('filterStatusCards', JSON.stringify(state))
        },
        setFilters: (state, action) => {
            return { ...state, ...action.payload};
        },
    },
});

export const {toggleFilter, setFilters} = filterStatusCardsSlice.actions;
export default filterStatusCardsSlice.reducer;
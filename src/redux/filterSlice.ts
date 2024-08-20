import { createSlice, PayloadAction  } from '@reduxjs/toolkit';

interface FilterState {
    hot: boolean,
    important: boolean,
    normal: boolean,
}

const initialState: FilterState = {
    hot: true,
    important: true,
    normal: true,
}

const storedState = localStorage.getItem('filterStatusCards');
const parsedState: FilterState = storedState ? JSON.parse(storedState) : initialState;

const filterStatusCardsSlice = createSlice({
    name: 'filterStatusCards',
    initialState: parsedState,
    reducers: {
        toggleFilter: (state, action: PayloadAction<keyof FilterState>) => {
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
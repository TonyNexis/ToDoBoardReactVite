import { createSlice } from '@reduxjs/toolkit'

interface ShowMenuState {
    MenuIsOpen: boolean;
}

const initialState: ShowMenuState = {
    MenuIsOpen: false
};

const showMenuSlice = createSlice ({
        name: 'showMenu',
        initialState,
        reducers: {
            toggleShowMenu: (state) => {
                state.MenuIsOpen = !state.MenuIsOpen;
            },
        },
    })

    export const { toggleShowMenu } = showMenuSlice.actions;

    export default showMenuSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Card {
	id: string
	title: string
	comment: string
	status: string
	date: string
}

interface EditCardData {
	data: Card | null
}

const initialState: EditCardData = {
	data: null,
}

const editCardDataSlice = createSlice({
	name: 'editCardData',
	initialState,
	reducers: {
		setEditCard: (state, action: PayloadAction<Card>) => {
			state.data = action.payload
		},
		clearEditCard: state => {
			state.data = null
		},
	},
})

export const { setEditCard, clearEditCard } = editCardDataSlice.actions

export default editCardDataSlice.reducer

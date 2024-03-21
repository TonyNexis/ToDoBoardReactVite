import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchData = createAsyncThunk(
    'data/fetchData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('./../../db.json');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        data: null,
        loading: false,
        sending: false,
        error: null,
    },
    reducers: {},
    extraReducers: builder => {
        builder
          .addCase(fetchData.pending, state => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchData.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
          })
          .addCase(fetchData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
      },
    });

export default dataSlice.reducer;
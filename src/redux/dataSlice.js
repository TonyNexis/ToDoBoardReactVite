import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchData = createAsyncThunk(
    'data/fetchData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('./../../db.json');
            if (response.status === 200) {
              return response.data.todo;
          } else {
              return rejectWithValue("File not found");
          }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const sendData = createAsyncThunk(
  'data/sendData',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.put('./../../db.json', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        return response.data.todo;
      } else {
        return rejectWithValue('File not found');
      }
    } catch (error) {
      return rejectWithValue(error.message)
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
          })
          .addCase(sendData.pending, state => {
            state.sending = true;
            state.error = null;
          })
          .addCase(sendData.fulfilled, state => {
            state.sending = false;
          })
          .addCase(sendData.rejected, (state, action) => {
            state.error = action.payload;
          });
      },
    });

export default dataSlice.reducer;
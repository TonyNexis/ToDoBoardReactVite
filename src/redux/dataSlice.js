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
      const response = await axios.post('http://localhost:3000/todo', formData);
      return response.data;
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
        sended: false,
        error: null,
    },
    reducers: {
      setSendedFalse: state => {
        state.sended = false
      },
      addCard: (state, action) => {
        state.data.push(action.payload)
      }
    },
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
            state.sended = false;
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(sendData.pending, state => {
            state.sended = false;
            state.sending = true;
            state.error = null;
          })
          .addCase(sendData.fulfilled, state => {
            state.sending = false;
            state.sended = true;
          })
          .addCase(sendData.rejected, (state, action) => {
            state.error = action.payload;
            state.sending = false;
          });
      },
    });

    export const { setSendedFalse, addCard } = dataSlice.actions;

export default dataSlice.reducer;
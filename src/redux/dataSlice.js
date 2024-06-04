import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { Axios } from 'axios';

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

export const deleteData = createAsyncThunk(
  'data/deleteData',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:3000/todo/${id}`);
      if (response.status === 200) {
        return id;
      } else {
        return rejectWithValue('Failed to delete');
      }
    } catch (error) {
      return rejectWithValue(error.message)
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

export const updateData = createAsyncThunk(
  'data/updateData',
  async ({formData, id}, {rejectWithValue}) => {
    try {
      const response = await axios.post('http://localhost:3000/todo', formData)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        data: null,
        loading: false,
        sending: false,
        sended: false,
        error: null,
        deleting: false,
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
            state.data = action.payload.sort((a, b) => new Date(a.date) - new Date(b.date));
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
          .addCase(sendData.fulfilled, (state, action) => {
            state.sending = false;
            state.sended = true;
            state.data.push(action.payload);
            state.data.sort((a, b) => new Date(a.date) - new Date(b.date));
          })
          .addCase(sendData.rejected, (state, action) => {
            state.error = action.payload;
            state.sending = false;
          })
          .addCase(updateData.pending, state => {
            state.sending = true;
            state.error = null;
          })
          .addCase(updateData.fulfilled, (state, action) => {
            state.sending = false;
            state.sended = true;
            const index = state.data.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
              state.data[index] = action.payload;
            }
            state.data.sort((a, b) => new Date(a.date) - new Date(b.date));
          })
          .addCase(updateData.rejected, (state, action) => {
            state.error = action.payload;
            state.sending = false;
          })
          .addCase(deleteData.pending, state => {
            state.deleting = true;
            state.error = null;
          })
          .addCase(deleteData.fulfilled, (state, action) => {
            state.deleting = false;
            state.data = state.data.filter(item => item.id !== action.payload);
          })
          .addCase(deleteData.rejected, (state, action) => {
            state.deleting = false;
            state.error = action.payload;
          });
      },
    });

    export const { setSendedFalse, addCard } = dataSlice.actions;

export default dataSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ToDoItem {
  id: string;
  title: string;
  comment: string;
  status: string;
  date: string;
}

interface DataState {
  data: ToDoItem[];
  loading: boolean;
  sending: boolean;
  sended: boolean;
  editing: boolean;
  edited: boolean;
  error: string | null;
  deleting: boolean;
}

interface FetchError {
  message: string;
}

export const fetchData = createAsyncThunk<ToDoItem[], void, { rejectValue: string }>(
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
            return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
        }
    }
);

export const deleteData = createAsyncThunk<string, string, { rejectValue: string }>(
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
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const sendData = createAsyncThunk<ToDoItem, ToDoItem, { rejectValue: string }>(
  'data/sendData',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/todo', formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const updateData = createAsyncThunk<ToDoItem, { formData: ToDoItem; id: string }, { rejectValue: string }>(
  'data/updateData',
  async ({formData, id}, {rejectWithValue}) => {
    try {
      const response = await axios.put(`http://localhost:3000/todo/${id}`, formData)
      return response.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
)

const initialState: DataState = {
  data: [],
  loading: false,
  sending: false,
  sended: false,
  editing: false,
  edited: false,
  error: null,
  deleting: false,
};

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
      setSendedFalse: state => {
        state.sended = false
      },
      setEditedFalse: state => {
        state.edited = false
      },
      addCard: (state, action) => {
        state.data?.push(action.payload)
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
            state.data = action.payload.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          })
          .addCase(fetchData.rejected, (state, action) => {
            state.sended = false;
            state.loading = false;
            state.error = action.payload ?? null;
          })
          .addCase(sendData.pending, state => {
            state.sended = false;
            state.sending = true;
            state.error = null;
          })
          .addCase(sendData.fulfilled, (state, action) => {
            state.sending = false;
            state.sended = true;
            state.data?.push(action.payload);
            state.data?.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          })
          .addCase(sendData.rejected, (state, action) => {
            state.error = action.payload ?? null;
            state.sending = false;
          })
          .addCase(updateData.pending, state => {
            state.editing = true;
            state.error = null;
          })
          .addCase(updateData.fulfilled, (state, action) => {
            state.editing = false;
            state.edited = true;
            const index = state.data.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
              state.data[index] = action.payload;
            }
            state.data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          })
          .addCase(updateData.rejected, (state, action) => {
            state.error = action.payload ?? null;
            state.editing = false;
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
            state.error = action.payload ?? null;
          });
      },
    });

    export const { setSendedFalse, setEditedFalse, addCard } = dataSlice.actions;

export default dataSlice.reducer;
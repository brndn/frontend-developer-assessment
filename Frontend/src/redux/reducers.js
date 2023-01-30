import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addTodo, getAllTodos, updateSingleTodo } from '../api';

export const getAllTodosThunk = createAsyncThunk(
  'todo/getAll',
  async () => getAllTodos()
);

export const addTodoThunk = createAsyncThunk(
  'todo/add',
  async (data) => addTodo(data)
);
export const updateTodoThunk = createAsyncThunk(
  'todo/update',
  async (data) => updateSingleTodo(data)
);


const tourSlice = createSlice({
  name: 'todo',
  initialState: {
    todos: [],
    error: '',
    loading: false
  },
  reducers: {},
  extraReducers: {
    [getAllTodosThunk.pending]: (state, action) => {
      state.loading = true;
      state.error = '';
    },
    [getAllTodosThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = '';
      state.todos = action.payload;
    },
    [getAllTodosThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [addTodoThunk.pending]: (state, action) => {
      state.loading = true;
      state.error = '';
    },
    [addTodoThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = '';
      state.todos = [...state.todos, action.payload];
    },
    [addTodoThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [updateTodoThunk.pending]: (state, action) => {
      state.loading = true;
      state.error = '';
    },
    [updateTodoThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = '';
      const index = state.todos.findIndex((value) => action.payload.id === value.id);
      if(index !== -1){
        state.todos[index] = action.payload;
      }
      state.todos = [...state.todos];
    },
    [updateTodoThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    }
  }
});

export default tourSlice.reducer;
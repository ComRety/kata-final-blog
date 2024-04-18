import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const signUpPost = createAsyncThunk('signUp/signUpPost', async (body, { rejectWithValue }) => {
  try {
    const response = await fetch('https://blog.kata.academy/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const array = await response.json();
    if (!response.ok) {
      throw new Error(JSON.stringify(array.errors));
    }
    localStorage.setItem('user', JSON.stringify(array));
    return array;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const signLogin = createAsyncThunk('signUp/signLogin', async (body, { rejectWithValue }) => {
  try {
    const response = await fetch('https://blog.kata.academy/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const array = await response.json();
    if (!response.ok) {
      throw new Error(JSON.stringify(array.errors));
    }
    localStorage.setItem('user', JSON.stringify(array));
    return array;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateLogin = createAsyncThunk('signUp/updateLogin', async (body, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('user');
    const response = await fetch('https://blog.kata.academy/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${JSON.parse(token).user.token}`,
      },
      body: JSON.stringify(body),
    });
    const array = await response.json();
    if (!response.ok) {
      throw new Error(JSON.stringify(array.errors));
    }
    localStorage.setItem('user', JSON.stringify(array));
    return array;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const signUp = createSlice({
  name: 'signUp',
  initialState: {
    loadingStatus: null,
    error: null,
    token: null,
    username: null,
    email: null,
    bio: null,
    image: null,
  },
  reducers: {
    logOut(state) {
      const obj = Object.keys(state);
      obj.forEach((element) => {
        state[element] = null;
      });
      localStorage.clear();
    },
    localUser(state, action) {
      const users = JSON.parse(action.payload);
      state.username = users.user.username;
      state.token = users.user.token;
      state.email = users.user.email;
      state.image = users.user.image;
      state.bio = users.user.bio;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpPost.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(signUpPost.fulfilled, (state, action) => {
        state.username = action.payload.user.username;
        state.email = action.payload.user.email;
        state.token = action.payload.user.token;
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(signUpPost.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = JSON.parse(action.payload);
      })
      .addCase(signLogin.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(signLogin.fulfilled, (state, action) => {
        state.token = action.payload.user.token;
        state.email = action.payload.user.email;
        state.username = action.payload.user.username;
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(signLogin.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = JSON.parse(action.payload);
      })
      .addCase(updateLogin.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(updateLogin.fulfilled, (state, action) => {
        state.image = action.payload.user.image;
        state.image = action.payload.user.image;
        state.image = action.payload.user.image;
        state.image = action.payload.user.image;
        state.image = action.payload.user.image;
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(updateLogin.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = JSON.parse(action.payload);
      });
  },
});

export const { logOut, localUser } = signUp.actions;
export default signUp.reducer;

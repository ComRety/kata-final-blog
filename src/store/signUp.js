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
    localStorage.setItem('user', array.user.token);
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
    localStorage.setItem('user', array.user.token);
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
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    });
    const array = await response.json();
    if (!response.ok) {
      throw new Error(JSON.stringify(array.errors));
    }
    localStorage.setItem('user', array.user.token);
    return array;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getCurrentUser = createAsyncThunk('signUp/getCurrentUser', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('user');
    const response = await fetch('https://blog.kata.academy/api/user', {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const array = await response.json();
    if (!response.ok) {
      throw new Error(JSON.stringify(array.errors));
    }
    localStorage.setItem('user', array.user.token);
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
        state.email = action.payload.user.email;
        state.username = action.payload.user.username;
        state.bio = action.payload.user.bio;
        state.token = action.payload.user.token;
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(updateLogin.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = JSON.parse(action.payload);
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.email = action.payload.user.email;
        state.username = action.payload.user.username;
        state.token = action.payload.user.token;
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = JSON.parse(action.payload);
      });
  },
});

export const { logOut } = signUp.actions;
export default signUp.reducer;

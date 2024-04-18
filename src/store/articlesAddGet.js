import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const articlesAdd = createAsyncThunk('articles/articlesAdd', async (page, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${page === 1 ? 0 : page * 5}`);
    if (!response.ok) {
      throw new Error(response.status);
    }
    const array = await response.json();
    return array;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const articleCreate = createAsyncThunk('articles/articleCreate', async (body, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('user');
    const response = await fetch('https://blog.kata.academy/api/articles', {
      method: 'POST',
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
    return array;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const articles = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    loadingStatus: null,
    error: null,
    count: 0,
    page: 1,
  },
  reducers: {
    updatePage(state, action) {
      state.page = Number(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(articlesAdd.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(articlesAdd.fulfilled, (state, action) => {
        state.articles = action.payload.articles;
        state.count = Number(action.payload.articlesCount);
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(articlesAdd.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      })
      .addCase(articleCreate.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(articleCreate.fulfilled, (state) => {
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(articleCreate.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export const { updatePage } = articles.actions;
export default articles.reducer;

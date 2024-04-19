import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const articlesAdd = createAsyncThunk('articles/articlesAdd', async (page, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('user');
    if (token) {
      const response = await fetch(
        `https://blog.kata.academy/api/articles?limit=5&offset=${page === 1 ? 0 : page * 5}`,
        {
          headers: {
            Authorization: `Token ${JSON.parse(token).user.token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(response.status);
      }
      const array = await response.json();
      return array;
    }
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

export const deleteArticle = createAsyncThunk('articles/deleteArticle', async (slug, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('user');
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${JSON.parse(token).user.token}`,
      },
    });
    if (!response.ok) {
      throw new Error(response.status);
    }
    return null;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateArticle = createAsyncThunk('articles/updateArticle', async (body, { rejectWithValue }) => {
  try {
    const { obj, slug } = body;
    const token = localStorage.getItem('user');
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${JSON.parse(token).user.token}`,
      },
      body: JSON.stringify(obj),
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

export const likeArticle = createAsyncThunk('articles/likeArticle', async (slug, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('user');
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${JSON.parse(token).user.token}`,
      },
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

export const unLikeArticle = createAsyncThunk('articles/unLikeArticle', async (slug, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('user');
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${JSON.parse(token).user.token}`,
      },
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
      })
      .addCase(deleteArticle.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(deleteArticle.fulfilled, (state) => {
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      })
      .addCase(updateArticle.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(updateArticle.fulfilled, (state) => {
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      })
      .addCase(likeArticle.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(likeArticle.fulfilled, (state) => {
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(likeArticle.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      })
      .addCase(unLikeArticle.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(unLikeArticle.fulfilled, (state) => {
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(unLikeArticle.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export const { updatePage } = articles.actions;
export default articles.reducer;

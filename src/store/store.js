import { configureStore } from '@reduxjs/toolkit';

import articlesAddGet from './articlesAddGet';
import signUp from './signUp';

export default configureStore({
  reducer: {
    articles: articlesAddGet,
    signUp,
  },
});

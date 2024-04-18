import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './reset.css';
import './style.css';
import Articles from './main/articles/Articles';
import UnLogin from './UnLogin';
import OneArticle, { oneLoader } from './main/oneArticle/OneArticle';
import { articlesAdd } from './store/articlesAddGet';
import NewAccount from './main/newAccount/NewAccount';
import LoginAccount from './main/autoRization/LoginAccount';
import { localUser } from './store/signUp';
import FixUser from './main/fixUser/FixUser';
import NewArticle from './main/newArticle/NewArticle';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<UnLogin />}>
      <Route index element={<Articles />} />
      <Route path="articles" element={<Articles />} />
      <Route path="articles/:id" element={<OneArticle />} loader={oneLoader} />
      <Route path="sign-up" element={<NewAccount />} />
      <Route path="sign-in" element={<LoginAccount />} />
      <Route path="profile" element={<FixUser />} />
      <Route path="new-article" element={<NewArticle />} />
    </Route>
  )
);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      dispatch(localUser(loggedInUser));
    }
  }, []);

  useEffect(() => {
    dispatch(articlesAdd(1));
  }, []);
  return <RouterProvider router={router} />;
}

export default App;

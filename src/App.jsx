import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
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
import { getCurrentUser } from './store/signUp';
import FixUser from './main/fixUser/FixUser';
import NewArticle from './main/newArticle/NewArticle';
import EditArticlePost, { editArticle } from './main/newArticle/EditArticlePost';
import RequerAuto from './hoc/RequerAuto';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<UnLogin />}>
      <Route index element={<Articles />} />
      <Route path="articles" element={<Navigate to="/" replace />} />
      <Route path="articles/:id" element={<OneArticle />} loader={oneLoader} />
      <Route path="sign-up" element={<NewAccount />} />
      <Route path="sign-in" element={<LoginAccount />} />
      <Route path="profile" element={<FixUser />} />
      <Route
        path="new-article"
        element={
          <RequerAuto>
            <NewArticle />
          </RequerAuto>
        }
      />
      <Route
        path="/articles/:id/edit"
        element={
          <RequerAuto>
            <EditArticlePost />
          </RequerAuto>
        }
        loader={editArticle}
      />
    </Route>
  )
);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      dispatch(getCurrentUser());
    }
  }, []);

  useEffect(() => {
    console.log('баран тупой');
    console.log('yes');
    console.log('or no?');
    dispatch(articlesAdd(1));
  }, []);
  return <RouterProvider router={router} />;
}

export default App;

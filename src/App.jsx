import { Route, Routes } from 'react-router-dom';

import './reset.css';
import './style.css';
import Articles from './main/articles/Articles';
import UnLogin from './UnLogin';
import Login from './Login';
import OneArticle from './main/oneArticle/OneArticle';

function App() {
  return (
    <Routes>
      <Route path="/" element={<UnLogin />}>
        <Route index element={<Articles />} />
        <Route path="articles" element={<Articles />} />
        <Route path="articles/:id" element={<OneArticle />} />
      </Route>
      <Route path="/login" element={<Login />}>
        <Route index element={<Articles />} />
        <Route path="articles" element={<Articles />} />
        <Route path="articles/:id" element={<OneArticle />} />
      </Route>
    </Routes>
  );
}

export default App;

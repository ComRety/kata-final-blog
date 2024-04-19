import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { logOut } from '../store/signUp';
import { articlesAdd } from '../store/articlesAddGet';
import baseAvatar from '../image/Rectangle 1.png';

import clasess from './header.module.css';

export default function HeaderLogin() {
  const image = useSelector((state) => state.signUp.image);
  const username = useSelector((state) => state.signUp.username);
  const dispatch = useDispatch();
  const page = useSelector((state) => state.articles.page);

  const out = () => {
    dispatch(logOut());
    dispatch(articlesAdd(page));
  };

  return (
    <header className={clasess.header}>
      <Link to="/" className={clasess.titleBlog}>
        Realworld Blog
      </Link>
      <div className={clasess.block}>
        <Link to="/new-article" className={clasess.create}>
          Create article
        </Link>
        <Link to="/profile" className={clasess.fix}>
          <div>{username}</div>
          <div>
            <img alt="avatar" src={!image ? baseAvatar : image} height="46px" width="46px" />
          </div>
        </Link>
        <Link to="/" className={clasess.out} onClick={out}>
          Log Out
        </Link>
      </div>
    </header>
  );
}

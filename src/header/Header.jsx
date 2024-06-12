import { Link } from 'react-router-dom';

import clasess from './header.module.css';

export default function Header() {
  console.log('onetwo3');
  return (
    <header className={clasess.header}>
      <Link to="/" className={clasess.titleBlog}>
        Realworld Blog
      </Link>
      <div className={clasess.block}>
        <Link to="/sign-in" className={clasess.in}>
          Sign In
        </Link>
        <Link to="sign-up" className={clasess.up}>
          Sing Up
        </Link>
      </div>
    </header>
  );
}

import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from './header/Header';
import HeaderLogin from './header/HeaderLogin';
import Ret from './Ret';

export default function UnLogin() {
  const token = useSelector((state) => state.signUp.token);

  if (!token) {
    return (
      <>
        <Header />
        <Outlet />
      </>
    );
  }

  return (
    <>
      <Ret />
      <HeaderLogin />
      <Outlet />
    </>
  );
}

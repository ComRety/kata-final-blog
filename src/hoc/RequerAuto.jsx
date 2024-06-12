import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';

export default function RequerAuto({ children }) {
  const location = useLocation();
  const token = useSelector((state) => state.signUp.token);

  if (!token) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }
  console.log('меня скушали и удалили');
  return children;
}

import {Routes, Route, Navigate} from 'react-router-dom';
import LoginPage from '../modules/auth/pages/LoginPage';

export default function AuthRouter() {
  return (
    <Routes>
      <Route path="" element={<Navigate to={'/sign-in'} />} />
      <Route key="sign-in" path={'/sign-in'} element={<LoginPage />} />
    </Routes>
  );
}

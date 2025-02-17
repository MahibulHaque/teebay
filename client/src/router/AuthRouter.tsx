import {Routes, Route, Outlet, Navigate} from 'react-router-dom';
import LoginPage from '../modules/auth/pages/LoginPage';
import SignupPage from '@/modules/auth/pages/SignupPage';
import AuthLayout from '@/layouts/AuthLayout';
import NotFound from '@/components/notFound/NotFound';

export default function AuthRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthLayout>
            <Outlet />
          </AuthLayout>
        }>
        <Route index element={<Navigate to={'/signin'} replace />} />
        <Route key="signin" path={'/signin'} element={<LoginPage />} />
        <Route key="signup" path="/signup" element={<SignupPage />} />
      </Route>
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

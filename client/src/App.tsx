import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';
import useAuthInitializer from './core/hooks/useAuthInitializer';
import SignupPage from './modules/auth/pages/SignupPage';
import LoginPage from './modules/auth/pages/LoginPage';
import NotFound from './components/notFound/NotFound';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import BaseAppLayout from './layouts/BaseAppLayout';
import AllProductsPage from './modules/product-management/pages/AllProductsPage';

function App() {
  useAuthInitializer();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <BaseAppLayout>
                <Outlet />
              </BaseAppLayout>
            </ProtectedRoute>
          }>
          <Route index element={<Navigate to={'/all-products'} replace />} />
          <Route
            key={'products'}
            path="/all-products"
            element={<AllProductsPage />}
          />
        </Route>
        <Route key="signin" path={'/signin'} element={<LoginPage />} />
        <Route key="signup" path="/signup" element={<SignupPage />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

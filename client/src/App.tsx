import {BrowserRouter, Navigate, Outlet, Route, Routes} from 'react-router-dom';
import useAuthInitializer from './core/hooks/useAuthInitializer';
import SignupPage from './modules/auth/pages/SignupPage';
import LoginPage from './modules/auth/pages/LoginPage';
import NotFound from './components/notFound/NotFound';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import BaseAppLayout from './layouts/BaseAppLayout';
import AllProductsPage from './modules/product-management/pages/AllProductsPage';
import RedirectSignedInUser from './components/redirectRoute/RedirectSignedInUser';
import MyProductsPage from './modules/product-management/pages/MyProductsPage';
import ProductsDashboardPage from './modules/product-management/pages/ProductsDashboardPage';

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
          <Route
            key={'myProducts'}
            path="/my-products"
            element={<MyProductsPage />}
          />
          <Route
            key={'productDashboard'}
            path="/product-dashboard"
            element={<ProductsDashboardPage />}
          />
        </Route>
        <Route
          key="signin"
          path={'/signin'}
          element={
            <RedirectSignedInUser>
              <LoginPage />
            </RedirectSignedInUser>
          }
        />
        <Route
          key="signup"
          path="/signup"
          element={
            <RedirectSignedInUser>
              <SignupPage />
            </RedirectSignedInUser>
          }
        />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

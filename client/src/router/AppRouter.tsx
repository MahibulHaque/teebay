import NotFound from '@/components/notFound/NotFound';
import BaseAppLayout from '@/layouts/BaseAppLayout';
import AllProductsPage from '@/modules/product-management/pages/AllProductsPage';
import {Navigate, Outlet, Route, Routes} from 'react-router-dom';

export default function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <BaseAppLayout>
            <Outlet />
          </BaseAppLayout>
        }>
        <Route index element={<Navigate to={'/products'} replace />} />
        <Route
          key={'products'}
          path="/products"
          element={<AllProductsPage />}
        />
      </Route>
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

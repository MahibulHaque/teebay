import {selectIsUserAuthenticated} from '@/core/store/slices/auth.slice';
import {useAppSelector} from '@/core/store/store';
import React from 'react';
import {Navigate} from 'react-router';

export default function ProtectedRoute({
  children,
}: Readonly<{children: React.ReactNode}>) {
  const isUserAuthenticated = useAppSelector(selectIsUserAuthenticated);

  if (!isUserAuthenticated) {
    return <Navigate to="/signin" replace/>;
  }

  return children;
}

import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const skipRedirect = sessionStorage.getItem('skipRedirectPath') === 'true';
    if (!isAuthenticated && location.pathname !== '/login' && !skipRedirect) {
      sessionStorage.setItem('redirectPath', location.pathname);
    }
  }, [isAuthenticated, location.pathname]);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  console.log('ProtectedRoute isAuthenticated:', isAuthenticated);
  console.log('ProtectedRoute location:', location.pathname);
  console.log(
    'ProtectedRoute sessionStorage redirectPath:',
    sessionStorage.getItem('redirectPath'),
  );

  useEffect(() => {
    if (!isAuthenticated && location.pathname !== '/login') {
      sessionStorage.setItem('redirectPath', location.pathname);
    }
  }, [isAuthenticated, location.pathname]);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

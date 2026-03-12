import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  type: 'user' | 'admin';
}

export default function ProtectedRoute({ children, type }: ProtectedRouteProps) {
  const { user, admin, isLoadingUser } = useAuth();
  const location = useLocation();

  if (isLoadingUser) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafafa' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 48, height: 48, border: '3px solid #fce7f3', borderTopColor: '#f43f5e', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
          <p style={{ color: '#9ca3af', fontSize: 14 }}>Carregando...</p>
        </div>
      </div>
    );
  }

  if (type === 'user' && !user) {
    return <Navigate to="/entrar" state={{ from: location.pathname }} replace />;
  }

  if (type === 'admin' && !admin) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
}

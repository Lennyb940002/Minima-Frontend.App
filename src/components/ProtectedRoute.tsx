import { Navigate } from 'react-router-dom';
import { useAuth } from '../../App';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAuth?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    requireAuth = true
}) => {
    const { isAuthenticated, hasPaid, isLoading } = useAuth();

    if (isLoading) {
        return <div>Chargement...</div>;
    }

    if (requireAuth && !isAuthenticated) {
        return <Navigate to="/auth" replace />;
    }

    if (requireAuth && isAuthenticated && !hasPaid) {
        return <Navigate to="/subscription" replace />;
    }

    return <>{children}</>;
};

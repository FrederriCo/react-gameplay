import { Navigate, Outlet } from 'react-router-dom';

import { useAuthContext } from '../../context/AuthContext';

const PrivateGuard = () => {
    const { isAuthenticated } = useAuthContext();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />
}

export default PrivateGuard;
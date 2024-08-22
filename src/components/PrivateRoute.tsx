import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext'; // Asegúrate de que esta ruta sea correcta

interface PrivateRouteProps {
    element: React.ReactElement;
    path: string;
    allowedRoles?: string[]; // Opcional si no todas las rutas necesitan control de roles
}


const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, allowedRoles }) => {
    const { token, userRole } = useAuth(); // Suponiendo que también obtienes el rol del usuario

    if (!token) {
        // No hay token, redirige a login
        return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        // El rol del usuario no está permitido, redirige a acceso denegado o alguna otra página
        return <Navigate to="/access-denied" />;
    }

    // Token presente y rol permitido, renderiza el componente
    return element;
};

export default PrivateRoute;

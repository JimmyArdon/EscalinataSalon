// src/pages/Logout.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/Logout.css'; // Asegúrate de importar el archivo CSS

const Logout: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Aquí iría la lógica para cerrar sesión (si es necesario)
        // Por ejemplo, eliminar el token del localStorage o hacer una llamada a una API

        // Mostrar un mensaje de despedida y redirigir
        setTimeout(() => {
            navigate('/');
        }, 2000); // Esperar 2 segundos antes de redirigir
    };

    React.useEffect(() => {
        handleLogout();
    }, []);

    return (
        <div className="logout-container">
            <div className="logout-message">
                <h1>¡Hasta Pronto!</h1>
                <div className="spinner"></div>
            </div>
        </div>
    );
};

export default Logout;

import  { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Perfil = () => {
    useEffect(() => {
        document.title = "Perfil";
    }, []);

    interface User {
        nombre: string;
        correo: string;
        telefono: string;
        ultima: string;
    }

    const obtenerFechaHoraActual = (): string => {
        const fecha = new Date();
        return fecha.toLocaleString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        });
    };

    const ultimaSesion = localStorage.getItem('ultimaSesion') || obtenerFechaHoraActual();
    localStorage.setItem('ultimaSesion', obtenerFechaHoraActual());

    const [user] = useState<User>({
        nombre: 'Maria Mejia',
        correo: 'mamaria@gmail.com',
        telefono: '98756321',
        ultima: ultimaSesion,
    });

    return (
        <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-[#f5f5f5] to-[#e0e0e0] shadow-lg rounded-lg">
            <div className="flex items-center space-x-6">
                <img 
                    className="w-32 h-32 rounded-full object-cover" 
                    src="https://via.placeholder.com/150" 
                    alt="Perfil" 
                />
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">{user.nombre}</h1>
                    <p className="text-gray-500">{user.correo}</p>
                </div>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700">Información Personal</h2>
                    <p className="mt-4"><strong>Teléfono:</strong> {user.telefono}</p>
                    <p className="mt-2"><strong>Última vez conectado:</strong> {user.ultima}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700">Configuraciones de Cuenta</h2>
                    <NavLink
                        to={
                            location.pathname.includes('dashboard-admin')
                                ? "/dashboard-admin/cambiar-contrasena"
                                : location.pathname.includes('dashboard-recepcionista')
                                    ? "/dashboard-recepcionista/cambiar-contrasena"
                                    : "/dashboard-estilista/cambiar-contrasena"
                        }
                        className="block mt-4 w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-md text-center"
                    >
                        Cambiar Contraseña
                    </NavLink>
                </div>
            </div>
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-700">Otros Detalles</h2>
                <p className="mt-4">Puedes agregar otros detalles aquí.</p>
            </div>
        </div>
    );
};

export default Perfil;

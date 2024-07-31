import { useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { CiLogout, CiUser } from 'react-icons/ci';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { IoNotificationsOutline } from 'react-icons/io5';
import { LuLayoutDashboard } from 'react-icons/lu';
import { PiNut } from 'react-icons/pi';

export default function Header_login() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    return (
        <>
            <header className="px-4 lg:px-6 h-14 flex items-center text-primary-foreground" style={{ backgroundColor: '#6F5D44' }}>
                <a className="flex md:hidden items-center justify-center" href="/">
                    <span className="text-xs font-bold text-white ml-2">Salon Escalinata</span>
                </a>
                <nav className="ml-auto hidden md:flex gap-4 text-white">
                    <a href="/login" className="text-sm hover:underline">@Nombre Usuario</a>
                </nav>
                <button 
                    className="ml-auto md:hidden text-white focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </header>
            {isMenuOpen && (
                <nav className="md:hidden" style={{ backgroundColor: '#6F5D44' }}>
                    <a href="/perfil" className="px-4 py-2 text-sm text-white hover:underline flex items-center">
                        <CiUser className='mr-1' /> Perfil
                    </a>
                    <NavLink
                        to={
                            location.pathname.includes('dashboard-admin')
                            ? "/dashboard-admin/main"
                            : location.pathname.includes('dashboard-recepcionista')
                            ? "/dashboard-recepcionista/main"
                            : "/dashboard-estilista/main"
                        }
                        className="px-4 py-2 text-sm text-white hover:underline flex items-center"
                    >
                        <LuLayoutDashboard className='mr-1' /> Dashboard
                    </NavLink>
                    <a href="/calendario" className="px-4 py-2 text-sm text-white hover:underline flex items-center">
                        <FaRegCalendarAlt className='mr-1' /> Calendario
                    </a>
                    <a href="/notificaciones" className="px-4 py-2 text-sm text-white hover:underline flex items-center">
                        <IoNotificationsOutline className='mr-1' /> Notificaciones
                    </a>
                    <a href="/configuracion" className="px-4 py-2 text-sm text-white hover:underline flex items-center">
                        <PiNut className='mr-1' /> Configuración
                    </a>
                    <a href="/logout" className="px-4 py-2 text-sm text-white hover:underline flex items-center">
                        <CiLogout className='mr-1' /> Cerrar Sesión
                    </a>
                </nav>
            )}
        </>
    )
}

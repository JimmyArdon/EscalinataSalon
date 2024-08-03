import React from "react";
import { CiLogout, CiUser } from "react-icons/ci";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiNut } from "react-icons/pi";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <aside className="text-white h-screen w-44 hidden md:flex text-sm bottom-0 fixed" style={{ backgroundColor: '#6F5D44' }}>
      {/* Opciones de navegación */}
      <nav className="mt-5">
        <ul className="space-y-2">
          <a className="flex items-center justify-center" href="/">
            <span className="text-sm font-bold text-white ml-2">SALON ESCALINATA</span>
          </a>
          <li>
            <NavLink
              to="/perfil"
              className={({ isActive }) => `flex items-center py-3 px-6 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`}
            >
              <CiUser className="h-6 w-6 mr-2" />
              Perfil
            </NavLink>
          </li>
          <ul>
            {/* Ruta para el dashboard de coordinador */}
            {location.pathname.includes('dashboard-coordinador') && (
              <li>
                <NavLink
                  to="/dashboard-coordinador/main"
                  className={({ isActive }) => `flex items-center py-3 px-6 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`}
                >
                  <LuLayoutDashboard className="h-6 w-6 mr-2" />
                  Dashboard
                </NavLink>
              </li>
            )}

            {/* Ruta para el dashboard de estudiante */}
            {location.pathname.includes('dashboard-estudiante') && (
              <li>
                <NavLink
                  to="/dashboard-estudiante/main"
                  className={({ isActive }) => `flex items-center py-3 px-6 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`}
                >
                  <LuLayoutDashboard className="h-6 w-6 mr-2" />
                  Dashboard
                </NavLink>
              </li>
            )}

            {/* Ruta para el dashboard de VOAE */}
            {location.pathname.includes('dashboard-voae') && (
              <li>
                <NavLink
                  to="/dashboard-voae/main"
                  className={({ isActive }) => `flex items-center py-3 px-6 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`}
                >
                  <LuLayoutDashboard className="h-6 w-6 mr-2" />
                  Dashboard
                </NavLink>
              </li>
            )}
          </ul>
          <li>
            <NavLink
              to="/configuracion"
              className={({ isActive }) => `flex items-center py-3 px-6 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`}
            >
              <PiNut className="h-6 w-6 mr-2" />
              Configuración
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cerrar-sesion"
              className={({ isActive }) => `flex items-center py-3 px-6 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`}
            >
              <CiLogout className="h-6 w-6 mr-2" />
              Cerrar Sesión
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

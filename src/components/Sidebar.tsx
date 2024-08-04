import React from "react";
import { CiLogout, CiUser } from "react-icons/ci";
import { LuLayoutDashboard } from "react-icons/lu";
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
          {location.pathname.includes('dashboard-admin') && (
            <>
              <li>
                <NavLink
                  to="/dashboard-admin/main"
                  className={({ isActive }) => `flex items-center py-3 px-6 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`}
                >
                  <LuLayoutDashboard className="h-6 w-6 mr-2" />
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard-admin/perfil"
                  className={({ isActive }) => `flex items-center py-3 px-6 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`}
                >
                  <CiUser className="h-6 w-6 mr-2" />
                  Perfil
                </NavLink>
              </li>
            </>
          )}
          {location.pathname.includes('dashboard-recepcionista') && (
            <>
              <li>
                <NavLink
                  to="/dashboard-recepcionista/main"
                  className={({ isActive }) => `flex items-center py-3 px-6 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`}
                >
                  <LuLayoutDashboard className="h-6 w-6 mr-2" />
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard-recepcionista/perfil"
                  className={({ isActive }) => `flex items-center py-3 px-6 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`}
                >
                  <CiUser className="h-6 w-6 mr-2" />
                  Perfil
                </NavLink>
              </li>
            </>
          )}
          {location.pathname.includes('dashboard-estilista') && (
            <>
              <li>
                <NavLink
                  to="/dashboard-estilista/main"
                  className={({ isActive }) => `flex items-center py-3 px-6 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`}
                >
                  <LuLayoutDashboard className="h-6 w-6 mr-2" />
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard-estilista/perfil"
                  className={({ isActive }) => `flex items-center py-3 px-6 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`}
                >
                  <CiUser className="h-6 w-6 mr-2" />
                  Perfil
                </NavLink>
              </li>
            </>
          )}
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

import React, { useEffect } from "react";
import DashboardButton from "../../components/DashboardButton";
import { VscAccount, VscOutput, VscGear } from "react-icons/vsc";
import { FiUsers} from "react-icons/fi";
import { LiaCalendarWeekSolid } from "react-icons/lia";
import { TbReport } from "react-icons/tb";
import { BsShop } from "react-icons/bs";
import { MdInfoOutline } from "react-icons/md";
import { adminRoutes, AdminRouteKeys } from "../../api/routesConfig";

const DashboardAdmin: React.FC = () => {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  const getIconByTitle = (title: AdminRouteKeys) => {
    switch (title) {
      case "Gestión de Usuarios":
        return <VscAccount  size={32} />;
      case "Gestion de Inventarios":
        return <VscOutput size={32} />;
        case "Control de Ventas":
        return <BsShop  size={32} />;
      case "Gestión de Citas":
        return <LiaCalendarWeekSolid size={32} />;
      case "Gestión de Servicios":
        return <VscGear size={32} />;
      case "Gestión de Proveedores":
          return <FiUsers size={32} />;
      case "Reportes y Analisis":
          return <TbReport size={32} />;
      case "Información":
          return <MdInfoOutline  size={32} />;
      case "Promociones y Bonificaciones":
          return <TbReport size={32} />;
      default:
        return null;
       
    }
  };

  return (
    <div className=" h-full flex">
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Dashboard Administrador</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(Object.keys(adminRoutes) as AdminRouteKeys[]).map((title) => (
            <DashboardButton key={title} title={title} icon={getIconByTitle(title)} route={adminRoutes[title]} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;

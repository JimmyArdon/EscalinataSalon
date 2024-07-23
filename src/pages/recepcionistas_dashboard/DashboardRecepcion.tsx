import React, { useEffect } from "react";
import { VscOutput, VscGear } from "react-icons/vsc";
import { FiUsers} from "react-icons/fi";
import { LiaCalendarWeekSolid } from "react-icons/lia";
import { BsShop } from "react-icons/bs";
import DashboardButton from "../../components/DashboardButton";
import { recepcionistaRoutes, RecepcionistaRouteKeys } from "../../api/routesConfig";

const DashboardRecepcion: React.FC = () => {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  const getIconByTitle = (title: RecepcionistaRouteKeys) => {
    switch (title) {
      
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
     
      default:
        return null;
       
    }
  };

  return (
    <div className=" h-full flex">
      <div className="flex-1 p-2 ml-5 mr-5">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Dashboard Recepción</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.keys(recepcionistaRoutes).map((title) => (
            <DashboardButton
              key={title}
              title={title as RecepcionistaRouteKeys}
              icon={getIconByTitle(title as RecepcionistaRouteKeys)}
              route={recepcionistaRoutes[title as RecepcionistaRouteKeys]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardRecepcion;

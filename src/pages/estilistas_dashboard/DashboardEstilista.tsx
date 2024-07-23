import React, { useEffect } from "react";
import { LiaCalendarWeekSolid } from "react-icons/lia";
import DashboardButton from "../../components/DashboardButton";
import { estilistaRoutes , EstilistaRouteKeys} from "../../api/routesConfig";

const DashboardEstilista: React.FC = () => {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  const getIconByTitle = (title: EstilistaRouteKeys) => {
    switch (title) {
      
      
      case "Gestión de Citas":
        return <LiaCalendarWeekSolid size={32} />;
      
     
      default:
        return null;
       
    }
  };

  return (
    <div className=" h-full flex">
      <div className="flex-1 p-2 ml-5 mr-5">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Dashboard Estilista</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.keys(estilistaRoutes).map((title) => (
            <DashboardButton
              key={title}
              title={title as EstilistaRouteKeys}
              icon={getIconByTitle(title as EstilistaRouteKeys)}
              route={estilistaRoutes[title as EstilistaRouteKeys]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardEstilista;

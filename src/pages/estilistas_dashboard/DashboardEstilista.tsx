import React, { useEffect } from 'react';
import CitasProgramadas from '../../components/CitasProgramadas';
import Calendario from '../../components/Calendario';

const citas = [
  { cliente: "Juan Pérez", hora: "10:00 AM", servicio: "Manicura" , estilista: "Ana Gómez" },
  { cliente: "María López", hora: "11:00 AM", servicio: "Corte Pelo", estilista: "Carlos Díaz" },
  { cliente: "Luis Martínez", hora: "12:00 PM", servicio: "Nanoplastia", estilista: "Ana Gómez" },
  { cliente: "Andrea Pérez", hora: "01:00 PM", servicio: "Pedicura", estilista: "Ana Gómez" },
  { cliente: "Carlos Ruiz", hora: "02:00 PM", servicio: "Corte Pelo", estilista: "Carlos Díaz" },
];

const DashboardEstilista: React.FC = () => {
  useEffect(() => {
    document.title = "Dashboard Estilista";
  }, []);

  return (
    <div className="h-full flex flex-col md:flex-auto">
      <div className="flex-1 p-2 ml-5 mr-5">
        <div className="flex flex-col md:flex-auto gap-4">
          <Calendario />
          <CitasProgramadas citas={citas} />
         
        </div>
      </div>
    </div>
  );
};

export default DashboardEstilista;

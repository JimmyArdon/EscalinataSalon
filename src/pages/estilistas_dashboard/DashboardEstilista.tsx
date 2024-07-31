import React, { useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface Cita {
  cliente: string;
  hora: string;
  estilista: string;
}

const citas: Cita[] = [
  { cliente: "Juan Pérez", hora: "10:00 AM", estilista: "Ana Gómez" },
  { cliente: "María López", hora: "11:00 AM", estilista: "Carlos Díaz" },
  { cliente: "Luis Martínez", hora: "12:00 PM", estilista: "Ana Gómez" },
];

const DashboardEstilista: React.FC = () => {
  useEffect(() => {
    document.title = "Dashboard Estilista";
  }, []);

  return (
    <div className="h-full flex flex-col md:flex-row">
      <div className="flex-1 p-2 ml-5 mr-5">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 bg-white p-2 md:p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">Citas Programadas</h2>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2">Cliente</th>
                  <th className="py-2">Hora</th>
                  <th className="py-2">Estilista</th>
                </tr>
              </thead>
              <tbody>
                {citas.map((cita, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-2">{cita.cliente}</td>
                    <td className="py-2">{cita.hora}</td>
                    <td className="py-2">{cita.estilista}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex-1 bg-white p-2 md:p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">Calendario</h2>
            <Calendar
              className="react-calendar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardEstilista;

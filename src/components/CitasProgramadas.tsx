import React from 'react';

interface Cita {
  cliente: string;
  hora: string;
  servicio: string
  estilista: string;
 
}

interface CitasProgramadasProps {
  citas: Cita[];
}

const CitasProgramadas: React.FC<CitasProgramadasProps> = ({ citas }) => {
  return (
    <div className="bg-white p-2 md:p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-2xl font-bold mb-4">Citas Programadas</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Cliente</th>
            <th className="py-2">Hora</th>
            <th className='py-2'>Servicio</th>
            <th className="py-2">Estilista</th>
          </tr>
        </thead>
        <tbody>
          {citas.map((cita, index) => (
            <tr key={index} className="border-t">
              <td className="py-2">{cita.cliente}</td>
              <td className="py-2">{cita.hora}</td>
              <td className="py-2">{cita.estilista}</td>
              <td className="py-2">{cita.servicio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CitasProgramadas;

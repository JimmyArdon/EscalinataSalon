import React, { useState } from 'react';


interface Cita {
    cliente: string;
    hora: string;
    servicio: string;
    estilista: string;
}

interface CitasProgramadasProps {
    citas: Cita[];
}

const CitasProgramadas: React.FC<CitasProgramadasProps> = ({ citas }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const citasPerPage = 2;

    const indexOfLastCita = currentPage * citasPerPage;
    const indexOfFirstCita = indexOfLastCita - citasPerPage;
    const currentCitas = citas.slice(indexOfFirstCita, indexOfLastCita);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="citas-programadas">
            <h2 className="text-lg font-bold mb-4">Citas Programadas</h2>
            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Cliente</th>
                        <th className="py-2 px-4 border-b">Hora</th>
                        <th className="py-2 px-4 border-b">Servicio</th>
                        <th className="py-2 px-4 border-b">Estilista</th>
                    </tr>
                </thead>
                <tbody>
                    {currentCitas.map((cita, index) => (
                        <tr key={index}>
                            <td className="py-2 px-4 border-b">{cita.cliente}</td>
                            <td className="py-2 px-4 border-b">{cita.hora}</td>
                            <td className="py-2 px-4 border-b">{cita.servicio}</td>
                            <td className="py-2 px-4 border-b">{cita.estilista}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination mt-4">
                {[...Array(Math.ceil(citas.length / citasPerPage)).keys()].map((number) => (
                    <button
                        key={number + 1}
                        onClick={() => paginate(number + 1)}
                        className={`px-3 py-1 mr-1 ${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        {number + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CitasProgramadas;

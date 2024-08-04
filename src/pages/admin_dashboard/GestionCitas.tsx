import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import FiltroCitas from "../../components/FiltroCitas";
import Pagination from "../../components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

interface Appointment {
    id: number;
    cliente: string;
    fecha: Date;
    hora: string;
    servicio: string;
    estilista: string;
}

const GestionCitas: React.FC = () => {
    useEffect(() => {
        document.title = "Gestión de Citas - Salón de Belleza Escalinata";
    }, []);

    const initialAppointments: Appointment[] = [
        { id: 0, cliente: "Juan Pérez", fecha: new Date("2024-08-03"), hora: "10:00 AM", servicio: "Manicura", estilista: "Ana Gómez" },
        { id: 2, cliente: "María López", fecha: new Date("2024-08-04"), hora: "11:00 AM", servicio: "Corte Pelo", estilista: "Carlos Díaz" },
        { id: 3, cliente: "Luis Martínez", fecha: new Date("2024-08-05"), hora: "12:00 PM", servicio: "Nanoplastia", estilista: "Ana Gómez" },
        { id: 4, cliente: "Juan Pérez", fecha: new Date("2024-08-03"), hora: "10:00 AM", servicio: "Manicura", estilista: "Ana Gómez" },
        { id: 5, cliente: "María López", fecha: new Date("2024-08-04"), hora: "11:00 AM", servicio: "Corte Pelo", estilista: "Carlos Díaz" },
        { id: 6, cliente: "Luis Martínez", fecha: new Date("2024-08-05"), hora: "12:00 PM", servicio: "Nanoplastia", estilista: "Ana Gómez" },
        { id: 7, cliente: "Juan Pérez", fecha: new Date("2024-08-03"), hora: "10:00 AM", servicio: "Manicura", estilista: "Ana Gómez" },
        { id: 8, cliente: "María López", fecha: new Date("2024-08-04"), hora: "11:00 AM", servicio: "Corte Pelo", estilista: "Carlos Díaz" },
        { id: 9, cliente: "Luis Martínez", fecha: new Date("2024-08-05"), hora: "12:00 PM", servicio: "Nanoplastia", estilista: "Ana Gómez" },
        { id: 10, cliente: "Juan Pérez", fecha: new Date("2024-08-03"), hora: "10:00 AM", servicio: "Manicura", estilista: "Ana Gómez" },
        { id: 11, cliente: "María López", fecha: new Date("2024-08-04"), hora: "11:00 AM", servicio: "Corte Pelo", estilista: "Carlos Díaz" },
        { id: 12, cliente: "Luis Martínez", fecha: new Date("2024-08-05"), hora: "12:00 PM", servicio: "Nanoplastia", estilista: "Ana Gómez" },
        
    ];

    const [filteredAppointments, setFilteredAppointments] = useState(initialAppointments);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const paginatedAppointments = filteredAppointments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const aplicarFiltros = (nombre: string, fecha: string) => {
        const filtered = initialAppointments.filter(appointment => {
            const appointmentDate = appointment.fecha.toISOString().split('T')[0];
            return (
                appointment.cliente.toLowerCase().includes(nombre.toLowerCase()) &&
                appointmentDate.includes(fecha)
            );
        });

        setFilteredAppointments(filtered);
        setCurrentPage(1);
    };

    const handleDelete = (id: number) => {
        const updatedAppointments = filteredAppointments.filter(appointment => appointment.id !== id);
        setFilteredAppointments(updatedAppointments);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="block md:flex items-center justify-between mb-4 mt-2">
                <FiltroCitas aplicarFiltros={aplicarFiltros} />

                <NavLink to="/dashboard-admin/agregar-cita">
                    <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200 flex items-center">
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        Agregar Cita
                    </button>
                </NavLink>
                <NavLink to="/dashboard-admin/main">
                    <button className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200 flex items-center">
                        Salir
                    </button>
                </NavLink>
            </div>

            <div className="rounded-xl">
                <div className="overflow-x-auto">
                    <table className="border-collapse block md:table min-w-full table-auto bg-white border border-gray-200">
                        <thead className="block md:table-header-group">
                            <tr className="border text-sm border-gray-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative bg-[#CCC5B7] text-black">
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Cliente</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Fecha</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Hora</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Servicio</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Editar</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Borrar</th>
                            </tr>
                        </thead>
                        <tbody className="block md:table-row-group text-sm md:text-xs">
                            {paginatedAppointments.map((item,index) => (
                                <tr key={index} className="bg-[#CCC5B7] md:bg-white text-left md:text-center hover:bg-gray-200 transition-colors duration-200 border border-gray-500 md:border-none block md:table-row">
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Cliente:</span>{item.cliente}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Fecha:</span>{item.fecha.toLocaleDateString()}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Hora:</span>{item.hora}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Servicio:</span>{item.servicio}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <NavLink to={`/dashboard-admin/editar-cita/${index}`}>
                                            <FontAwesomeIcon icon={faEdit} className="text-blue-500 hover:text-blue-700 cursor-pointer" />
                                        </NavLink>
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            className="text-red-500 hover:text-red-700 cursor-pointer"
                                            onClick={() => handleDelete(item.id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default GestionCitas;

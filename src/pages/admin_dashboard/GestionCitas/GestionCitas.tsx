import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FiltroCitas from "../../../components/FiltroCitas";
import Pagination from "../../../components/Pagination";
import styled from "styled-components";
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Asegúrate de instalar react-icons

interface Appointment {
    id: number;
    cliente: string;
    fecha: Date;
    hora: string;
    servicio: string;
    estilista: string;
    estado: string;
}

const Container = styled.div`
  margin: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border: 1px solid #ddd;

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f4f4f4;
    font-weight: bold;
  }

  tr:hover {
    background-color: #f1f1f1;
  }
`;

const Title = styled.h3`
  color: #333;
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 10px;
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const GestionCitas: React.FC = () => {
    useEffect(() => {
        document.title = "Gestión de Citas - Salón de Belleza Escalinata";
    }, []);

    const initialAppointments: Appointment[] = [
        { id: 0, cliente: "Juan Pérez", fecha: new Date("2024-08-03"), hora: "10:00 AM", servicio: "Manicura", estilista: "Ana Gómez" , estado: "Pendiente"},
        { id: 2, cliente: "María López", fecha: new Date("2024-08-04"), hora: "11:00 AM", servicio: "Corte Pelo", estilista: "Carlos Díaz", estado: "Cancelada"},
        { id: 3, cliente: "Luis Martínez", fecha: new Date("2024-08-05"), hora: "12:00 PM", servicio: "Nanoplastia", estilista: "Ana Gómez", estado: "Realizada"},
        // Add more initial appointments here
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

    return (
        <Container>
            <div className="flex items-center justify-between mb-4">
                <FiltroCitas aplicarFiltros={aplicarFiltros} />
                <ButtonGroup>
                    <Link className="btn btn-outline-secondary w-40" to='agregar-cita'>+ Añadir </Link>
                </ButtonGroup>
            </div>

            <Title>Gestión de Citas</Title>
            
            <Table>
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Servicio</th>
                        <th>Estilista</th> 
                        <th>Estado Cita</th> 
                        <th>Acciones</th> 
                    </tr>
                </thead>
                <tbody>
                    {paginatedAppointments.map((item) => (
                        <tr key={item.id}>
                            <td>{item.cliente}</td>
                            <td>{item.fecha.toLocaleDateString()}</td>
                            <td>{item.hora}</td>
                            <td>{item.servicio}</td>
                            <td>{item.estilista}</td>
                            <td>{item.estado}</td>
                            <td>
                                <ActionsContainer>
                                    <Link to={`editar-cita/${item.id}`}><FaEdit color="#007bff" /></Link>
                                    <Link to={`borrar-cita/${item.id}`}><FaTrashAlt color="#dc3545" /></Link>
                                </ActionsContainer>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </Container>
    );
};

export default GestionCitas;

// GestionCitas.tsx (frontend)
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FiltroCitas from "../../components/FiltroCitas";
import Pagination from "../../components/Pagination";
import styled from "styled-components";
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';

interface Appointment {
    id: number;
    cliente: string;
    fecha: string;
    hora: string;
    servicio: string;
    usuario: string;
    estado_cita: string;
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


const ActionsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const GestionCitas: React.FC = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        document.title = "Gestión de Citas - Salón de Belleza Escalinata";

        const fetchAppointments = async () => {
            try {
                const response = await axios.get<Appointment[]>('http://localhost:4000/citas');
                console.log('Datos recibidos:', response.data);
                const data: Appointment[] = response.data.map(item => ({
                    ...item,
                    fecha: new Date(item.fecha).toISOString() // Ensure fecha is ISO string
                }));
                setAppointments(data);
                setFilteredAppointments(data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchAppointments();
    }, []);

    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const paginatedAppointments: Appointment[] = filteredAppointments.slice(
        (currentPage - 1) * itemsPerPage, 
        currentPage * itemsPerPage
    );

    const aplicarFiltros = (nombre: string, fecha: string) => {
        const filtered = appointments.filter(appointment => {
            const appointmentDate = new Date(appointment.fecha).toISOString().split('T')[0];
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
                    {paginatedAppointments.length > 0 ? (
                        paginatedAppointments.map(item => (
                            <tr key={item.id}>
                                <td>{item.cliente}</td>
                                <td>{new Date(item.fecha).toLocaleDateString()}</td>
                                <td>{item.hora}</td>
                                <td>{item.servicio}</td>
                                <td>{item.usuario}</td>
                                <td>{item.estado_cita}</td>
                                <td>
                                    <ActionsContainer>
                                        <Link to={`editar-cita/${item.id}`}><FaEdit color="#007bff" /></Link>
                                        <Link to={`borrar-cita/${item.id}`}><FaTrashAlt color="#dc3545" /></Link>
                                    </ActionsContainer>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7}>No hay citas disponibles</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </Container>
    );
};

export default GestionCitas;

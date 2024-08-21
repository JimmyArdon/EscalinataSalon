import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FiltroClientes from "../../../../components/FiltroClientes";
import Pagination from "../../../../components/Pagination";
import styled from "styled-components";
import { FaEdit } from 'react-icons/fa';
import axios from 'axios';

interface Cliente {
    Id: number; // Si el ID es un número
    Nombre: string;
    Rtn: string;
    Direccion: string;
    Numero_Telefono: string;
    Email: string;
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

const GestionClientes: React.FC = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [filteredClientes, setFilteredClientes] = useState<Cliente[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        document.title = "Gestión de Clientes - Salón de Belleza Escalinata";

        const fetchClientes = async () => {
            try {
                const response = await axios.get<Cliente[]>('http://localhost:4000/clientess');
                console.log('Datos de clientes:', response.data); // Añade esta línea para verificar los datos
                setClientes(response.data);
                setFilteredClientes(response.data);
            } catch (error) {
                console.error('Error fetching clientes:', error);
            }
        };
        

        fetchClientes();
    }, []);

    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredClientes.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const paginatedClientes: Cliente[] = filteredClientes.slice(
        (currentPage - 1) * itemsPerPage, 
        currentPage * itemsPerPage
    );

    const aplicarFiltros = (nombre: string) => {
        const filtered = clientes.filter(cliente => 
            cliente.Nombre.toLowerCase().includes(nombre.toLowerCase())
        );

        setFilteredClientes(filtered);
        setCurrentPage(1);
    };

    return (
        <Container>
            <div className="flex items-center justify-between mb-4">
                <FiltroClientes aplicarFiltros={aplicarFiltros} />
                <ButtonGroup>
                    <Link className="btn btn-outline-secondary w-40" to='agregar-cliente'>+ Añadir Cliente</Link>
                </ButtonGroup>
            </div>

            <Title>Gestión de Clientes</Title>
            
            <Table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>RTN</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Dirección</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedClientes.length > 0 ? (
                        paginatedClientes.map(cliente => {
                            const clienteId = cliente.Id; // Verifica que cliente.id no sea undefined
                            return (
                                <tr key={cliente.Id}>
                                    <td>{cliente.Nombre}</td>
                                    <td>{cliente.Rtn}</td>
                                    <td>{cliente.Email}</td>
                                    <td>{cliente.Numero_Telefono}</td>
                                    <td>{cliente.Direccion}</td>
                                    <td>
                                        <ActionsContainer>
                                            <Link to={`editar-cliente/${clienteId}`}><FaEdit color="#007bff" /></Link>
                                        </ActionsContainer>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={6}>No hay clientes disponibles</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </Container>
    );
};

export default GestionClientes;

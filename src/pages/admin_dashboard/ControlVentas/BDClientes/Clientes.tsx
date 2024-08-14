import React, { useEffect, useState } from "react";
import {  Link } from "react-router-dom";
import FiltroClientes from "../../../../components/FiltroClientes"; 
import Pagination from "../../../../components/Pagination";
import styled from "styled-components";

const ButtonGroup = styled.div`
    display: flex;
    gap: 10px;
`;

const GestionClientes: React.FC = () => {
    useEffect(() => {
        document.title = "Gestión de Clientes - Salón de Belleza Escalinata";
    }, []);

    const initialData = [
        { nombre: "Cliente 1", rtn: "12345678", dirección: "sps", email: "cliente1@example.com" },
        { nombre: "Cliente 2", rtn: "87654321", dirección: "src",  email: "cliente2@example.com" },
    ];

    const [filteredData, setFilteredData] = useState(initialData);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const aplicarFiltros = (nombre: string) => {
        const filtered = initialData.filter(item => {
            return item.nombre.includes(nombre);
        });

        setFilteredData(filtered);
        setCurrentPage(1);
    };

    return (
        <div className="container mx-auto p-4">
            <h3 className="text-body-secondary">Gestión de Clientes</h3>
            <div className="flex items-center justify-between mb-4">
                <ButtonGroup>
                    <Link className="btn btn-outline-secondary w-40" to="/dashboard-admin/control-ventas/gestion-clientes/agregar-cliente">
                        + Añadir Cliente
                    </Link>
                    <Link className="btn btn-outline-secondary w-40" to="/dashboard-admin/control-ventas/gestion-clientes/editar-cliente">
                        Editar Cliente
                    </Link>
                    <Link className="btn btn-outline-secondary w-40" to="/dashboard-admin/control-ventas/gestion-clientes/borrar-cliente">
                        Borrar Cliente
                    </Link>
                </ButtonGroup>
                <FiltroClientes aplicarFiltros={aplicarFiltros} />
            </div>

            <div className="rounded-xl bg-white shadow-md">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-[#CCC5B7] text-black">
                            <tr>
                                <th className="p-3 text-left text-sm font-semibold">Nombre</th>
                                <th className="p-3 text-left text-sm font-semibold">RTN</th>
                                <th className="p-3 text-left text-sm font-semibold">Dirección</th>
                                <th className="p-3 text-left text-sm font-semibold">Email</th>
                               
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {paginatedData.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-100 transition-colors duration-200">
                                    <td className="p-3 text-sm">{item.nombre}</td>
                                    <td className="p-3 text-sm">{item.dirección}</td>
                                    <td className="p-3 text-sm">{item.rtn}</td>
                                    <td className="p-3 text-sm">{item.email}</td>
                                   
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

export default GestionClientes;

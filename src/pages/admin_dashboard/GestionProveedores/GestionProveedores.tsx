import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import FiltroProveedores from "../../../components/FiltroProveedores";
import Pagination from "../../../components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";


const ButtonGroup = styled.div`
    display: flex;
    gap: 10px;
`;

const GestionProveedores: React.FC = () => {
    useEffect(() => {
        document.title = "Gestión de Proveedores - Salón de Belleza Escalinata";
    }, []);

    const initialData = [
        { idProveedor: "1", proveedor: "Proveedor 1", dirección: "sps", telefono: "12345678", email: "contacto1@example.com" },
        { idProveedor: "2" ,proveedor: "Proveedor 2", dirección: "src", telefono: "87654321", email: "contacto2@example.com" },
    ];

    const [filteredData, setFilteredData] = useState(initialData);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const aplicarFiltros = (proveedor: string) => {
        const filtered = initialData.filter(item => {
            return item.proveedor.includes(proveedor);
        });

        setFilteredData(filtered);
        setCurrentPage(1);
    };


    return (
        <div className="container mx-auto p-4">
             <h3 className="text-body-secondary">Gestión de Proveedores</h3>
            <div className="flex items-center justify-between mb-4">
                
                
                 <ButtonGroup>
                    <Link className="btn btn-outline-secondary w-40" to="/dashboard-admin/gestion-proveedores/agregar-proveedor">
                        + Añadir Proveedor
                    </Link>
                     <Link className="btn btn-outline-secondary w-40" to="/dashboard-admin/gestion-proveedores/editar-proveedor">
                        Editar Proveedor
                    </Link>
                    <Link className="btn btn-outline-secondary w-40" to="/dashboard-admin/gestion-proveedores/borrar-proveedor">
                        Borrar Proveedor
                    </Link>
                </ButtonGroup>
                <FiltroProveedores aplicarFiltros={aplicarFiltros} />
            </div>
            

            <div className="rounded-xl bg-white shadow-md">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-[#CCC5B7] text-black">
                            <tr>
                                <th className="p-3 text-left text-sm font-semibold">Proveedor</th>
                                <th className="p-3 text-left text-sm font-semibold">Dirección</th>
                                <th className="p-3 text-left text-sm font-semibold">Teléfono</th>
                                <th className="p-3 text-left text-sm font-semibold">Email</th>
                                <th className="p-3 text-left text-sm font-semibold">Productos</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {paginatedData.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-100 transition-colors duration-200">
                                    <td className="p-3 text-sm">{item.proveedor}</td>
                                    <td className="p-3 text-sm">{item.dirección}</td>
                                    <td className="p-3 text-sm">{item.telefono}</td>
                                    <td className="p-3 text-sm">{item.email}</td>
                                    <td className="p-3 text-sm">
                                        <NavLink to={`/dashboard-admin/gestion-proveedores/productos-proveedor/${item.idProveedor}`}>
                                            <FontAwesomeIcon icon={faBoxOpen} className="text-blue-500 hover:text-blue-700 cursor-pointer" />
                                        </NavLink>
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

export default GestionProveedores;

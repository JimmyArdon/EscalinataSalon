import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import FiltroProveedores from "../../../components/FiltroProveedores";
import Pagination from "../../../components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

interface Proveedor {
    id: string;
    Nombre: string;
    Direccion: string;
    Numero_Telefono: string;
    email: string;
}


const GestionProveedores: React.FC = () => {
    useEffect(() => {
        document.title = "Gestión de Proveedores - Salón de Belleza Escalinata";
    }, []);

    const [filteredData, setFilteredData] = useState<Proveedor[]>([]);
    const [initialData, setInitialData] = useState<Proveedor[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/proveedores');
                setInitialData(response.data);
                setFilteredData(response.data);
            } catch (error) {
                console.error('Error fetching proveedores:', error);
            }
        };

        fetchData();
    }, []);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const aplicarFiltros = (proveedor: string) => {
        const filtered = initialData.filter(item => {
            return item.Nombre.includes(proveedor);
        });

        setFilteredData(filtered);
        setCurrentPage(1);
    };

    return (
        <div className="container mx-auto p-4">
            <h3 className="text-body-secondary">Gestión de Proveedores</h3>
            <div className="flex items-center justify-between mb-4">

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
                                    <td className="p-3 text-sm">{item.Nombre}</td>
                                    <td className="p-3 text-sm">{item.Direccion}</td>
                                    <td className="p-3 text-sm">{item.Numero_Telefono}</td>
                                    <td className="p-3 text-sm">{item.email}</td>
                                    <td className="p-3 text-sm">
                                        <NavLink to={`/dashboard-recepcionista/gestion-proveedores/productos-proveedor/${item.id}`}>
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

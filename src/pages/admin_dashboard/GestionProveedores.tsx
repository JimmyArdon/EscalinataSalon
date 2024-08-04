import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import FiltroProveedores from "../../components/FiltroProveedores";
import Pagination from "../../components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faBoxOpen, faPlus } from "@fortawesome/free-solid-svg-icons";

const GestionProveedores: React.FC = () => {
    useEffect(() => {
        document.title = "Gestión de Proveedores - Salón de Belleza Escalinata";
    }, []);

    const initialData = [
        { proveedor: "Proveedor 1", dirección: "sps", telefono: "12345678", email: "contacto1@example.com" },
        { proveedor: "Proveedor 2", dirección: "src", telefono: "87654321", email: "contacto2@example.com" },
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

    const handleDelete = (index: number) => {
        const newData = [...filteredData];
        newData.splice(index, 1);
        setFilteredData(newData);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="block md:flex items-center justify-between mb-4 mt-2">
                <FiltroProveedores aplicarFiltros={aplicarFiltros} />
                
                <NavLink to="/dashboard-admin/agregar-proveedor">
                    <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200 flex items-center">
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        Agregar Proveedor
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
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Proveedor</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Dirección</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Teléfono</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Email</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Productos</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Editar</th>
                                <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell">Borrar</th>
                            </tr>
                        </thead>
                        <tbody className="block md:table-row-group text-sm md:text-xs">
                            {paginatedData.map((item, index) => (
                                <tr key={index} className="bg-[#CCC5B7] md:bg-white text-left md:text-center hover:bg-gray-200 transition-colors duration-200 border border-gray-500 md:border-none block md:table-row">
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Proveedor:</span>{item.proveedor}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Dirección:</span>{item.dirección}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Teléfono:</span>{item.telefono}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Email:</span>{item.email}
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <span className="inline-block w-1/3 md:hidden font-bold mr-4">Productos:</span>
                                        <NavLink to={`/dashboard-admin/productos-proveedor/${index}`}>
                                            <FontAwesomeIcon icon={faBoxOpen} className="text-blue-500 hover:text-blue-700 cursor-pointer" />
                                        </NavLink>
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <NavLink to={`/dashboard-admin/editar-proveedor/${index}`}>
                                            <FontAwesomeIcon icon={faEdit} className="text-blue-500 hover:text-blue-700 cursor-pointer" />
                                        </NavLink>
                                    </td>
                                    <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            className="text-red-500 hover:text-red-700 cursor-pointer"
                                            onClick={() => handleDelete(index)}
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

export default GestionProveedores;

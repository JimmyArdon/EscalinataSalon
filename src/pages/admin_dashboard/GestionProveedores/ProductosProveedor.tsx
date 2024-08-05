import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Pagination from '../../../components/Pagination'; 


interface Producto {
    nombre: string;
    descripcion: string;
    precio: number;
    linea: string;
}

const ProductosProveedor: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [productos, setProductos] = useState<Producto[]>([]);
    const [filteredData, setFilteredData] = useState<Producto[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchProductos = async () => {
            const data: Producto[] = [
                { nombre: "Producto 1", linea: "Línea 1", descripcion: "Descripción del producto 1", precio: 100 },
                { nombre: "Producto 2", linea: "Línea 2", descripcion: "Descripción del producto 2", precio: 200 },
                { nombre: "Producto 1", linea: "Línea 1", descripcion: "Descripción del producto 1", precio: 100 },
                { nombre: "Producto 2", linea: "Línea 2", descripcion: "Descripción del producto 2", precio: 200 },
                { nombre: "Producto 1", linea: "Línea 1", descripcion: "Descripción del producto 1", precio: 100 },
                { nombre: "Producto 2", linea: "Línea 2", descripcion: "Descripción del producto 2", precio: 200 },
                { nombre: "Producto 1", linea: "Línea 1", descripcion: "Descripción del producto 1", precio: 100 },
                { nombre: "Producto 2", linea: "Línea 2", descripcion: "Descripción del producto 2", precio: 200 },
                { nombre: "Producto 1", linea: "Línea 1", descripcion: "Descripción del producto 1", precio: 100 },
                { nombre: "Producto 2", linea: "Línea 2", descripcion: "Descripción del producto 2", precio: 200 },
                { nombre: "Producto 1", linea: "Línea 1", descripcion: "Descripción del producto 1", precio: 100 },
                { nombre: "Producto 2", linea: "Línea 2", descripcion: "Descripción del producto 2", precio: 200 },
                { nombre: "Producto 1", linea: "Línea 1", descripcion: "Descripción del producto 1", precio: 100 },
                { nombre: "Producto 2", linea: "Línea 2", descripcion: "Descripción del producto 2", precio: 200 },
                { nombre: "Producto 1", linea: "Línea 1", descripcion: "Descripción del producto 1", precio: 100 },
                { nombre: "Producto 2", linea: "Línea 2", descripcion: "Descripción del producto 2", precio: 200 },
                { nombre: "Producto 1", linea: "Línea 1", descripcion: "Descripción del producto 1", precio: 100 },
                { nombre: "Producto 2", linea: "Línea 2", descripcion: "Descripción del producto 2", precio: 200 },
               
                
            ];
            setProductos(data);
            setFilteredData(data);
        };

        fetchProductos();
    }, [id]);

    useEffect(() => {
        setFilteredData(productos);
        setCurrentPage(1); 
    }, [productos]);


    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Productos del Proveedor {id}</h1>
            
            <button 
                onClick={() => navigate('/dashboard-admin/gestion-proveedores')} 
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200 mb-4"
            >
                Salir
            </button>

            <div className="rounded-xl overflow-x-auto">
                <table className="border-collapse min-w-full table-auto bg-white border border-gray-200">
                    <thead className="bg-[#CCC5B7] text-black">
                        <tr>
                            <th className="p-2 font-bold border border-gray-500">Nombre</th>
                            <th className="p-2 font-bold border border-gray-500">Línea</th>
                            <th className="p-2 font-bold border border-gray-500">Descripción</th>
                            <th className="p-2 font-bold border border-gray-500">Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((producto, index) => (
                            <tr key={index} className="bg-white hover:bg-gray-200 transition-colors duration-200">
                                <td className="p-2 border border-gray-500">{producto.nombre}</td>
                                <td className="p-2 border border-gray-500">{producto.linea}</td>
                                <td className="p-2 border border-gray-500">{producto.descripcion}</td>
                                <td className="p-2 border border-gray-500">{producto.precio}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
            />
        </div>
    );
};

export default ProductosProveedor;

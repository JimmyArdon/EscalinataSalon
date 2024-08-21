import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Pagination from '../../../components/Pagination'; 
import axios from 'axios';

interface Producto {
    Nombre: string;
    Marca_id: number;
    Marca: string;
    Descripcion: string | null;
    Precio: number;
}


const ProductosProveedor: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [productos, setProductos] = useState<Producto[]>([]);
    const [filteredData, setFilteredData] = useState<Producto[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/productos-proveedor/${id}`);
                console.log('Fetched Products:', response.data); // Verifica los datos

                // Ajusta si los datos están anidados
                const productosData = Array.isArray(response.data) ? response.data : response.data.productos || [];

                if (Array.isArray(productosData)) {
                    setProductos(productosData);
                    setFilteredData(productosData);
                } else {
                    console.error('Datos recibidos no son un array:', productosData);
                    setError('Error en el formato de los datos');
                }

                setLoading(false);
            } catch (err) {
                console.error('Error al obtener productos:', err);
                setError('Error al obtener productos');
                setLoading(false);
            }
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
            <h1 className="text-xl font-bold mb-4">Productos del Proveedor</h1>
            
            <button 
                onClick={() => navigate('/dashboard-admin/gestion-proveedores')} 
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200 mb-4"
            >
                Salir
            </button>

            {loading && <p>Cargando productos...</p>}
            {error && <p className="text-red-500">{error}</p>}
            
            {!loading && !error && (
                <>
                    <div className="rounded-xl overflow-x-auto">
                        <table className="border-collapse min-w-full table-auto bg-white border border-gray-200">
                            <thead className="bg-[#CCC5B7] text-black">
                                <tr>
                                    <th className="p-2 font-bold border border-gray-500">Nombre</th>
                                    <th className="p-2 font-bold border border-gray-500">Marca</th>
                                    <th className="p-2 font-bold border border-gray-500">Descripción</th>
                                    <th className="p-2 font-bold border border-gray-500">Precio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.length > 0 ? (
                                    paginatedData.map((producto, index) => (
                                        <tr key={index} className="bg-white hover:bg-gray-200 transition-colors duration-200">
                                            <td className="p-2 border border-gray-500">{producto.Nombre}</td>
                                            <td className="p-2 border border-gray-500">{producto.Marca}</td>
                                            <td className="p-2 border border-gray-500">{producto.Descripcion || 'N/A'}</td>
                                            <td className="p-2 border border-gray-500">{producto.Precio}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="p-2 text-center">No hay productos disponibles</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <Pagination 
                        currentPage={currentPage} 
                        totalPages={totalPages} 
                        onPageChange={handlePageChange} 
                    />
                </>
            )}
        </div>
    );
};

export default ProductosProveedor;

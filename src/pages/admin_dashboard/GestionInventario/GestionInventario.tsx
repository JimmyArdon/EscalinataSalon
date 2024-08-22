import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import FiltroCitas from '../../../components/FiltroInventario';
import Pagination from '../../../components/Pagination';

interface Producto {
    Id: number;
    Nombre: string;
    Proveedor_id: number;
    Marca_id: number;
    Cantidad_stock: number;
    Precio: number;
    ISV: number;
    Precio_venta: number;
}
interface Opcion {
    id: number;
    descripcion: string;
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

const GestionInventario: React.FC = () => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [marca, setMarcas] = useState<Opcion[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Producto[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState<string | null>(null);

    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    useEffect(() => {
        // Obtener productos
        fetch('http://localhost:4000/productos')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los productos');
                }
                return response.json();
            })
            .then(data => {
                setProductos(data);
                setFilteredProducts(data);
            })
            .catch(error => {
                setError(error.message);
            });

        // Obtener proveedores
        fetch('http://localhost:4000/proveedores')
            .then(response => response.json())
            .catch(error => console.error('Error al cargar los proveedores:', error));

        // Obtener marcas
        fetch('http://localhost:4000/marcas')
            .then(response => response.json())
            .then(data => setMarcas(data))
            .catch(error => console.error('Error al cargar las marcas:', error));
    }, []);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const aplicarFiltros = (nombre: string) => {
        const filtered = productos.filter(producto =>
            producto.Nombre.toLowerCase().includes(nombre.toLowerCase())
        );
        setFilteredProducts(filtered);
        setCurrentPage(1);
    };

    const obtenerNombre = (id: number, opciones: Opcion[]) => {
        const opcion = opciones.find(op => op.id === id);
        return opcion ? opcion.descripcion : 'Desconocido';
    };

    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Container>
            <div className="flex items-center justify-between mb-4">
                <FiltroCitas aplicarFiltros={aplicarFiltros} />
                <div>
                    <ButtonGroup>
                        <Link className="btn btn-outline-secondary w-40" to='agregar-producto'>+ Añadir </Link>
                        <Link className="btn btn-outline-secondary w-40" to='editar-producto'>Editar</Link>
                        <Link className="btn btn-outline-secondary w-40" to='borrar-producto'>Borrar</Link>
                    </ButtonGroup>
                </div>
            </div>

            <Title>Inventario de Productos</Title>

            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Marca</th>
                        <th>Cantidad en Stock</th>
                        <th>Precio</th>
                        <th>ISV</th>
                        <th>Precio de Venta</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedProducts.length === 0 ? (
                        <tr>
                            <td colSpan={8} style={{ textAlign: 'center' }}>No hay productos en el inventario.</td>
                        </tr>
                    ) : (
                        paginatedProducts.map(producto => (
                            <tr key={producto.Id}>
                                <td>{producto.Id}</td>
                                <td>{producto.Nombre}</td><td>{obtenerNombre(producto.Marca_id, marca)}</td>
                                <td>{producto.Cantidad_stock}</td>
                                <td>{producto.Precio}</td>
                                <td>{producto.ISV}</td>
                                <td>{producto.Precio_venta}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </Container>
    );
};

export default GestionInventario;

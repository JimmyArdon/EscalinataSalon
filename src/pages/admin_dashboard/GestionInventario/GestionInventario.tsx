import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FiltroCitas from "../../../components/FiltroInventario";
import Pagination from "../../../components/Pagination";
import styled from "styled-components";

interface Product {
    id: number;
    marca: string;
    codigoBarras: number;
    nombreProducto: string;
    descripcion: string;
    precioCompra: number;
    precioVenta: number;
    impuesto: number;
    stock: number;
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
    useEffect(() => {
        document.title = "Gestión de Inventario - Salón de Belleza Escalinata";
    }, []);

    const initialProducts: Product[] = [
        {
            id: 0,
            marca: "L'Oréal",
            codigoBarras: 101223344,
            nombreProducto: "Shampoo Revitalizante",
            descripcion: "Shampoo para cabello dañado con vitamina E",
            precioCompra: 15.00,
            precioVenta: 25.00,
            impuesto: 0.15,
            stock: 12
        },
        {
            id: 1,
            marca: "Dove",
            codigoBarras: 123345344,
            nombreProducto: "Jabón Nutritivo",
            descripcion: "Jabón en barra con crema humectante",
            precioCompra: 1.50,
            precioVenta: 3.00,
            impuesto: 0.15,
            stock: 24
        },
        {
            id: 2,
            marca: "Pantene",
            codigoBarras: 223845374,
            nombreProducto: "Acondicionador Suave",
            descripcion: "Acondicionador para cabello liso y manejable",
            precioCompra: 12.00,
            precioVenta: 20.00,
            impuesto: 0.15,
            stock: 8
        },
    ];

    const [filteredProducts, setFilteredProducts] = useState(initialProducts);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const aplicarFiltros = (nombre: string) => {
        const filtered = initialProducts.filter(product => {
            return product.nombreProducto.toLowerCase().includes(nombre.toLowerCase());
        });
    
        setFilteredProducts(filtered);
        setCurrentPage(1);
    };

    return (
        <Container>
            <div className="flex items-center justify-between mb-4">
                <FiltroCitas aplicarFiltros={aplicarFiltros} />
                <div>
                    <ButtonGroup>
                        <Link className="btn btn-outline-secondary w-40" to='agregar-producto'>+ Añadir </Link>
                        <Link className="btn btn-outline-secondary w-40" to='editar-producto'>Editar</Link>
                        <Link className="btn btn-outline-secondary w-40" to='borrar-producto' >Borrar </Link>
                    </ButtonGroup>
                </div>
            </div>

            <Title>Gestión de Inventario</Title>

            <Table>
                <thead>
                    <tr>
                        <th>Marca</th>
                        <th>Codigo de Barras</th>
                        <th>Nombre de producto</th>
                        <th>Descripcion</th>
                        <th>Precio de compra</th>
                        <th>Precio de venta</th>
                        <th>Impuesto</th>
                        <th>Cantidad en Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedProducts.map((item) => (
                        <tr key={item.id}>
                            <td>{item.marca}</td>
                            <td>{item.codigoBarras.toFixed(0)}</td>
                            <td>{item.nombreProducto}</td>
                            <td>{item.descripcion}</td>
                            <td style={{textAlign: 'center'}}>L. {item.precioCompra.toFixed(2)}</td>
                            <td style={{textAlign: 'center'}}>L. {item.precioVenta.toFixed(2)}</td>
                            <td style={{textAlign: 'center'}}>{(item.impuesto * 100).toFixed(2)}%</td>
                            <td style={{textAlign: 'center'}}>{item.stock.toFixed(0)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </Container>
    );
};

export default GestionInventario;

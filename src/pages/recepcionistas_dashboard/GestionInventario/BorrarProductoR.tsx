import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import styled from 'styled-components';
import FiltroCitas from '../../../components/FiltroInventario';
import { IoMdCloseCircleOutline } from 'react-icons/io'; // Importar el ícono

const Container = styled.div`
  margin: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative; // Asegura que el ícono de salir se posicione correctamente
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  border: none;
  background-color: #dc3545;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

const ClearButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  border: none;
  background-color: #6c757d;
  color: white;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #5a6268;
  }
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

const Message = styled.div`
  margin-top: 20px;
  font-size: 16px;
`;

const Salir = styled(IoMdCloseCircleOutline)`
  width: 50px;
  height: 50px;
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    width: 60px;
    height: 60px;
    color: #8b4513;
  }
`;

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

const BorrarProducto: React.FC = () => {
  const navigate = useNavigate(); // Inicializar useNavigate
  const [productos, setProductos] = useState<Producto[]>([]);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const aplicarFiltros = (nombre: string) => {
    if (!nombre) {
      setError(null);
      setMensaje(null);
      setProductos([]);
      return;
    }

    fetch(`http://localhost:4000/nameProductos?Nombre=${encodeURIComponent(nombre)}`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProductos(data);
          setError(null);
          setMensaje(null);
        } else {
          setError('No se encontraron productos');
          setMensaje(null);
        }
      })
      .catch(error => {
        console.error('Error al buscar productos:', error);
        setError('Error al buscar productos');
        setMensaje(null);
      });
  };

  const handleBorrarProducto = (id: number) => {
    const confirmar = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (!confirmar) {
      return;
    }

    fetch('http://localhost:4000/nameProductos', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Id: id }),  // Enviar el ID del producto
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
          setMensaje(null);
        } else {
          setMensaje(data.message);
          setError(null);
          setProductos(productos.filter(producto => producto.Id !== id));
        }
      })
      .catch(error => {
        console.error('Error al eliminar producto:', error);
        setError('Error al eliminar producto');
        setMensaje(null);
      });
  };

  return (
    <Container>
      <Salir onClick={() => navigate('/dashboard-admin/inventario')} />
      <h3>Borrar Producto</h3>
      <FiltroCitas aplicarFiltros={aplicarFiltros} />

      {mensaje && <Message style={{ color: 'green' }}>{mensaje}</Message>}
      {error && <Message style={{ color: 'red' }}>{error}</Message>}

      {productos.length > 0 && (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>ID Proveedor</th>
              <th>ID Marca</th>
              <th>Cantidad en Stock</th>
              <th>Precio</th>
              <th>ISV</th>
              <th>Precio de Venta</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(producto => (
              <tr key={producto.Id}>
                <td>{producto.Id}</td>
                <td>{producto.Nombre}</td>
                <td>{producto.Proveedor_id}</td>
                <td>{producto.Marca_id}</td>
                <td>{producto.Cantidad_stock}</td>
                <td>{producto.Precio}</td>
                <td>{producto.ISV}</td>
                <td>{producto.Precio_venta}</td>
                <td>
                  <Button onClick={() => handleBorrarProducto(producto.Id)}>Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <ClearButton type="button" onClick={() => navigate('/dashboard-admin/inventario')}>
        Salir
      </ClearButton>
    </Container>
  );
};

export default BorrarProducto;

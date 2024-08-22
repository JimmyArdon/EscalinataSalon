import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const Container = styled.div`
  margin: 40px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  background-color: #d9d9d9;
  padding: 40px 0;
  border-radius: 10px;
  position: relative;
  height: 100%;
  box-sizing: border-box;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  position: relative;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const ClearButton = styled(Button)`
  margin-left: 15px;
  background-color: #f44336;
  &:hover {
    background-color: #d32f2f;
  }
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

const AgregarProducto: React.FC = () => {
  const navigate = useNavigate(); // Hook para navegar

  const [producto, setProducto] = useState<Producto>({
    Nombre: '',
    Proveedor_id: 0,
    Marca_id: 0,
    Cantidad_stock: 0,
    Precio: 0,
    ISV: 0,
    Precio_venta: 0,
  });

  const [proveedores, setProveedores] = useState<Opcion[]>([]);
  const [marcas, setMarcas] = useState<Opcion[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/proveedores')
      .then((response) => response.json())
      .then((data) => setProveedores(data))
      .catch((error) => console.error('Error al cargar los proveedores:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:4000/marcas')
      .then((response) => response.json())
      .then((data) => setMarcas(data))
      .catch((error) => console.error('Error al cargar las marcas:', error));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProducto({
      ...producto,
      [name]: name === 'Proveedor_id' || name === 'Marca_id' || name === 'Cantidad_stock' || name === 'Precio' || name === 'ISV' || name === 'Precio_venta' ? parseFloat(value) : value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('http://localhost:4000/productos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(producto),
    });

    if (response.ok) {
      alert('Producto agregado exitosamente');
      setProducto({
        Nombre: '',
        Proveedor_id: 0,
        Marca_id: 0,
        Cantidad_stock: 0,
        Precio: 0,
        ISV: 0,
        Precio_venta: 0,
      });
      navigate('/dashboard-admin/inventario'); // Navega a la ruta deseada después de agregar
    } else {
      alert('Error al agregar el producto');
    }
  };

  return (
    <Container>
      <Salir onClick={() => navigate('/dashboard-admin/inventario')} /> 
      <h2>Agregar Producto</h2>
      <form onSubmit={handleSubmit} className="bg-slate-500 p-10 rounded-[15px] w-2/4">
        <FormGroup>
          <Label>Nombre del Producto:</Label>
          <Input type="text" name="Nombre" value={producto.Nombre} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
        <Label>Proveedor:</Label>
          <Select name="Proveedor_id" value={producto.Proveedor_id} onChange={handleChange} required>
            <option value="">Selecciona un proveedor</option>
            {proveedores.map((proveedor) => (
              <option key={proveedor.id} value={proveedor.id}>
                {proveedor.descripcion}
              </option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Marca:</Label>
          <Select name="Marca_id" value={producto.Marca_id} onChange={handleChange} required>
            <option value="">Selecciona una marca</option>
            {marcas.map((marca) => (
              <option key={marca.id} value={marca.id}>
                {marca.descripcion}
              </option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
        <Label>Cantidad en Stock:</Label>
        <Input type="number" name="Cantidad_stock" value={producto.Cantidad_stock} onChange={handleChange} required /></FormGroup>
        <FormGroup>
        <Label>Precio:</Label>
        <Input type="number" name="Precio" value={producto.Precio} onChange={handleChange} required /> </FormGroup>
        <FormGroup>
        <Label>ISV (%):</Label>
        <Input type="number" name="ISV" value={producto.ISV} onChange={handleChange} required /></FormGroup>
        <FormGroup>
          <Label>Precio de Venta:</Label>
          <Input type="number" name="Precio_venta" value={producto.Precio_venta} onChange={handleChange} required />
        </FormGroup>
        <Button type="submit">Agregar Producto</Button>
        <ClearButton type="button" onClick={() => navigate('/dashboard-admin/inventario')}>
          Cancelar
        </ClearButton>
      </form>
    </Container>
  );
};

export default AgregarProducto;

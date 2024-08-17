import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoMdCloseCircleOutline } from "react-icons/io";
import axios from "axios";

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
  id: string;
  nombreProducto: string;
  marca: string;
  // Otros campos que necesites
}

const EditarProducto = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);

  useEffect(() => {
    axios.get("https://your-mockapi-url.mockapi.io/api/v1/productos")
      .then((response) => {
        setProductos(response.data);
      });
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredProductos = productos.filter((producto) =>
    producto.nombreProducto.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectProduct = (producto: Producto) => {
    setSelectedProduct(producto);
  };

  const manejarOnClickSalir = () => {
    navigate("/dashboard-admin/inventario");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const productoActualizado = {
      
    };

    axios.put(`https://your-mockapi-url.mockapi.io/api/v1/productos/${selectedProduct.id}`, productoActualizado)
      .then(() => {
        navigate("/dashboard-admin/inventario");
      });
  };

  return (
    <Container>
      <Salir onClick={manejarOnClickSalir} />
      <h2>Buscar Producto para Editar</h2>
      <Input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Buscar producto por nombre"
      />
      <ul>
        {filteredProductos.map((producto) => (
          <li key={producto.id} onClick={() => handleSelectProduct(producto)}>
            {producto.nombreProducto}
          </li>
        ))}
      </ul>

      {selectedProduct && (
        <>
          <h2>Editar Producto</h2>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Nombre del Producto</Label>
              <Input
                type="text"
                value={selectedProduct.nombreProducto}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, nombreProducto: e.target.value })}
                placeholder="Nombre del producto"
                required
              />
            </FormGroup>
            <Button type="submit">Guardar Cambios</Button>
            <ClearButton type="button" onClick={manejarOnClickSalir}>
              Cancelar
            </ClearButton>
          </form>
        </>
      )}
    </Container>
  );
};

export default EditarProducto;

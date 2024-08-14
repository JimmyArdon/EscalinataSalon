import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

const EditarProducto = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [marca, setMarca] = useState("");
  const [nombreProducto, setNombreProducto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precioCompra, setPrecioCompra] = useState("");
  const [precioVenta, setPrecioVenta] = useState("");
  const [impuesto, setImpuesto] = useState("");

  useEffect(() => {
    axios.get(`https://example.com/api/productos/${id}`)
      .then((response) => {
        const producto = response.data;
        setMarca(producto.marca);
        setNombreProducto(producto.nombreProducto);
        setDescripcion(producto.descripcion);
        setPrecioCompra(producto.precioCompra);
        setPrecioVenta(producto.precioVenta);
        setImpuesto(producto.impuesto);
      });
  }, [id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const productoActualizado = {
      marca,
      nombreProducto,
      descripcion,
      precioCompra: parseFloat(precioCompra),
      precioVenta: parseFloat(precioVenta),
      impuesto: parseFloat(impuesto)
    };
    axios.put(`https://example.com/api/productos/${id}`, productoActualizado)
      .then(() => {
        navigate("/dashboard-admin/inventario");
      });
  };

  const manejarOnClickSalir = () => {
    navigate("/dashboard-admin/inventario");
  };

  return (
    <Container>
      <Salir onClick={manejarOnClickSalir} />
      <h2>Editar Producto</h2>
      <form onSubmit={handleSubmit} className="bg-slate-500 p-10 rounded-[15px] w-2/4">
        <FormGroup>
          <Label>Marca</Label>
          <Input
            type="text"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            placeholder="Marca del producto"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Nombre del Producto</Label>
          <Input
            type="text"
            value={nombreProducto}
            onChange={(e) => setNombreProducto(e.target.value)}
            placeholder="Nombre del producto"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Descripción</Label>
          <Input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Descripción del producto"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Precio de Compra</Label>
          <Input
            type="number"
            step="0.01"
            value={precioCompra}
            onChange={(e) => setPrecioCompra(e.target.value)}
            placeholder="Precio de compra"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Precio de Venta</Label>
          <Input
            type="number"
            step="0.01"
            value={precioVenta}
            onChange={(e) => setPrecioVenta(e.target.value)}
            placeholder="Precio de venta"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Impuesto (%)</Label>
          <Input
            type="number"
            step="0.01"
            value={impuesto}
            onChange={(e) => setImpuesto(e.target.value)}
            placeholder="Impuesto en porcentaje"
            required
          />
        </FormGroup>
        <Button type="submit">Guardar Cambios</Button>
        <ClearButton type="button" onClick={manejarOnClickSalir}>
          Cancelar
        </ClearButton>
      </form>
    </Container>
  );
};

export default EditarProducto;

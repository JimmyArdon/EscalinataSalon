import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
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

const EditarPromocion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [promocion, setPromocion] = useState({
    descripcion: "",
    precio: "",
    descuento: ""
  });

  useEffect(() => {
    axios.get(`https://66972cf402f3150fb66cd356.mockapi.io/api/v1/tarifasPromociones/${id}`)
      .then((response) => {
        setPromocion(response.data);
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromocion({
      ...promocion,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.put(`https://66972cf402f3150fb66cd356.mockapi.io/api/v1/tarifasPromociones/${id}`, promocion)
      .then(() => {
        navigate('/dashboard-admin/gestion-de-servicios');
      });
  };

  return (
    <Container>
      <h2>Editar Promoción</h2>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Descripción</Label>
          <Input
            type="text"
            name="descripcion"
            value={promocion.descripcion}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Descuento</Label>
          <Input
            type="number"
            name="descuento"
            value={promocion.descuento}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Precio</Label>
          <Input
            type="number"
            name="precio"
            value={promocion.precio}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <Button type="submit">Guardar Cambios</Button>
      </form>
    </Container>
  );
};

export default EditarPromocion;

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

const EditarServicio = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [servicio, setServicio] = useState({
    nombre: "",
    duracion: "",
    precio: ""
  });

  useEffect(() => {
    axios.get(`https://66972cf402f3150fb66cd356.mockapi.io/api/v1/servicios/${id}`)
      .then((response) => {
        setServicio(response.data);
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setServicio({
      ...servicio,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.put(`https://66972cf402f3150fb66cd356.mockapi.io/api/v1/servicios/${id}`, servicio)
      .then(() => {
        navigate('/dashboard-admin/gestion-de-servicios');
      });
  };

  return (
    <Container>
      <h2>Editar Servicio</h2>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Nombre</Label>
          <Input
            type="text"
            name="nombre"
            value={servicio.nombre}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Duración</Label>
          <Input
            type="text"
            name="duracion"
            value={servicio.duracion}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Precio</Label>
          <Input
            type="number"
            name="precio"
            value={servicio.precio}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <Button type="submit">Guardar Cambios</Button>
      </form>
    </Container>
  );
};

export default EditarServicio;

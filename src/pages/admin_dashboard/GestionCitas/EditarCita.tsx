import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoMdCloseCircleOutline } from "react-icons/io";
import axios from "axios";

// Definir interfaces para los datos
interface Cliente {
  id: number;
  Nombre: string;
}

interface Servicio {
  id: number;
  Nombre: string;
}

interface Estilista {
  id: number;
  Nombre: string;
}

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

const EditarCita = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [servicio, setServicio] = useState("");
  const [estilista, setEstilista] = useState("");
  const [estado, setEstado] = useState("");
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [estilistas, setEstilistas] = useState<Estilista[]>([]);

  useEffect(() => {
    if (id) {
      axios.get(`https://localhost:4000/citas/${id}`)
        .then((response) => {
          const cita = response.data;
          setCliente(cita.cliente);
          setFecha(cita.fecha);
          setHora(cita.hora);
          setServicio(cita.servicio);
          setEstilista(cita.estilista);
          setEstado(cita.estado);
        });
    }
  }, [id]);

  // Buscar clientes
  const buscarClientes = (search: string) => {
    axios.get(`/clientes?search=${search}`)
      .then((response) => setClientes(response.data));
  };

  // Buscar servicios
  const buscarServicios = (search: string) => {
    axios.get(`/servicios?search=${search}`)
      .then((response) => setServicios(response.data));
  };

  // Buscar estilistas
  const buscarEstilistas = (search: string) => {
    axios.get(`/estilistas?search=${search}`)
      .then((response) => setEstilistas(response.data));
  };

  // Manejo del formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const citaActualizada = {
      cliente,
      fecha,
      hora,
      servicio,
      estilista,
      estado
    };
    axios.put(`https://localhost:4000/citas/${id}`, citaActualizada)
      .then(() => {
        navigate("/dashboard-admin/gestion-citas");
      });
  };

  const manejarOnClickSalir = () => {
    navigate("/dashboard-admin/gestion-citas");
  };

  return (
    <Container>
      <Salir onClick={manejarOnClickSalir} />
      <h2>Editar Cita</h2>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Cliente</Label>
          <Input
            type="text"
            value={cliente}
            onChange={(e) => {
              setCliente(e.target.value);
              buscarClientes(e.target.value);
            }}
            placeholder="Nombre del cliente"
            required
          />
          {/* Lista de clientes encontrados */}
          <ul>
            {clientes.map((cliente) => (
              <li key={cliente.Nombre} onClick={() => setCliente(cliente.Nombre)}>
                {cliente.Nombre}
              </li>
            ))}
          </ul>
        </FormGroup>
        <FormGroup>
          <Label>Fecha</Label>
          <Input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Hora</Label>
          <Input
            type="time"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Servicio</Label>
          <Input
            type="text"
            value={servicio}
            onChange={(e) => {
              setServicio(e.target.value);
              buscarServicios(e.target.value);
            }}
            placeholder="Servicio"
            required
          />
          {/* Lista de servicios encontrados */}
          <ul>
            {servicios.map((servicio) => (
              <li key={servicio.Nombre} onClick={() => setServicio(servicio.Nombre)}>
                {servicio.Nombre}
              </li>
            ))}
          </ul>
        </FormGroup>
        <FormGroup>
          <Label>Estilista</Label>
          <Input
            type="text"
            value={estilista}
            onChange={(e) => {
              setEstilista(e.target.value);
              buscarEstilistas(e.target.value);
            }}
            placeholder="Nombre del estilista"
            required
          />
          {/* Lista de estilistas encontrados */}
          <ul>
            {estilistas.map((estilista) => (
              <li key={estilista.Nombre} onClick={() => setEstilista(estilista.Nombre)}>
                {estilista.Nombre}
              </li>
            ))}
          </ul>
        </FormGroup>
        <FormGroup>
          <Label>Estado Cita</Label>
          <Input
            type="text"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            placeholder="Estado Cita"
            required
          />
        </FormGroup>
        <Button type="submit">Guardar Cambios</Button>
        <ClearButton type="button" onClick={() => navigate("/dashboard-admin/gestion-citas")}>
          Cancelar
        </ClearButton>
      </form>
    </Container>
  );
};

export default EditarCita;

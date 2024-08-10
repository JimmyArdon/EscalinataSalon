import React, { useState } from "react";
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

const AgregarCita = () => {
  const navigate = useNavigate();
  const [cliente, setCliente] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [servicio, setServicio] = useState("");
  const [estilista, setEstilista] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nuevaCita = {
      cliente,
      fecha,
      hora,
      servicio,
      estilista
    };
    axios.post("https://example.com/api/citas", nuevaCita)
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
      <h2>Agregar Cita</h2>
      <form onSubmit={handleSubmit} className="bg-slate-500 p-10 rounded-[15px] w-2/4">
        <FormGroup>
          <Label>Cliente</Label>
          <Input
            type="text"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            placeholder="Nombre del cliente"
            required
          />
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
            onChange={(e) => setServicio(e.target.value)}
            placeholder="Servicio"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Estilista</Label>
          <Input
            type="text"
            value={estilista}
            onChange={(e) => setEstilista(e.target.value)}
            placeholder="Nombre del estilista"
            required
          />
        </FormGroup>
        <Button type="submit">Agregar</Button>
        <ClearButton type="button" onClick={() => navigate("/dashboard-admin/gestion-citas")}>
          Cancelar
        </ClearButton>
      </form>
    </Container>
  );
};

export default AgregarCita;

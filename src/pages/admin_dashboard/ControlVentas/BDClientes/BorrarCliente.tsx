import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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

const Button = styled.button`
  background-color: #f44336;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #d32f2f;
  }
`;

const Confirmar = styled(Button)`
  margin-right: 15px;
`;

const Cancelar = styled(Button)`
  background-color: #4caf50;
  &:hover {
    background-color: #45a049;
  }
`;

const BorrarCliente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState({
    nombre: "",
    contacto: "",
    telefono: "",
    direccion: ""
  });

  useEffect(() => {
    if (id) {
      axios.get(`https://example.com/api/clientes/${id}`)
        .then((response) => {
          setCliente(response.data);
        });
    }
  }, [id]);

  const handleConfirmar = () => {
    axios.delete(`https://example.com/api/clientes/${id}`)
      .then(() => navigate("/dashboard-admin/control-ventas/gestion-clientes"));
  };

  const manejarOnClickSalir = () => {
    navigate("/dashboard-admin/control-ventas/gestion-clientes");
  };

  return (
    <Container>
      <Salir onClick={manejarOnClickSalir} />
      <h1 className="text-body-secondary mb-10 font-bold">Eliminar Cliente</h1>
      <p>¿Estás seguro de que deseas eliminar al cliente <strong>{cliente.nombre}</strong>?</p>
      <div>
        <Confirmar onClick={handleConfirmar}>Confirmar</Confirmar>
        <Cancelar onClick={manejarOnClickSalir}>Cancelar</Cancelar>
      </div>
    </Container>
  );
};

export default BorrarCliente;

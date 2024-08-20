import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

type CrearClienteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onClienteCreado: (id: number, nombre: string) => void;
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  color: #888;
  cursor: pointer;
  float: right;
  &:hover {
    color: #555;
  }
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ModalButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const CrearClienteModal: React.FC<CrearClienteModalProps> = ({ isOpen, onClose, onClienteCreado }) => {
  const [Nombre, setNombre] = useState("");
  const [Rtn, setRtn] = useState("");
  const [Direccion, setDireccion] = useState("");
  const [Numero_Telefono, setTelefono] = useState("");
  const [Email, setEmail] = useState("");

  const handleCreateCliente = async () => {
    try {
      const nuevoCliente = { Nombre, Rtn, Direccion, Numero_Telefono, Email };
      const response = await axios.post("http://localhost:4000/clientes", nuevoCliente);
      onClienteCreado(response.data.id, Nombre);
      onClose();
    } catch (error) {
      console.error("Error al crear cliente:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>Crear Nuevo Cliente</h2>

        <ModalInput
          type="text"
          value={Nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
          required
        />
        <ModalInput
          type="text"
          value={Rtn}
          onChange={(e) => setRtn(e.target.value)}
          placeholder="RTN"
          required
        />
        <ModalInput
          type="text"
          value={Direccion}
          onChange={(e) => setDireccion(e.target.value)}
          placeholder="Dirección"
          required
        />
        <ModalInput
          type="tel"
          value={Numero_Telefono}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="Número de Teléfono"
          required
        />
        <ModalInput
          type="email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <ModalButton onClick={handleCreateCliente}>Crear Cliente</ModalButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CrearClienteModal;

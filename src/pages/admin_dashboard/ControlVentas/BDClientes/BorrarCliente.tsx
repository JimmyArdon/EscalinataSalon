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

const BorrarCliente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState({
    nombre: "",
    contacto: "",
    telefono: "",
    direccion: ""
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  useEffect(() => {
    if (id) {
      axios.get(`https://example.com/api/clientes/${id}`)
        .then((response) => {
          setCliente(response.data);
        });
    }
  }, [id]);

  const handleConfirmar = () => {
    if (clientesFiltrados.length > 0) {
      axios.delete(`https://example.com/api/clientes/${id}`)
        .then(() => navigate("/dashboard-admin/control-ventas/gestion-clientes"));
    }
  };

  const manejarOnClickSalir = () => {
    navigate("/dashboard-admin/control-ventas/gestion-clientes");
  };

  const handleSearch = () => {
    if (searchQuery.length > 0) {
      setLoading(true);
      axios.get(`https://example.com/api/clientes?nombre=${searchQuery}`)
        .then((response) => {
          setClientesFiltrados(response.data);
          setSearchPerformed(true);
          setLoading(loading);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setClientesFiltrados([]);
    setSearchPerformed(false);
  };

  return (
    <Container>
      <Salir onClick={manejarOnClickSalir} />
      <h1 className="text-body-secondary mb-10 font-bold">Eliminar Cliente</h1>
      <FormGroup>
        <Label>Buscar por Nombre</Label>
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Nombre del cliente"
        />
        <button type="submit" onClick={handleSearch} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Buscar</button>
        <button type="button" onClick={handleClearSearch} className="ml-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Limpiar</button>
      </FormGroup>
      {searchPerformed && clientesFiltrados.length > 0 && (
        <p>¿Estás seguro de que deseas eliminar al cliente <strong>{cliente.nombre}</strong>?</p>
      )}
      <div>
        {searchPerformed && clientesFiltrados.length > 0 && (
          <>
            <Confirmar onClick={handleConfirmar}>Confirmar</Confirmar>
            <Cancelar onClick={manejarOnClickSalir}>Cancelar</Cancelar>
          </>
        )}
      </div>
    </Container>
  );
};

export default BorrarCliente;

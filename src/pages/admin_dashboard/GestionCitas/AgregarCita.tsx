import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoMdCloseCircleOutline } from "react-icons/io";
import axios from "axios";
import CrearClienteModal from "../../../components/Cliente/CrearClienteModal";

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

const SuggestionList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
`;

const SuggestionItem = styled.li`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const Button = styled.button`
  background-color: #4caf50;
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

const AgregarCita: React.FC = () => {
  const navigate = useNavigate();
  const [cliente, setCliente] = useState<string>("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [servicio, setServicio] = useState<string>("");
  const [estilista, setEstilista] = useState<string>("");
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [estilistas, setEstilistas] = useState<Estilista[]>([]);
  const [filteredClientes, setFilteredClientes] = useState<Cliente[]>([]);
  const [filteredServicios, setFilteredServicios] = useState<Servicio[]>([]);
  const [filteredEstilistas, setFilteredEstilistas] = useState<Estilista[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [, setNuevoClienteId] = useState<number | null>(null);
  const [clienteId, setClienteId] = useState<number | null>(null);
  const [servicioId, setServicioId] = useState<number | null>(null);
  const [estilistaId, setEstilistaId] = useState<number | null>(null);

  useEffect(() => {
    // Obtener clientes
    axios.get<Cliente[]>('http://localhost:4000/clientes')
      .then(response => setClientes(response.data))
      .catch(error => console.error('Error al obtener clientes:', error));

    // Obtener servicios
    axios.get<Servicio[]>('http://localhost:4000/servicios')
      .then(response => setServicios(response.data))
      .catch(error => console.error('Error al obtener servicios:', error));

    // Obtener estilistas
    axios.get<Estilista[]>('http://localhost:4000/estilistas')
      .then(response => setEstilistas(response.data))
      .catch(error => console.error('Error al obtener estilistas:', error));
  }, []);

  useEffect(() => {
    if (cliente) {
      setFilteredClientes(
        clientes.filter(c =>
          c.Nombre.toLowerCase().includes(cliente.toLowerCase())
        )
      );
    } else {
      setFilteredClientes([]);
    }
  }, [cliente, clientes]);

  useEffect(() => {
    if (servicio) {
      setFilteredServicios(
        servicios.filter(s =>
          s.Nombre.toLowerCase().includes(servicio.toLowerCase())
        )
      );
    } else {
      setFilteredServicios([]);
    }
  }, [servicio, servicios]);

  useEffect(() => {
    if (estilista) {
      setFilteredEstilistas(
        estilistas.filter(e =>
          e.Nombre.toLowerCase().includes(estilista.toLowerCase())
        )
      );
    } else {
      setFilteredEstilistas([]);
    }
  }, [estilista, estilistas]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validar que los IDs no sean nulos
    if (clienteId === null || servicioId === null || estilistaId === null) {
        alert('Por favor, complete todos los campos antes de enviar.');
        return;
    }

    try {
        const nuevaCita = {
            Cliente_id: clienteId, // Asegúrate de que clienteId esté asignado correctamente
            fecha,
            hora,
            Servicio_id: servicioId, // Asegúrate de que servicioId esté asignado correctamente
            Usuario_id: estilistaId // Asegúrate de que estilistaId esté asignado correctamente
        };
        console.log("Datos de nueva cita:", nuevaCita); // Añade un log para verificar los datos
        await axios.post("http://localhost:4000/citas", nuevaCita);
        navigate("/dashboard-admin/gestion-citas");
    } catch (error) {
        console.error("Error al agregar cita:", error);
    }
};

// Función para seleccionar cliente, servicio, y estilista
const handleClienteSelect = (id: number, nombre: string) => {
    setCliente(nombre);
    setClienteId(id); // Asegura que el ID del cliente se actualiza correctamente
    setFilteredClientes([]); // Oculta la lista desplegable
};

const handleServicioSelect = (id: number, nombre: string) => {
    setServicio(nombre);
    setServicioId(id); // Asegura que el ID del servicio se actualiza correctamente
    setFilteredServicios([]); // Oculta la lista desplegable
};

const handleEstilistaSelect = (id: number, nombre: string) => {
    setEstilista(nombre);
    setEstilistaId(id); // Asegura que el ID del estilista se actualiza correctamente
    setFilteredEstilistas([]); // Oculta la lista desplegable
};

      const handleClienteCreado = (id: number, nombre: string) => {
        setCliente(nombre);
        setNuevoClienteId(id);
        setClienteId(id); // Actualiza el ID del cliente
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
          {filteredClientes.length > 0 && cliente && (
            <SuggestionList>
              {filteredClientes.map((c) => (
                <SuggestionItem
                  key={`cliente-${c.id}`} // Added a prefix to the key to ensure it's unique
                  onClick={() => handleClienteSelect(c.id, c.Nombre)}
                >
                  {c.Nombre}
                </SuggestionItem>
              ))}
            </SuggestionList>
          )}
          <Button type="button" onClick={() => setIsModalOpen(true)}>
            Crear Nuevo Cliente
          </Button>
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
            placeholder="Nombre del servicio"
            required
          />
          {filteredServicios.length > 0 && servicio && (
            <SuggestionList>
              {filteredServicios.map((s) => (
                <SuggestionItem
                  key={`servicio-${s.id}`} // Added a prefix to the key to ensure it's unique
                  onClick={() => handleServicioSelect(s.id, s.Nombre)}
                >
                  {s.Nombre}
                </SuggestionItem>
              ))}
            </SuggestionList>
          )}
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
          {filteredEstilistas.length > 0 && estilista && (
            <SuggestionList>
              {filteredEstilistas.map((e) => (
                <SuggestionItem
                  key={`estilista-${e.id}`} // Added a prefix to the key to ensure it's unique
                  onClick={() => handleEstilistaSelect(e.id, e.Nombre)}
                >
                  {e.Nombre}
                </SuggestionItem>
              ))}
            </SuggestionList>
          )}
        </FormGroup>
        <Button type="submit">Agregar Cita</Button>
        <ClearButton type="button" onClick={manejarOnClickSalir}>
          Cancelar
        </ClearButton>
      </form>
      <CrearClienteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onClienteCreado={handleClienteCreado}
      />
    </Container>
  );
};

export default AgregarCita;

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

interface EstadoCita {
  id: number;
  Descripcion: string;
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
  const [clienteId, setClienteId] = useState<number | "">("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [servicioId, setServicioId] = useState<number | "">("");
  const [estilistaId, setEstilistaId] = useState<number | "">("");
  const [estadoId, setEstadoId] = useState<number | "">("");
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [estilistas, setEstilistas] = useState<Estilista[]>([]);
  const [estados, setEstados] = useState<EstadoCita[]>([]);
  const [searchCliente, setSearchCliente] = useState("");
  const [searchServicio, setSearchServicio] = useState("");
  const [searchEstilista, setSearchEstilista] = useState("");
  const [searchEstado, setSearchEstado] = useState("");

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:4000/citas/${id}`)
        .then((response) => {
          const cita = response.data;
          setClienteId(cita.Cliente_id);
          setFecha(cita.fecha.split('T')[0]); // Convertir a formato yyyy-MM-dd
          setHora(cita.hora); // Convertir a formato HH:mm
          setServicioId(cita.Servicio_id);
          setEstilistaId(cita.Usuario_id);
          setEstadoId(cita.estado_cita_id);
        });
    }
  }, [id]);

  // Buscar clientes
  const buscarClientes = (search: string) => {
    axios.get(`/clientes?search=${search}`)
      .then((response) => {
        const data = Array.isArray(response.data) ? response.data : [];
        setClientes(data);
      })
      .catch((error) => {
        console.error("Error fetching clientes:", error);
        setClientes([]);
      });
  };

  // Buscar servicios
  const buscarServicios = (search: string) => {
    axios.get(`/servicios?search=${search}`)
      .then((response) => {
        const data = Array.isArray(response.data) ? response.data : [];
        setServicios(data);
      })
      .catch((error) => {
        console.error("Error fetching servicios:", error);
        setServicios([]);
      });
  };

  // Buscar estilistas
  const buscarEstilistas = (search: string) => {
    axios.get(`/estilistas?search=${search}`)
      .then((response) => {
        const data = Array.isArray(response.data) ? response.data : [];
        setEstilistas(data);
      })
      .catch((error) => {
        console.error("Error fetching estilistas:", error);
        setEstilistas([]);
      });
  };

  // Buscar estados de cita
  const buscarEstados = (search: string) => {
    axios.get(`/estados-cita?search=${search}`)
      .then((response) => {
        const data = Array.isArray(response.data) ? response.data : [];
        setEstados(data);
      })
      .catch((error) => {
        console.error("Error fetching estados de cita:", error);
        setEstados([]);
      });
  };

  // Manejo del formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const citaActualizada = {
      clienteId,
      fecha,
      hora,
      servicioId,
      estilistaId,
      estadoId
    };
    axios.put(`http://localhost:4000/citas/${id}`, citaActualizada)
      .then(() => {
        navigate("/dashboard-admin/gestion-citas");
      });
  };

  const manejarOnClickSalir = () => {
    navigate("/dashboard-admin/gestion-citas");
  };

  useEffect(() => {
    if (searchCliente !== "") {
      buscarClientes(searchCliente);
    }
  }, [searchCliente]);

  useEffect(() => {
    if (searchServicio !== "") {
      buscarServicios(searchServicio);
    }
  }, [searchServicio]);

  useEffect(() => {
    if (searchEstilista !== "") {
      buscarEstilistas(searchEstilista);
    }
  }, [searchEstilista]);

  useEffect(() => {
    if (searchEstado !== "") {
      buscarEstados(searchEstado);
    }
  }, [searchEstado]);

  return (
    <Container>
      <Salir onClick={manejarOnClickSalir} />
      <h2>Editar Cita</h2>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Cliente</Label>
          <Input
            type="text"
            value={searchCliente}
            onChange={(e) => setSearchCliente(e.target.value)}
            placeholder="Nombre del cliente"
            required
          />
          <ul>
            {Array.isArray(clientes) && clientes.length > 0 ? (
              clientes.map((cliente) => (
                <li key={cliente.id} onClick={() => setClienteId(cliente.id)}>
                  {cliente.Nombre}
                </li>
              ))
            ) : (
              <li>No se encontraron clientes</li>
            )}
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
            value={searchServicio}
            onChange={(e) => setSearchServicio(e.target.value)}
            placeholder="Servicio"
            required
          />
          <ul>
            {Array.isArray(servicios) && servicios.length > 0 ? (
              servicios.map((servicio) => (
                <li key={servicio.id} onClick={() => setServicioId(servicio.id)}>
                  {servicio.Nombre}
                </li>
              ))
            ) : (
              <li>No se encontraron servicios</li>
            )}
          </ul>
        </FormGroup>
        <FormGroup>
          <Label>Estilista</Label>
          <Input
            type="text"
            value={searchEstilista}
            onChange={(e) => setSearchEstilista(e.target.value)}
            placeholder="Nombre del estilista"
            required
          />
          <ul>
            {Array.isArray(estilistas) && estilistas.length > 0 ? (
              estilistas.map((estilista) => (
                <li key={estilista.id} onClick={() => setEstilistaId(estilista.id)}>
                  {estilista.Nombre}
                </li>
              ))
            ) : (
              <li>No se encontraron estilistas</li>
            )}
          </ul>
        </FormGroup>
        <FormGroup>
          <Label>Estado</Label>
          <Input
            type="text"
            value={searchEstado}
            onChange={(e) => setSearchEstado(e.target.value)}
            placeholder="Estado de la cita"
            required
          />
          <ul>
            {Array.isArray(estados) && estados.length > 0 ? (
              estados.map((estado) => (
                <li key={estado.id} onClick={() => setEstadoId(estado.id)}>
                  {estado.Descripcion}
                </li>
              ))
            ) : (
              <li>No se encontraron estados</li>
            )}
          </ul>
        </FormGroup>
        <Button type="submit">Actualizar Cita</Button>
        <ClearButton type="button" onClick={() => navigate("/dashboard-admin/gestion-citas")}>
          Cancelar
        </ClearButton>
      </form>
    </Container>
  );
};

export default EditarCita;

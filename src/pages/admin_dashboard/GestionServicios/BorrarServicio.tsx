import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoMdCloseCircleOutline } from "react-icons/io";
import axios from "axios";


const Container = styled.div`
  margin: 40px auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  background-color: #d9d9d9;
  padding: 40px;
  border-radius: 10px;
  position: relative;
  width: 80%;
  max-width: 800px;
  box-sizing: border-box;
  min-height: 100vh;
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
  background-color: #f44336;
  &:hover {
    background-color: #d32f2f;
  }
`;

const Salir = styled(IoMdCloseCircleOutline)`
  width: 50px;
  height: 50px;
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    width: 60px;
    height: 60px;
    color: #8b4513;
  }
`;

const Message = styled.p`
  color: #4CAF50;
  font-weight: bold;
`;

const ErrorMessage = styled.p`
  color: #f44336;
  font-weight: bold;
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

const ResultList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-height: 150px;
  overflow-y: auto;
  background-color: #fff;
`;

const ResultItem = styled.li`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

// Define the service type
type Service = {
  Id: string;
  Nombre: string;
  Duracion?: string;
  Precio?: string;
};

const BorrarServicio = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [servicio, setServicio] = useState<Service | null>(null);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [allServicios, setAllServicios] = useState<Service[]>([]);
  const [filteredServicios, setFilteredServicios] = useState<Service[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/servicios`)
      .then((response) => {
        setAllServicios(response.data);
      });
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredServicios(
        allServicios.filter((servicio) =>
          servicio.Nombre?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredServicios([]);
    }
  }, [searchQuery, allServicios]);  

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = allServicios.find(
      (servicio) =>
        servicio.Nombre?.toLowerCase() === searchQuery.toLowerCase()
    );
    if (result) {
      setServicio(result);
      setErrorMessage("");
    } else {
      setServicio(null);
      setErrorMessage("No se encontró ningún servicio con ese nombre.");
    }
  };
  

  const handleDelete = () => {
    if (servicio && servicio.Id) {
      axios
        .delete(
          `http://localhost:4000/servicios/${servicio.Id}`
        )
        .then(() => {
          setMessage("Servicio eliminado con éxito.");
          setTimeout(() => {
            navigate("/dashboard-admin/gestion-de-servicios");
          }, 2000);
        })
        .catch(() => {
          setErrorMessage("No se pudo eliminar el servicio.");
        });
    }
  };

  const manejarOnClickSalir = () => {
    navigate("/dashboard-admin/gestion-de-servicios");
  };

  const handleSelectService = (selectedService: Service) => {
    setServicio(selectedService);
    setSearchQuery(selectedService.Nombre);
    setFilteredServicios([]);
    setErrorMessage("");
  };

  return (
    <Container>
      <Salir onClick={manejarOnClickSalir} />
      <h2>Eliminar Servicio</h2>
      <form
        onSubmit={handleSearch}
        className="bg-slate-500 p-10 rounded-[15px] w-full max-w-md"
      >
        <FormGroup>
          <Label>Buscar por Nombre</Label>
          <div style={{ display: "flex", gap: "10px" }}>
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Nombre del servicio"
              required
            />
            <Button type="submit">Buscar</Button>
            <ClearButton type="button" onClick={() => setSearchQuery("")}>
              Limpiar
            </ClearButton>
          </div>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          {filteredServicios.length > 0 && (
            <ResultList>
              {filteredServicios.map((servicio) => (
                <ResultItem
                  key={servicio.Id}
                  onClick={() => handleSelectService(servicio)}
                >
                  {servicio.Nombre}
                </ResultItem>
              ))}
            </ResultList>
          )}
        </FormGroup>
      </form>
      {servicio && (
        <div className="bg-slate-500 p-10 rounded-[15px] w-full max-w-md text-center">
          <h3>
            ¿Estás seguro de que deseas eliminar el servicio "{servicio.Nombre}"?
          </h3>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            <Button onClick={handleDelete}>Eliminar</Button>
            <ClearButton
              onClick={() => navigate("/dashboard-admin/gestion-de-servicios")}
            >
              Cancelar
            </ClearButton>
          </div>
          {message && <Message>{message}</Message>}
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </div>
      )}
    </Container>
  );
};

export default BorrarServicio;

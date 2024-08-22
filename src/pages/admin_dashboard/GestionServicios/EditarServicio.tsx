import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { IoMdCloseCircleOutline } from "react-icons/io";

const Container = styled.div`
  margin: 0 auto; 
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

const ErrorMessage = styled.p`
  color: #f44336;
  font-weight: bold;
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

interface Service {
  Id: string;
  Nombre: string;
  Duracion: string;
  Precio: string;
}

const EditarServicio = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [servicio, setServicio] = useState<Service>({
    Id: "",
    Nombre: "",
    Duracion: "",
    Precio: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
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
    if (id) {
      axios
        .get(`http://localhost:4000/servicios/${id}`)
        .then((response) => {
          setServicio(response.data);
        });
    }
  }, [id]);

  useEffect(() => {
    if (searchQuery) {
      setFilteredServicios(
        allServicios.filter((servicio) =>
          servicio.Nombre.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredServicios([]);
    }
  }, [searchQuery, allServicios]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setServicio({
      ...servicio,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = allServicios.find(
      (servicio) => servicio.Nombre.toLowerCase() === searchQuery.toLowerCase()
    );
    if (result) {
      setServicio(result);
      setErrorMessage("");
    } else {
      setServicio({
        Id: "",
        Nombre: "",
        Duracion: "",
        Precio: "",
      });
      setErrorMessage("No se encontró ningún servicio con ese nombre.");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
      if(servicio.Id){
        axios
        .put(`http://localhost:4000/servicios/${servicio.Id}`, servicio)
        .then(() => {
          navigate("/dashboard-admin/gestion-de-servicios");
        });
      }
    
  };

  const handleClear = () => {
    setSearchQuery("");
    setServicio({
      Id: "",
      Nombre: "",
      Duracion: "",
      Precio: "",
    });
    setErrorMessage("");
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
      <h2>Editar Servicio</h2>
      <form onSubmit={handleSearch} className="bg-slate-500 p-10 rounded-[15px] w-full">
        <FormGroup>
          <Label>Buscar por Nombre</Label>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Nombre del servicio"
              required
            />
            <Button type="submit">Buscar</Button>
            <ClearButton type="button" onClick={handleClear}>
              Limpiar
            </ClearButton>
          </div>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          {filteredServicios.length > 0 && (
            <ResultList>
              {filteredServicios.map((servicio) => (
                <ResultItem key={servicio.Id} onClick={() => handleSelectService(servicio)}>
                  {servicio.Nombre}
                </ResultItem>
              ))}
            </ResultList>
          )}
        </FormGroup>
      </form>
      {servicio.Nombre && (
        <form onSubmit={handleSubmit} className="bg-slate-500 p-10 rounded-[15px] w-full">
          <FormGroup>
            <Label>Nombre</Label>
            <Input
              type="text"
              name="Nombre"
              value={servicio.Nombre}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Duración</Label>
            <Input
              type="text"
              name="Duracion"
              value={servicio.Duracion}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Precio</Label>
            <Input
              type="number"
              name="Precio"
              value={servicio.Precio}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <Button type="submit">Actualizar Servicio</Button>
        </form>
      )}
    </Container>
  );
};

export default EditarServicio;

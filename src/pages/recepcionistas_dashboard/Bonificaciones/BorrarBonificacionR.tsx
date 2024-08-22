import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoMdCloseCircleOutline } from "react-icons/io";
import axios from "axios";

interface Bonificacion {
  id: string;
  descripcion: string;
  compre?: number;
  lleve?: number;
  preUniDescuento?: number;
  idProducto?: string;
}

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
  background-color: #f44336;
  margin-left: 20px;
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
  color: #4caf50;
  font-weight: bold;
`;

const ErrorMessage = styled.p`
  color: #f44336;
  font-weight: bold;
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

const Dropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  z-index: 10;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const DropdownItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const BorrarBonificacion = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [bonificacion, setBonificacion] = useState<Partial<Bonificacion>>({ descripcion: "" });
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [opcionesFiltradas, setOpcionesFiltradas] = useState<Bonificacion[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBonificaciones = async () => {
      if (searchQuery.length > 0) {
        setLoading(true);
        try {
          const response = await axios.get<Bonificacion[]>(
            `https://66972cf402f3150fb66cd356.mockapi.io/api/v1/Bonificaciones?descripcion=${searchQuery}`
          );
          setOpcionesFiltradas(response.data);
        } catch {
          setOpcionesFiltradas([]);
        } finally {
          setLoading(false);
        }
      } else {
        setOpcionesFiltradas([]);
      }
    };

    fetchBonificaciones();
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (bonificacion.id) {
      axios
        .get<Bonificacion>(
          `https://66972cf402f3150fb66cd356.mockapi.io/api/v1/Bonificaciones/${bonificacion.id}`
        )
        .then((response) => {
          setBonificacion(response.data);
        })
        .catch(() => {
          setErrorMessage("No se encontró la bonificación.");
        });
    }
  };

  const handleDelete = () => {
    if (bonificacion.id) {
      axios
        .delete(
          `https://66972cf402f3150fb66cd356.mockapi.io/api/v1/Bonificaciones/${bonificacion.id}`
        )
        .then(() => {
          setMessage("Bonificación eliminada con éxito.");
          setTimeout(() => {
            navigate("/dashboard-admin/bonificaciones");
          }, 2000);
        })
        .catch(() => {
          setErrorMessage("No se pudo eliminar la bonificación.");
        });
    }
  };

  const manejarOnClickSalir = () => {
    navigate("/dashboard-admin/bonificaciones");
  };

  const seleccionarOpcion = (opcion: Bonificacion) => {
    setSearchQuery(opcion.descripcion);
    setBonificacion(opcion);
    setOpcionesFiltradas([]); // Limpiar las opciones después de seleccionar
  };

  return (
    <Container>
      <Salir onClick={manejarOnClickSalir} />
      <h2>Eliminar Bonificación</h2>
      <form
        onSubmit={handleSearch}
        className="bg-slate-500 p-10 rounded-[15px] w-full max-w-md"
      >
        <FormGroup>
          <Label>Buscar por Descripción</Label>
          <div style={{ position: "relative" }}>
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Descripción de la bonificación"
              required
            />
            {searchQuery && opcionesFiltradas.length > 0 && (
              <Dropdown>
                {opcionesFiltradas.map((opcion) => (
                  <DropdownItem
                    key={opcion.id}
                    onClick={() => seleccionarOpcion(opcion)}
                  >
                    {opcion.descripcion}
                  </DropdownItem>
                ))}
              </Dropdown>
            )}
            {loading && <p>Cargando...</p>}
          </div>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </FormGroup>
        <Button type="submit">Buscar</Button>
        <ClearButton type="button" onClick={() => setSearchQuery("")}>
          Limpiar
        </ClearButton>
      </form>
      {bonificacion.descripcion && (
        <div className="bg-slate-500 p-10 rounded-[15px] w-full max-w-md text-center">
          <h3>
            ¿Estás seguro de que deseas eliminar la bonificación "
            {bonificacion.descripcion}"?
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
              onClick={() => navigate("/dashboard-admin/bonificaciones")}
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

export default BorrarBonificacion;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoMdCloseCircleOutline } from "react-icons/io";
import axios from "axios";

interface Promocion {
  Id: string;
  Servicio_id: string;
  Descuento?: string;
  Fecha_inicio?: string;
  Fecha_fin?: string;
  Nombre?: string; // Añadido para manejar la propiedad Nombre
}

interface Servicio {
  Id: string;
  Nombre: string;
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

const BorrarPromocion = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [promocion, setPromocion] = useState<Partial<Promocion>>({ Servicio_id: "" });
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [opcionesFiltradas, setOpcionesFiltradas] = useState<Promocion[]>([]);
  const [loading, setLoading] = useState(false);
  const [servicio, setServicio] = useState<Servicio>({
    Id: '', 
    Nombre: ''
  });

  useEffect(() => {
    const fetchPromociones = async () => {
      if (searchQuery.length > 0) {
        setLoading(true);
        try {
          const response = await axios.get<Promocion[]>(
            `http://localhost:4000/servicios/nombre?Nombre=${searchQuery}`
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

    fetchPromociones();
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (promocion.Id) {
      axios
        .get<Promocion>(
          `http://localhost:4000/promociones-servicios/${promocion.Id}`
        )
        .then((response) => {
          setPromocion(response.data);
        })
        .catch(() => {
          setErrorMessage("No se encontró la promoción.");
        });
    }
  };

  const handleDelete = () => {
    if (promocion.Id) {
      axios
        .delete(
          `http://localhost:4000/promociones-servicios/${promocion.Id}`
        )
        .then(() => {
          setMessage("Promoción eliminada con éxito.");
          setTimeout(() => {
            navigate("/dashboard-admin/bonificaciones");
          }, 2000);
        })
        .catch(() => {
          setErrorMessage("No se pudo eliminar la promoción.");
        });
    }
  };

  const manejarOnClickSalir = () => {
    navigate("/dashboard-admin/bonificaciones");
  };

  async function traerProSer(id: string) {
    try {
      
      const respuesta = await fetch(`http://localhost:4000/promociones-servicios/${id}`);
  
      if (!respuesta.ok) {
        if (respuesta.status === 404) {
          throw new Error("No existe promocion para este servicio existe.");
        }
        throw new Error("Error al obtener la promoción.");
      }
  
      const datos = await respuesta.json();
      return datos;
  
    } catch (error) {
      console.error("Error en traerProSer:", error);
      throw error; 
    }
  }
  

  async function traerSer(id : string){
    const datos = await fetch(`http://localhost:4000/servicioss/${id}`);
    const res = await datos.json();
    return res;
  }

  const seleccionarOpcion = async (opcion: Promocion) => {
    
    // Asegúrate de que opcion.Nombre esté definido antes de asignar
    if (opcion.Nombre) {
      setSearchQuery(opcion.Nombre);
  
      try {
        const promocion = await traerProSer(opcion.Id);
        setPromocion(promocion);
  
        // Crear un objeto Servicio usando los datos de opcion
        const servicio: Servicio = {
          Id: opcion.Id,
          Nombre: opcion.Nombre,
        };
  
        setServicio(servicio);
  
        setOpcionesFiltradas([]);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : "Error desconocido");
      }
    } else {
      setErrorMessage("Nombre del servicio no disponible.");
    }
  };
  

  return (
    <Container>
      <Salir onClick={manejarOnClickSalir} />
      <h2>Eliminar Promoción</h2>
      <form
        onSubmit={handleSearch}
        className="bg-slate-500 p-10 rounded-[15px] w-full max-w-md"
      >
        <FormGroup>
          <Label>Buscar por Nombre</Label>
          <div style={{ position: "relative" }}>
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Nombre de la promoción"
              required
            />
            {searchQuery && opcionesFiltradas.length > 0 && (
              <Dropdown>
                {opcionesFiltradas.map((opcion) => (
                  <DropdownItem
                    key={opcion.Id}
                    onClick={() => seleccionarOpcion(opcion)}
                  >
                    {opcion.Nombre}
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
      {searchQuery && (
        <div className="bg-slate-500 p-10 rounded-[15px] w-full max-w-md text-center">
          <h3>
            ¿Estás seguro de que deseas eliminar la promoción en "
            {servicio.Nombre}"?
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

export default BorrarPromocion;

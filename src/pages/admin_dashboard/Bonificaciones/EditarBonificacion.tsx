import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoMdCloseCircleOutline } from "react-icons/io";
import axios from "axios";

interface Bonificacion {
  Id: string;
  Descripcion: string;
  Precio_unitario: number;
  Producto_id: string;
}
interface Producto {
  Id: string;
  nombre: string;
  precioVenta: string; 
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

const ErrorMessage = styled.p`
  color: #f44336;
  font-weight: bold;
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

const EditarBonificacion = () => {
  const navigate = useNavigate();
  const [bonificacion, setBonificacion] = useState<Bonificacion>({
    Id: "",
    Descripcion: "",
    Producto_id: "",
    Precio_unitario: 0,
  });
  const [productos, setProductos] = useState<Producto[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [opcionesFiltradas, setOpcionesFiltradas] = useState<Bonificacion[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (bonificacion.Id) {
      axios.get(`http://localhost:4000/bonificaciones/${bonificacion.Id}`)
        .then(response => {
          setBonificacion(response.data);
        })
        .catch(() => {
          setErrorMessage("No se pudo cargar la bonificación.");
        });
    }
  }, [bonificacion.Id]);

  useEffect(() => {
    axios.get('https://66972cf402f3150fb66cd356.mockapi.io/api/v1/productos')
      .then(response => {
        setProductos(response.data);
      })
      .catch(() => {
        setErrorMessage("No se pudo cargar los productos.");
      });
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setLoading(true);
      axios
        .get(
          `http://localhost:4000/bonificaciones/descripcion?Descripcion=${searchQuery}`
        )
        .then((response) => {
          setOpcionesFiltradas(response.data);
        })
        .catch(() => {
          setOpcionesFiltradas([]);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setOpcionesFiltradas([]);
    }
  }, [searchQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBonificacion(prevBonificacion => ({
      ...prevBonificacion,
      [name]: name === "Precio_unitario" ? parseFloat(value) || 0 : value
    }));
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .get(
        `http://localhost:4000/bonificaciones/descripcion?Descripcion=${searchQuery}`
      )
      .then((response) => {
        if (response.data.length > 0) {
          const foundBonificacion = response.data[0];
          setBonificacion(foundBonificacion);
          setErrorMessage("");
        } else {
          setErrorMessage("No se encontró ninguna bonificación con ese nombre.");
        }
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:4000/bonificaciones/${bonificacion.Id}`,
        bonificacion
      )
      .then(() => {
        navigate("/dashboard-admin/bonificaciones");
      });
  };

  const handleClear = () => {
    setBonificacion({
      Id: "",
      Descripcion: "",
      Precio_unitario: 0,
      Producto_id: "",
    });
    setSearchQuery("");
    setOpcionesFiltradas([]);
  };

  const manejarOnClickSalir = () => {
    navigate("/dashboard-admin/bonificaciones");
  };

  const seleccionarOpcion = (opcion: Bonificacion) => {
    setBonificacion(opcion);
    setSearchQuery(opcion.Descripcion);
    setOpcionesFiltradas([]);
  };

  return (
    <Container>
      <Salir onClick={manejarOnClickSalir} />
      <h2>Editar Bonificación</h2>
      <form
        onSubmit={handleSearch}
        className="bg-slate-500 p-10 rounded-[15px] w-2/4"
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
                    key={opcion.Id}
                    onClick={() => seleccionarOpcion(opcion)}
                  >
                    {opcion.Descripcion}
                  </DropdownItem>
                ))}
              </Dropdown>
            )}
            {loading && <p>Cargando...</p>}
          </div>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </FormGroup>
        <Button type="submit">Buscar</Button>
        <ClearButton type="button" onClick={handleClear}>
          Limpiar
        </ClearButton>
      </form>
      {bonificacion.Descripcion && (
        <form
          onSubmit={handleSubmit}
          className="bg-slate-500 p-10 rounded-[15px] w-2/4"
        >
          <FormGroup>
            <Label>Descripción de la Bonificación</Label>
            <Input
              type="text"
              name="Descripcion"
              value={bonificacion.Descripcion}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Precio Unitario</Label>
            <Input
              type="number"
              name="Precio_unitario"
              value={bonificacion.Precio_unitario}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <Button type="submit">Guardar Cambios</Button>
        </form>
      )}
    </Container>
  );
};

export default EditarBonificacion;

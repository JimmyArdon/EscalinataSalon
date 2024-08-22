import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoMdCloseCircleOutline } from "react-icons/io";
import axios from "axios";

interface Bonificacion {
  id: string;
  descripcion: string;
  compre: number;
  lleve: number;
  preUniDescuento: number;
  idProducto: string;
}

interface Producto {
  id: string;
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
    id: "",
    descripcion: "",
    compre: 0,
    lleve: 0,
    preUniDescuento: 0,
    idProducto: "",
  });
  const [productos, setProductos] = useState<Producto[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [opcionesFiltradas, setOpcionesFiltradas] = useState<Bonificacion[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (bonificacion.id) {
      axios.get(`https://66972cf402f3150fb66cd356.mockapi.io/api/v1/Bonificaciones/${bonificacion.id}`)
        .then(response => {
          setBonificacion(response.data);
        })
        .catch(() => {
          setErrorMessage("No se pudo cargar la bonificación.");
        });
    }
  }, [bonificacion.id]);

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
  
    const productoSeleccionado = productos.find(p => p.id === bonificacion.idProducto);
  
    if (productoSeleccionado) {
      const precioVenta = parseFloat(productoSeleccionado.precioVenta);
  
      const nuevoPrecioUnitarioDescuento = ( (bonificacion.lleve + bonificacion.compre) * precioVenta ) / bonificacion.compre;
  
      setBonificacion(prev => ({
        ...prev,
        preUniDescuento: nuevoPrecioUnitarioDescuento
      }));
    }
  }, [bonificacion.compre, bonificacion.lleve, bonificacion.idProducto, productos]);
  
  

  useEffect(() => {
    if (searchQuery) {
      setLoading(true);
      axios
        .get(
          `https://66972cf402f3150fb66cd356.mockapi.io/api/v1/Bonificaciones?descripcion=${searchQuery}`
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
  }, [searchQuery])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBonificacion(prevBonificacion => ({
      ...prevBonificacion,
      [name]: name === "compre" || name === "lleve" ? parseFloat(value) || 0 : value
    }));
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .get(
        `https://66972cf402f3150fb66cd356.mockapi.io/api/v1/Bonificaciones?descripcion=${searchQuery}`
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
        `https://66972cf402f3150fb66cd356.mockapi.io/api/v1/Bonificaciones/${bonificacion.id}`,
        bonificacion
      )
      .then(() => {
        navigate("/dashboard-admin/bonificaciones");
      });
  };

  const handleClear = () => {
    setBonificacion({
      id: "",
      descripcion: "",
      compre: 0,
      lleve: 0,
      preUniDescuento: 0,
      idProducto: "",
    });
    setSearchQuery("");
    setOpcionesFiltradas([]);
  };

  const manejarOnClickSalir = () => {
    navigate("/dashboard-admin/bonificaciones");
  };

  const seleccionarOpcion = (opcion: Bonificacion) => {
    setBonificacion(opcion);
    setSearchQuery(opcion.descripcion);
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
        <ClearButton type="button" onClick={handleClear}>
          Limpiar
        </ClearButton>
      </form>
      {bonificacion.descripcion && (
        <form
          onSubmit={handleSubmit}
          className="bg-slate-500 p-10 rounded-[15px] w-2/4"
        >
          <FormGroup>
            <Label>Descripción de la Bonificacion</Label>
            <Input
              type="text"
              name="descripcion"
              value={bonificacion.descripcion}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Por la Compra de: </Label>
            <Input
              type="number"
              name="compre"
              value={bonificacion.compre}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Lleva Gratis: </Label>
            <Input
              type="number"
              name="lleve"
              value={bonificacion.lleve}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Precio Unitario con Descuento aplicado</Label>
            <Input
              type="number"
              name="preUniDescuento"
              value={bonificacion.preUniDescuento}
              readOnly
            />
          </FormGroup>
          <Button type="submit">Guardar Cambios</Button>
        </form>
      )}
    </Container>
  );
};

export default EditarBonificacion;

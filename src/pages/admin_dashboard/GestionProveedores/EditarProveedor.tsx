import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoMdCloseCircleOutline } from "react-icons/io";
import axios from "axios";

// Define the interface for a supplier
interface Proveedor {
  id: string;
  nombre: string;
  contacto: string;
  telefono: string;
  direccion: string;
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

const EditarProveedor = () => {
  const navigate = useNavigate();
  const [proveedor, setProveedor] = useState<Proveedor>({
    id: "",
    nombre: "",
    contacto: "",
    telefono: "",
    direccion: ""
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [opcionesFiltradas, setOpcionesFiltradas] = useState<Proveedor[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchQuery) {
      setLoading(true);
      axios
        .get(
          `https://66972cf402f3150fb66cd356.mockapi.io/api/v1/proveedores?nombre=${searchQuery}`
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
    setProveedor({
      ...proveedor,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .get(
        `https://66972cf402f3150fb66cd356.mockapi.io/api/v1/proveedores?nombre=${searchQuery}`
      )
      .then((response) => {
        if (response.data.length > 0) {
          setProveedor(response.data[0]);
          setErrorMessage("");
        } else {
          setErrorMessage("No se encontró ningún proveedor con ese nombre.");
        }
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .put(
        `https://66972cf402f3150fb66cd356.mockapi.io/api/v1/proveedores/${proveedor.id}`,
        proveedor
      )
      .then(() => {
        navigate("/dashboard-admin/proveedores");
      });
  };

  const handleClear = () => {
    setProveedor({
      id: "",
      nombre: "",
      contacto: "",
      telefono: "",
      direccion: ""
    });
    setSearchQuery("");
    setOpcionesFiltradas([]);
  };

  const manejarOnClickSalir = () => {
    navigate("/dashboard-admin/gestion-proveedores");
  };

  const seleccionarOpcion = (opcion: Proveedor) => {
    setProveedor(opcion);
    setSearchQuery(opcion.nombre);
    setOpcionesFiltradas([]);
  };

  return (
    <Container>
      <Salir onClick={manejarOnClickSalir} />
      <h2>Editar Proveedor</h2>
      <form
        onSubmit={handleSearch}
        className="bg-slate-500 p-10 rounded-[15px] w-2/4"
      >
        <FormGroup>
          <Label>Buscar por Nombre</Label>
          <div style={{ position: "relative" }}>
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Nombre del proveedor"
              required
            />
            {searchQuery && opcionesFiltradas.length > 0 && (
              <Dropdown>
                {opcionesFiltradas.map((opcion) => (
                  <DropdownItem
                    key={opcion.id}
                    onClick={() => seleccionarOpcion(opcion)}
                  >
                    {opcion.nombre}
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
      {proveedor.nombre && (
        <form
          onSubmit={handleSubmit}
          className="bg-slate-500 p-10 rounded-[15px] w-2/4"
        >
          <FormGroup>
            <Label>Nombre</Label>
            <Input
              type="text"
              name="nombre"
              value={proveedor.nombre}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Contacto</Label>
            <Input
              type="text"
              name="contacto"
              value={proveedor.contacto}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Teléfono</Label>
            <Input
              type="text"
              name="telefono"
              value={proveedor.telefono}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Dirección</Label>
            <Input
              type="text"
              name="direccion"
              value={proveedor.direccion}
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

export default EditarProveedor;
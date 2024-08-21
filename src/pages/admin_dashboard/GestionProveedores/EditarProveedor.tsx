import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoMdCloseCircleOutline } from "react-icons/io";
import axios from "axios";

interface Proveedor {
  Id: string;
  Nombre: string;
  Direccion: string;
  Numero_Telefono: string;
  Email: string;
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

const SuccessMessage = styled.p`
  color: #4CAF50;
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
    Id: "",
    Nombre: "",
    Direccion: "",
    Numero_Telefono: "",
    Email: ""
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [opcionesFiltradas, setOpcionesFiltradas] = useState<Proveedor[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchQuery) {
      setLoading(true);
      axios
        .get(`http://localhost:4000/proveedoress?nombre=${searchQuery}`) // Actualiza la URL
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
      .get(`http://localhost:4000/proveedores?nombre=${searchQuery}`) // Actualiza la URL
      .then((response) => {
        if (response.data.length > 0) {
          setProveedor(response.data[0]);
          setErrorMessage("");
          setSuccessMessage("");
        } else {
          setErrorMessage("No se encontró ningún proveedor con ese nombre.");
          setSuccessMessage("");
        }
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .put(`http://localhost:4000/proveedoress/${proveedor.Id}`, proveedor) // Actualiza la URL
      .then(() => {
        setSuccessMessage("Proveedor actualizado exitosamente.");
        setErrorMessage("");
        setTimeout(() => {
          navigate("/dashboard-admin/gestion-proveedores");
        }, 2000); // Espera 2 segundos antes de redirigir
      })
      .catch(() => {
        setErrorMessage("Error al actualizar el proveedor.");
        setSuccessMessage("");
      });
  };

  const handleClear = () => {
    setProveedor({
      Id: "",
      Nombre: "",
      Direccion: "",
      Numero_Telefono: "",
      Email: ""
    });
    setSearchQuery("");
    setOpcionesFiltradas([]);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const manejarOnClickSalir = () => {
    navigate("/dashboard-admin/gestion-proveedores");
  };

  const seleccionarOpcion = (opcion: Proveedor) => {
    setProveedor(opcion);
    setSearchQuery(opcion.Nombre);
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
          {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        </FormGroup>
        <Button type="submit">Buscar</Button>
        <ClearButton type="button" onClick={handleClear}>
          Limpiar
        </ClearButton>
      </form>
      {proveedor.Nombre && (
        <form
          onSubmit={handleSubmit}
          className="bg-slate-500 p-10 rounded-[15px] w-2/4"
        >
          <FormGroup>
            <Label>Nombre</Label>
            <Input
              type="text"
              name="Nombre"
              value={proveedor.Nombre}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Direccion</Label>
            <Input
              type="text"
              name="Direccion"
              value={proveedor.Direccion}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Teléfono</Label>
            <Input
              type="text"
              name="Numero_Telefono"
              value={proveedor.Numero_Telefono}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="text"
              name="Email"
              value={proveedor.Email}
              onChange={handleChange}
            />
          </FormGroup>
          <Button type="submit">Guardar Cambios</Button>
        </form>
      )}
    </Container>
  );
};

export default EditarProveedor;

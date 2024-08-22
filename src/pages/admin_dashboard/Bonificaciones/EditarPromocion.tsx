import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoMdCloseCircleOutline } from "react-icons/io";
import axios from "axios";

interface Promocion {
  Id: string;
  descuento: number;
  fechaInicio: string;
  fechaFinal: string;
  Servicio_id: string;
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

const EditarPromocion = () => {
  const navigate = useNavigate();
  const [promocion, setPromocion] = useState<Promocion>({
    Id: "",
    descuento: 0,
    fechaInicio: "",
    fechaFinal: "",
    Servicio_id: ""
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [opcionesFiltradas, setOpcionesFiltradas] = useState<Promocion[]>([]);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    if (searchQuery) {
      setLoading(true);
      axios
        .get(`http://localhost:4000/serviciosss?Nombre=${searchQuery}`)
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
    setPromocion({
      ...promocion,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .get(`http://localhost:4000/serviciosss?Nombre=${searchQuery}`)
      .then((response) => {
        if (response.data.length > 0) {
          setPromocion(response.data[0]);
          setErrorMessage("");
        } else {
          setErrorMessage("No se encontró ninguna promoción con ese nombre.");
        }
      });
  };

   async function traerServicio_id (){
    const data = await fetch(`http://localhost:4000/serviciosss?Nombre=${promocion.Nombre}`);
    const res = await data.json();
    return res[0].Id;
    

  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const idServicio = await traerServicio_id()
    console.log(idServicio);
    
    
    axios
      .put(`http://localhost:4000/promociones-servicios/${promocion.Id}`, {
        Descuento: promocion.descuento,
        Fecha_inicio: promocion.fechaInicio,
        Fecha_fin: promocion.fechaFinal,
        Servicio_id: idServicio
      })
      .then(() => {
        navigate("/dashboard-admin/bonificaciones");
      })
      .catch((error) => {
        console.error("Error al actualizar la promoción:", error);
      });
  };

  const handleClear = () => {
    setPromocion({
      Id: "",
      descuento: 0,
      fechaInicio: "",
      fechaFinal: "",
      Servicio_id: ""
    });
    setSearchQuery("");
    setOpcionesFiltradas([]);
  };

  const manejarOnClickSalir = () => {
    navigate("/dashboard-admin/bonificaciones");
  };

  const seleccionarOpcion = (opcion: Promocion) => {
    setPromocion(opcion);
    setSearchQuery(opcion.Nombre);
    setOpcionesFiltradas([]);
  };

  useEffect(() => {
    console.log(promocion);
    
  })

  return (
    <Container>
      <Salir onClick={manejarOnClickSalir} />
      <h2>Editar Promoción</h2>
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
        <ClearButton type="button" onClick={handleClear}>
          Limpiar
        </ClearButton>
      </form>
      {promocion.Descripcion && (
        <form
          onSubmit={handleSubmit}
          className="bg-slate-500 p-10 rounded-[15px] w-2/4"
        >
          <FormGroup>
            <Label>Descripción</Label>
            <Input
              type="text"
              name="Descripcion"
              value={promocion.Descripcion || ''}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Descuento</Label>
            <Input
              type="number"
              name="descuento"
              value={promocion.descuento || 0}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Precio</Label>
            <Input
              type="number"
              name="precio"
              value={promocion.Precio || 0}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Fecha Inicial</Label>
            <Input
              type="date"
              name="fechaInicio"
              value={promocion.fechaInicio || ''}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Fecha de Finalizacion</Label>
            <Input
              type="date"
              name="fechaFinal"
              value={promocion.fechaFinal || ''}
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

export default EditarPromocion;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IoMdCloseCircleOutline } from "react-icons/io";
import axios from "axios";

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

const EditarPromocion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [promocion, setPromocion] = useState({
    descripcion: "",
    precio: "",
    descuento: ""
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (id) {
      axios.get(`https://66972cf402f3150fb66cd356.mockapi.io/api/v1/tarifasPromociones/${id}`)
        .then((response) => {
          setPromocion(response.data);
        });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromocion({
      ...promocion,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.get(`https://66972cf402f3150fb66cd356.mockapi.io/api/v1/tarifasPromociones?descripcion=${searchQuery}`)
      .then((response) => {
        if (response.data.length > 0) {
          setPromocion(response.data[0]);
          setErrorMessage("");
        } else {
          setErrorMessage('No se encontró ninguna promoción con ese nombre.');
        }
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.put(`https://66972cf402f3150fb66cd356.mockapi.io/api/v1/tarifasPromociones/${id}`, promocion)
      .then(() => {
        navigate('/dashboard-admin/gestion-de-servicios');
      });
  };

  const handleClear = () => {
    setPromocion({
      descripcion: "",
      precio: "",
      descuento: ""
    });
    setSearchQuery("");
  };

  const manejarOnClickSalir = () => {
    navigate("/dashboard-admin/gestion-de-servicios");
  };

  return (
    <Container>
      <Salir onClick={manejarOnClickSalir} />
      <h2>Editar Promoción</h2>
      <form onSubmit={handleSearch} className="bg-slate-500 p-10 rounded-[15px] w-2/4">
        <FormGroup>
          <Label>Buscar por Nombre</Label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Nombre de la promoción"
              required
            />
            <Button type="submit">Buscar</Button>
            <ClearButton type="button" onClick={handleClear}>Limpiar</ClearButton>
          </div>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </FormGroup>
      </form>
      {promocion.descripcion && (
        <form onSubmit={handleSubmit} className="bg-slate-500 p-10 rounded-[15px] w-2/4">
          <FormGroup>
            <Label>Descripción</Label>
            <Input
              type="text"
              name="descripcion"
              value={promocion.descripcion}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Descuento</Label>
            <Input
              type="number"
              name="descuento"
              value={promocion.descuento}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Precio</Label>
            <Input
              type="number"
              name="precio"
              value={promocion.precio}
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

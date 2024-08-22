import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoMdCloseCircleOutline } from "react-icons/io";

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
  margin-left: 15px;
  &:hover {
    background-color: #d32f2f;
  }
`;

const ErrorMessage = styled.p`
  color: #f44336;
  font-weight: bold;
`;

const SuccessMessage = styled.p`
  color: #4caf50;
  font-weight: bold;
`;

const AgregarCliente: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Nombre: "",
    Rtn: "",
    Direccion: "",
    Numero_Telefono: "",
    Email: ""
  });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validarFormulario = (): boolean => {
    const { Nombre, Rtn, Direccion, Numero_Telefono, Email } = formData;
    if (!Nombre || !Rtn || !Direccion || !Numero_Telefono || !Email) {
      setError("Todos los campos son obligatorios.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    fetch("http://localhost:4000/clientes", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(response => response.json())
    .then(() => {
      setSuccessMessage("Cliente agregado con éxito.");
      setTimeout(() => navigate("/dashboard-admin/gestion-clientes"), 2000);
    })
    .catch(err => {
      console.error("Error al agregar cliente:", err);
      setError("Error al agregar cliente");
    });
  };

  const manejarOnClickSalir = () => {
    navigate("/dashboard-admin/gestion-clientes");
  };

  return (
    <Container>
      <Salir onClick={manejarOnClickSalir} />
      <h1 className="text-body-secondary mb-10 font-bold">Agregar Cliente</h1>
      <form onSubmit={handleSubmit} className="bg-slate-500 p-10 rounded-[15px] w-2/4">
        <FormGroup>
          <Label>Nombre</Label>
          <Input
            type="text"
            name="Nombre"
            value={formData.Nombre}
            onChange={handleInputChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>RTN</Label>
          <Input
            type="text"
            name="Rtn"
            value={formData.Rtn}
            onChange={handleInputChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Dirección</Label>
          <Input
            type="text"
            name="Direccion"
            value={formData.Direccion}
            onChange={handleInputChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Teléfono</Label>
          <Input
            type="text"
            name="Numero_Telefono"
            value={formData.Numero_Telefono}
            onChange={handleInputChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleInputChange}
            required
          />
        </FormGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        <Button type="submit">Guardar Cliente</Button>
        <ClearButton type="button" onClick={manejarOnClickSalir}>
          Cancelar
        </ClearButton>
      </form>
    </Container>
  );
};

export default AgregarCliente;

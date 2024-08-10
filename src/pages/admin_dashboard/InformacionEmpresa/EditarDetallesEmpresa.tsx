import { useState } from "react";
import styled from "styled-components";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

interface DetallesEmpresa {
  nombre: string;
  razonSocial: string;
  rtn: string;
  telefono: string;
  correo: string;
  direccion: string;
  cai: string;
  establecimiento: string;
  puntoEmision: string;
  tipoDocumento: string;
  facturaInicio: string;
  facturaLimite: string;
  facturaActual: string;
  fechaLimiteEmision: string;
  fechaInicio: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background-color: #d9d9d9;
  padding: 40px;
  border-radius: 10px;
  position: relative;
  width: 80%;
  max-width: 800px;
  margin: auto;
  box-sizing: border-box;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  width: 100%;
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
  background-color: #fff;
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

const EditarDetallesEmpresa = () => {
  const navigate = useNavigate();

  const [detallesEmpresa, setDetallesEmpresa] = useState<DetallesEmpresa>({
    nombre: "Inversiones Estéticas C&C",
    razonSocial: "Byron Aaron Cerrato",
    rtn: "05019021339269",
    telefono: "+(504) 8912-6011",
    correo: "escalinatacys@gmail.com",
    direccion: "Col. Osorio, calle principal, atrás de iglesia Renacer, Santa Rosa de Copan Honduras",
    cai: "672002-A60EB4-6946A1-E1437B-9925CE-35",
    establecimiento: "000",
    puntoEmision: "001",
    tipoDocumento: "01",
    facturaInicio: "00000301",
    facturaLimite: "00000400",
    facturaActual: "0000314",
    fechaLimiteEmision: "09/10/2024",
    fechaInicio: "09/08/2024"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetallesEmpresa((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Aquí puedes implementar la lógica para guardar los cambios
    console.log("Detalles guardados", detallesEmpresa);
  };

  return (
    <Container>
      <Salir onClick={() => navigate("/dashboard-admin")} />
      <h2>Editar Detalles del Negocio</h2>
      <FormGroup>
        <Label>Nombre</Label>
        <Input
          type="text"
          name="nombre"
          value={detallesEmpresa.nombre}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Razón Social</Label>
        <Input
          type="text"
          name="razonSocial"
          value={detallesEmpresa.razonSocial}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>RTN</Label>
        <Input
          type="text"
          name="rtn"
          value={detallesEmpresa.rtn}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Teléfono</Label>
        <Input
          type="text"
          name="telefono"
          value={detallesEmpresa.telefono}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Correo</Label>
        <Input
          type="email"
          name="correo"
          value={detallesEmpresa.correo}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Dirección Principal</Label>
        <Input
          type="text"
          name="direccion"
          value={detallesEmpresa.direccion}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>CAI</Label>
        <Input
          type="text"
          name="cai"
          value={detallesEmpresa.cai}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Establecimiento</Label>
        <Input
          type="text"
          name="establecimiento"
          value={detallesEmpresa.establecimiento}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Punto de Emisión</Label>
        <Input
          type="text"
          name="puntoEmision"
          value={detallesEmpresa.puntoEmision}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Tipo de Documento</Label>
        <Input
          type="text"
          name="tipoDocumento"
          value={detallesEmpresa.tipoDocumento}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Factura Inicio</Label>
        <Input
          type="text"
          name="facturaInicio"
          value={detallesEmpresa.facturaInicio}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Factura Límite</Label>
        <Input
          type="text"
          name="facturaLimite"
          value={detallesEmpresa.facturaLimite}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Factura Actual</Label>
        <Input
          type="text"
          name="facturaActual"
          value={detallesEmpresa.facturaActual}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Fecha Límite de Emisión</Label>
        <Input
          type="date"
          name="fechaLimiteEmision"
          value={detallesEmpresa.fechaLimiteEmision}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Fecha Inicio</Label>
        <Input
          type="date"
          name="fechaInicio"
          value={detallesEmpresa.fechaInicio}
          onChange={handleChange}
        />
      </FormGroup>
      <Button onClick={handleSave}>Guardar Cambios</Button>
    </Container>
  );
};

export default EditarDetallesEmpresa;

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
  fechaLimiteEmision: Date;
  fechaInicio: Date;
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

const DetallesEmpresa = () => {
  const navigate = useNavigate();

  const detallesEmpresa: DetallesEmpresa = {
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
    fechaLimiteEmision: new Date("2024-10-18"),
    fechaInicio: new Date("2024-08-17")
  };

  const handleEdit = () => {
    navigate("/dashboard-admin/informacion-empresa/editar-detalles");
  };

  return (
    <Container>
      <Salir onClick={() => navigate("/dashboard-admin/informacion-empresa")} />
      <h2>Detalles del Negocio</h2>
      <FormGroup>
        <Label>Nombre</Label>
        <Input type="text" value={detallesEmpresa.nombre} readOnly />
      </FormGroup>
      <FormGroup>
        <Label>Razón Social</Label>
        <Input type="text" value={detallesEmpresa.razonSocial} readOnly />
      </FormGroup>
      <FormGroup>
        <Label>RTN</Label>
        <Input type="text" value={detallesEmpresa.rtn} readOnly />
      </FormGroup>
      <FormGroup>
        <Label>Teléfono</Label>
        <Input type="text" value={detallesEmpresa.telefono} readOnly />
      </FormGroup>
      <FormGroup>
        <Label>Correo</Label>
        <Input type="email" value={detallesEmpresa.correo} readOnly />
      </FormGroup>
      <FormGroup>
        <Label>Dirección Principal</Label>
        <Input type="text" value={detallesEmpresa.direccion} readOnly />
      </FormGroup>
      <FormGroup>
        <Label>CAI</Label>
        <Input type="text" value={detallesEmpresa.cai} readOnly />
      </FormGroup>
      <FormGroup>
        <Label>Establecimiento</Label>
        <Input type="text" value={detallesEmpresa.establecimiento} readOnly />
      </FormGroup>
      <FormGroup>
        <Label>Punto de Emisión</Label>
        <Input type="text" value={detallesEmpresa.puntoEmision} readOnly />
      </FormGroup>
      <FormGroup>
        <Label>Tipo de Documento</Label>
        <Input type="text" value={detallesEmpresa.tipoDocumento} readOnly />
      </FormGroup>
      <FormGroup>
        <Label>Factura Inicio</Label>
        <Input type="text" value={detallesEmpresa.facturaInicio} readOnly />
      </FormGroup>
      <FormGroup>
        <Label>Factura Límite</Label>
        <Input type="text" value={detallesEmpresa.facturaLimite} readOnly />
      </FormGroup>
      <FormGroup>
        <Label>Factura Actual</Label>
        <Input type="text" value={detallesEmpresa.facturaActual} readOnly />
      </FormGroup>
      <FormGroup>
        <Label>Fecha Límite de Emisión</Label>
        <Input
          type="date"
          value={detallesEmpresa.fechaLimiteEmision.toISOString().split("T")[0]}
          readOnly
        />
      </FormGroup>
      <FormGroup>
        <Label>Fecha Inicio</Label>
        <Input
          type="date"
          value={detallesEmpresa.fechaInicio.toISOString().split("T")[0]}
          readOnly
        />
      </FormGroup>
      <Button onClick={handleEdit}>Editar</Button>
    </Container>
  );
};

export default DetallesEmpresa;

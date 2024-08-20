import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

interface DetallesEmpresa {
  nombre: string;
  razonSocial: string;
  rtn: string;
  Teléfono: string;
  Correo_electronico: string;
  direccion: string;
  cai: string;
  establecimiento: string;
  puntoEmision: string;
  tipoDocumento: string;
  facturaInicio: string;
  facturaLimite: string;
  facturaActual: string;
  fechaLimiteEmision: string; // Cambiar a string para manejar el formato ISO
  fechaInicio: string; // Cambiar a string para manejar el formato ISO
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

const DetallesEmpresa: React.FC = () => {
  const [detalles, setDetalles] = useState<DetallesEmpresa | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetalles = async () => {
      try {
        const response = await axios.get<DetallesEmpresa>('http://localhost:4000/empresa');
        setDetalles(response.data);
      } catch (error) {
        console.error('Error fetching empresa details:', error);
      }
    };

    fetchDetalles();
  }, []);

  const handleEdit = () => {
    navigate("/dashboard-admin/informacion-empresa/editar-detalles");
  };

  return (
    <Container>
      <Salir onClick={() => navigate("/dashboard-admin/main")} />
      <h2>Detalles del Negocio</h2>
      {detalles ? (
        <>
          <FormGroup>
            <Label>Nombre</Label>
            <Input type="text" value={detalles.nombre} readOnly />
          </FormGroup>
          <FormGroup>
            <Label>Razón Social</Label>
            <Input type="text" value={detalles.razonSocial} readOnly />
          </FormGroup>
          <FormGroup>
            <Label>RTN</Label>
            <Input type="text" value={detalles.rtn} readOnly />
          </FormGroup>
          <FormGroup>
            <Label>Teléfono</Label>
            <Input type="text" value={detalles.Teléfono} readOnly />
          </FormGroup>
          <FormGroup>
            <Label>Correo</Label>
            <Input type="email" value={detalles.Correo_electronico} readOnly />
          </FormGroup>
          <FormGroup>
            <Label>Dirección Principal</Label>
            <Input type="text" value={detalles.direccion} readOnly />
          </FormGroup>
          <FormGroup>
            <Label>CAI</Label>
            <Input type="text" value={detalles.cai} readOnly />
          </FormGroup>
          <FormGroup>
            <Label>Establecimiento</Label>
            <Input type="text" value={detalles.establecimiento} readOnly />
          </FormGroup>
          <FormGroup>
            <Label>Punto de Emisión</Label>
            <Input type="text" value={detalles.puntoEmision} readOnly />
          </FormGroup>
          <FormGroup>
            <Label>Tipo de Documento</Label>
            <Input type="text" value={detalles.tipoDocumento} readOnly />
          </FormGroup>
          <FormGroup>
            <Label>Factura Inicio</Label>
            <Input type="text" value={detalles.facturaInicio} readOnly />
          </FormGroup>
          <FormGroup>
            <Label>Factura Límite</Label>
            <Input type="text" value={detalles.facturaLimite} readOnly />
          </FormGroup>
          <FormGroup>
            <Label>Factura Actual</Label>
            <Input type="text" value={detalles.facturaActual} readOnly />
          </FormGroup>
          <FormGroup>
            <Label>Fecha Límite de Emisión</Label>
            <Input
              type="date"
              value={new Date(detalles.fechaLimiteEmision).toISOString().split("T")[0]}
              readOnly
            />
          </FormGroup>
          <FormGroup>
            <Label>Fecha Inicio</Label>
            <Input
              type="date"
              value={new Date(detalles.fechaInicio).toISOString().split("T")[0]}
              readOnly
            />
          </FormGroup>
          <Button onClick={handleEdit}>Editar</Button>
        </>
      ) : (
        <p>Cargando detalles de la empresa...</p>
      )}
    </Container>
  );
};

export default DetallesEmpresa;

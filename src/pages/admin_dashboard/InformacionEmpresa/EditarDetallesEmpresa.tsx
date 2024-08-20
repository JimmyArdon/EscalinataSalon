import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.875rem;
  margin-top: -10px;
  margin-bottom: 15px;
`;

const EditarDetallesEmpresa = () => {
  const navigate = useNavigate();
  const [detallesEmpresa, setDetalles] = useState<DetallesEmpresa | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    const requiredFields = [
      "nombre", "razonSocial", "rtn", "Teléfono",
      "Correo_electronico", "direccion", "cai",
      "establecimiento", "puntoEmision", "tipoDocumento",
      "facturaInicio", "facturaLimite", "fechaLimiteEmision",
      "fechaInicio"
    ];

    // Check required fields
    requiredFields.forEach(field => {
      if (!detallesEmpresa || !detallesEmpresa[field as keyof DetallesEmpresa]) {
        newErrors[field] = "Este campo es obligatorio";
      }
    });

    // Date validations
    if (detallesEmpresa) {
      const fechaLimiteEmision = new Date(detallesEmpresa.fechaLimiteEmision);
      const fechaInicio = new Date(detallesEmpresa.fechaInicio);
    
      if (fechaLimiteEmision <= fechaInicio) {
        newErrors.fechaLimiteEmision = "La fecha límite de emisión debe ser mayor a la fecha de inicio.";
      }
    
      if (fechaInicio >= fechaLimiteEmision) {
        newErrors.fechaInicio = "La fecha de inicio debe ser menor a la fecha límite de emisión.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetalles((prevDetails) => prevDetails ? ({
      ...prevDetails,
      [name]: value
    }) : null);
  };

  const handleSave = () => {
    if (detallesEmpresa && validateForm()) {
      axios
        .put("http://localhost:4000/empresa", detallesEmpresa)
        .then((response) => {
          console.log("Información guardada exitosamente", response.data);
          alert("Información actualizada correctamente");
          navigate("/dashboard-admin/informacion-empresa");
        })
        .catch((error) => {
          console.error("Error al guardar los detalles de la empresa:", error.response?.data || error.message);
          alert("Ocurrió un error al guardar la información. Inténtalo de nuevo.");
        });
    }
  };

  if (!detallesEmpresa) {
    return <p>Cargando detalles de la empresa...</p>;
  }

  return (
    <Container>
      <Salir onClick={() => navigate("/dashboard-admin/informacion-empresa")} />
      <h2>Editar Detalles del Negocio</h2>
      <FormGroup>
        <Label>Nombre</Label>
        <Input
          type="text"
          name="nombre"
          value={detallesEmpresa.nombre}
          onChange={handleChange}
        />
        {errors.nombre && <ErrorMessage>{errors.nombre}</ErrorMessage>}
      </FormGroup>
      <FormGroup>
        <Label>Razón Social</Label>
        <Input
          type="text"
          name="razonSocial"
          value={detallesEmpresa.razonSocial}
          onChange={handleChange}
        />
        {errors.razonSocial && <ErrorMessage>{errors.razonSocial}</ErrorMessage>}
      </FormGroup>
      <FormGroup>
        <Label>RTN</Label>
        <Input
          type="text"
          name="rtn"
          value={detallesEmpresa.rtn}
          onChange={handleChange}
        />
        {errors.rtn && <ErrorMessage>{errors.rtn}</ErrorMessage>}
      </FormGroup>
      <FormGroup>
        <Label>Teléfono</Label>
        <Input
          type="text"
          name="teléfono"
          value={detallesEmpresa.Teléfono}
          onChange={handleChange}
        />
        {errors.Teléfono && <ErrorMessage>{errors.Teléfono}</ErrorMessage>}
      </FormGroup>
      <FormGroup>
        <Label>Correo Electronico</Label>
        <Input
          type="email"
          name="correo_electronico"
          value={detallesEmpresa.Correo_electronico}
          onChange={handleChange}
        />
        {errors.Correo_electronico && <ErrorMessage>{errors.Correo_electronico}</ErrorMessage>}
      </FormGroup>
      <FormGroup>
        <Label>Dirección Principal</Label>
        <Input
          type="text"
          name="direccion"
          value={detallesEmpresa.direccion}
          onChange={handleChange}
        />
        {errors.direccion && <ErrorMessage>{errors.direccion}</ErrorMessage>}
      </FormGroup>
      <FormGroup>
        <Label>CAI</Label>
        <Input
          type="text"
          name="cai"
          value={detallesEmpresa.cai}
          onChange={handleChange}
        />
        {errors.cai && <ErrorMessage>{errors.cai}</ErrorMessage>}
      </FormGroup>
      <FormGroup>
        <Label>Establecimiento</Label>
        <Input
          type="text"
          name="establecimiento"
          value={detallesEmpresa.establecimiento}
          onChange={handleChange}
        />
        {errors.establecimiento && <ErrorMessage>{errors.establecimiento}</ErrorMessage>}
      </FormGroup>
      <FormGroup>
        <Label>Punto de Emisión</Label>
        <Input
          type="text"
          name="puntoEmision"
          value={detallesEmpresa.puntoEmision}
          onChange={handleChange}
        />
        {errors.puntoEmision && <ErrorMessage>{errors.puntoEmision}</ErrorMessage>}
      </FormGroup>
      <FormGroup>
        <Label>Tipo de Documento</Label>
        <Input
          type="text"
          name="tipoDocumento"
          value={detallesEmpresa.tipoDocumento}
          onChange={handleChange}
        />
        {errors.tipoDocumento && <ErrorMessage>{errors.tipoDocumento}</ErrorMessage>}
      </FormGroup>
      <FormGroup>
        <Label>Factura Inicio</Label>
        <Input
          type="text"
          name="facturaInicio"
          value={detallesEmpresa.facturaInicio}
          onChange={handleChange}
        />
        {errors.facturaInicio && <ErrorMessage>{errors.facturaInicio}</ErrorMessage>}
      </FormGroup>
      <FormGroup>
        <Label>Factura Límite</Label>
        <Input
          type="text"
          name="facturaLimite"
          value={detallesEmpresa.facturaLimite}
          onChange={handleChange}
        />
        {errors.facturaLimite && <ErrorMessage>{errors.facturaLimite}</ErrorMessage>}
      </FormGroup>
      <FormGroup>
        <Label>Fecha Límite de Emisión</Label>
        <Input
          type="date"
          name="fechaLimiteEmision"
          value={detallesEmpresa.fechaLimiteEmision.split('T')[0]} // Solo la parte de la fecha
          onChange={handleChange}
        />
        {errors.fechaLimiteEmision && <ErrorMessage>{errors.fechaLimiteEmision}</ErrorMessage>}
      </FormGroup>
      <FormGroup>
        <Label>Fecha de Inicio</Label>
        <Input
          type="date"
          name="fechaInicio"
          value={detallesEmpresa.fechaInicio.split('T')[0]} // Solo la parte de la fecha
          onChange={handleChange}
        />
        {errors.fechaInicio && <ErrorMessage>{errors.fechaInicio}</ErrorMessage>}
      </FormGroup>
      <Button onClick={handleSave}>Guardar</Button>
    </Container>
  );
};

export default EditarDetallesEmpresa;

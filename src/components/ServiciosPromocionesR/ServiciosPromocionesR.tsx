
import styled from "styled-components";
import MostrarServicios from "./MostrarServiciosR";
import { useEffect, useState } from "react";

interface Servicio {
    Id: string;
    Nombre: string;
    Duracion: string;
    Precio: number;
  }


const Container = styled.div`
    margin: 40px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const ButtonGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const ServiciosPromociones = () => {

    const [servicios, setServicios] = useState<Servicio[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000/servicioss")
      .then((res) => res.json())
      .then((data) => setServicios(data));
  }, []);

    return (
        <Container>
            <h3 className="text-body-secondary">Gestion de Servicios</h3>
            
            <MostrarServicios servicios={servicios}/>
        </Container>
    );
};

export default ServiciosPromociones;

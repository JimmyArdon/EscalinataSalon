import { Link } from "react-router-dom";
import styled from "styled-components";
import MostrarServicios from "./MostrarServicios";
import FiltroProveedores from "../FiltroProveedores";
import { useEffect, useState } from "react";

interface Servicio {
    id: string;
    nombre: string;
    duracion: string;
    precio: number;
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
    fetch("https://66972cf402f3150fb66cd356.mockapi.io/api/v1/servicios")
      .then((res) => res.json())
      .then((data) => setServicios(data));
  }, []);

    return (
        <Container>
            <h3 className="text-body-secondary">Gestion de Servicios</h3>
            <ButtonGroup>
                <Link className="btn btn-outline-secondary w-40 h-10" to='agregar-servicio'>+ Añadir Servicio</Link>
                <Link className="btn btn-outline-secondary w-40 h-10" to='editar-servicio'>Editar Servicio</Link>
                <Link className="btn btn-outline-secondary w-40 h-10" to='borrar-servicio' >Borrar Servicio</Link>
                <FiltroProveedores setServicios={setServicios}/>
            </ButtonGroup> 
            <MostrarServicios servicios={servicios}/>
        </Container>
    );
};

export default ServiciosPromociones;

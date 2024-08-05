import { Link } from "react-router-dom";
import styled from "styled-components";
import MostrarServicios from "./MostrarServicios";

const Container = styled.div`
    margin: 40px;
    display: flex;
    flex-direction: column;
    gap: 20px;
` 

const ServiciosPromociones = () => {

  return (
    <Container>
      <h3 className="text-body-secondary">Gestion de Servicios</h3>
      <Link className="btn btn-outline-secondary w-40" to='servicio'>+ Añadir Servicio</Link>
      <MostrarServicios/>
    </Container>
  );
};

export default ServiciosPromociones;

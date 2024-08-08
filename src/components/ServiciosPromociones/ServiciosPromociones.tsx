import { Link } from "react-router-dom";
import styled from "styled-components";
import MostrarServicios from "./MostrarServicios";
import ShowPromociones from "./ShowPromociones";

const Container = styled.div`
    margin: 40px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 10px;
`;

const ServiciosPromociones = () => {
    return (
        <Container>
            <h3 className="text-body-secondary">Gestion de Servicios</h3>
            <ButtonGroup>
                <Link className="btn btn-outline-secondary w-40" to='agregar-servicio'>+ Añadir Servicio</Link>
                <Link className="btn btn-outline-secondary w-40" to='editar-servicio'>Editar Servicio</Link>
                <Link className="btn btn-outline-secondary w-40" to='borrar-servicio' >Borrar Servicio</Link>
            </ButtonGroup>
            <MostrarServicios />
            <h3 className="text-body-secondary">Tarifas y Promociones</h3>
            <ButtonGroup>
                <Link className="btn btn-outline-secondary w-40" to='agregar-promociones'>+ Añadir </Link>
                <Link className="btn btn-outline-secondary w-40" to='editar-promociones'>Editar</Link>
                <Link className="btn btn-outline-secondary w-40" to='borrar-promociones' >Borrar </Link>
            </ButtonGroup>
            <ShowPromociones />
        </Container>
    );
};

export default ServiciosPromociones;

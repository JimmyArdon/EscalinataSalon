import { Link } from "react-router-dom";
import styled from "styled-components";
import ShowPromociones from "../../ServiciosPromociones/ShowPromociones";

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

const PromocionesEnServicios = () => {
    return (<Container>
        <h3 className="text-body-secondary">Promociones y Bonificaciones</h3>
        <ButtonGroup>
          <Link
            className="btn btn-outline-secondary w-40"
            to="agregar-promociones"
          >
            + Añadir{" "}
          </Link>
          <Link
            className="btn btn-outline-secondary w-40"
            to="editar-promociones"
          >
            Editar
          </Link>
          <Link
            className="btn btn-outline-secondary w-40"
            to="borrar-promociones"
          >
            Borrar{" "}
          </Link>
        </ButtonGroup>
        <ShowPromociones />
      </Container>)
}

export default PromocionesEnServicios
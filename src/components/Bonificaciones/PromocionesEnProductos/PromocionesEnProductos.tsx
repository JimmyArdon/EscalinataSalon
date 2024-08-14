import { Link } from "react-router-dom";
import styled from "styled-components";
import ShowBonificaciones from "./ShowBonificaciones/ShowBonificaciones";

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

const PromocionesEnProductos = () => {
  return (
    <Container>
      <h3 className="text-body-secondary">Bonificaciones en Productos</h3>
      <ButtonGroup>
        <Link
          className="btn btn-outline-secondary w-40"
          to="agregar-bonificacion"
        >
          + Añadir{" "}
        </Link>
        <Link
          className="btn btn-outline-secondary w-40"
          to="editar-bonificacion"
        >
          Editar
        </Link>
        <Link
          className="btn btn-outline-secondary w-40"
          to="borrar-bonificacion"
        >
          Borrar{" "}
        </Link>
      </ButtonGroup>
      <ShowBonificaciones/>
    </Container>
  );
};

export default PromocionesEnProductos;

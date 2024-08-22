import styled from "styled-components";
import PromocionesEnServicios from "../../../components/Bonificaciones/ServiciosEnPromocion/PromocionesEnServicios";
import PromocionesEnProductos from "../../../components/Bonificaciones/PromocionesEnProductos/PromocionesEnProductos";


const Container = styled.div`
  margin: 40px;
  display: flex;
  flex-direction: column;
`;

const Bonificaciones: React.FC = () => {
  return (
    <Container>
        <PromocionesEnServicios/>
        <PromocionesEnProductos/>
    </Container>
  );
};

export default Bonificaciones;

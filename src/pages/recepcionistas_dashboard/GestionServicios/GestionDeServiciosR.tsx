import styled from "styled-components"
import ServiciosPromociones from "../../../components/ServiciosPromocionesR/ServiciosPromocionesR"


const Container = styled.div`
    background: linear-gradient(#ffffff, #f0f0f0, #e0e0e0);
    height: 100vh;
`

const GestionDeServicios = () => {
    return(
            <Container>
                <ServiciosPromociones/>   
            </Container>
    )
}

export default GestionDeServicios
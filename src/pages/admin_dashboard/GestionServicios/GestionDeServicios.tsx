import styled from "styled-components"
import ServiciosPromociones from "../../../components/ServiciosPromociones/ServiciosPromociones"
import MostrarPromociones from "../../../components/ServiciosPromociones/Promociones"

const Container = styled.div`
    background: linear-gradient(#ffffff, #f0f0f0, #e0e0e0);
    height: 100vh;
`

const GestionDeServicios = () => {
    return(
            <Container>
                <ServiciosPromociones/>
                <MostrarPromociones/>
            </Container>
    )
}

export default GestionDeServicios
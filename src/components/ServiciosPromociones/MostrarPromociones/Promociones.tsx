import { Link } from "react-router-dom"
import styled from "styled-components"
import ShowPromociones from "./ShowPromociones/ShowPromociones"

const Container = styled.div`
    margin: 40px;
    display: flex;
    gap: 20px;
    flex-direction: column;
`

const Promociones: React.FC = () => {
    return (
        <Container>
            <h3 className="text-body-secondary">Tarifas y Promociones</h3>
            <Link className="btn btn-outline-secondary w-50" to='promociones'>+ Añadir Promocion</Link>
            <ShowPromociones/>
        </Container>
    )
}

export default Promociones
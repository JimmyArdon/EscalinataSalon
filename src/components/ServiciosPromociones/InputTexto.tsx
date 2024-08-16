
import styled from "styled-components"
import { MdOutlineContentPasteSearch } from "react-icons/md";
import { useState } from "react";

const Container = styled.div`
    display: inline-block;
    position: relative;
`

const InputTextoEstilizado = styled.input`
    height: 56px;
    padding: 12px 16px;
    border-radius: 10px;
    border: 2px solid;
    border-color: rgb(111, 93, 68);
    background: transparent;
    box-sizing: border-box;
    width: 566px;
    color: #000;
    font-weight: 400;
    font-size: 20px;
    line-height: 20px;
    outline: none;
`
const IconSearch = styled(MdOutlineContentPasteSearch)`
    position: absolute;
    top: 10px;
    right: 530px;
    width: 38px !important;
    height: 38px;
    cursor: pointer;

    @media(max-width: 1400px) {
        right: 330px;
    }
`

type Servicio = {
    id: string;
    nombre: string;
    duracion: number;
    precio: number;
};


interface InputTextoProps {
    setServicio: React.Dispatch<React.SetStateAction<Servicio[]>>;
}

const InputTexto: React.FC<InputTextoProps> = ({ setServicio }) => {

    const [filtroServicios, setFiltroServicios] = useState("")

    const manejarOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFiltroServicios(e.target.value)
    }

    const manejarOnClick = () => {
        fetch(`https://66972cf402f3150fb66cd356.mockapi.io/api/v1/servicios?filter=${filtroServicios}`)
        .then(res => res.json())
        .then(data => setServicio(data))
    }

    return (
        <Container>
        <InputTextoEstilizado type="text" placeholder="¿Qué estás buscando?" value={filtroServicios} onChange={manejarOnChange}/>
        <IconSearch onClick={manejarOnClick} />
        </Container>
    )
    
}

export default InputTexto
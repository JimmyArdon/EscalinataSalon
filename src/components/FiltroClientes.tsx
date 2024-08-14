import React, { useState } from "react";
import styled from "styled-components";

const FilterContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const Input = styled.input`
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 0.875rem;
    width: 200px;
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.875rem;
    &:hover {
        background-color: #0056b3;
    }
`;

interface FiltroClientesProps {
    aplicarFiltros: (nombre: string) => void;
}

const FiltroClientes: React.FC<FiltroClientesProps> = ({ aplicarFiltros }) => {
    const [nombre, setNombre] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNombre(e.target.value);
    };

    const handleClick = () => {
        aplicarFiltros(nombre);
    };

    return (
        <FilterContainer>
            <Input
                type="text"
                value={nombre}
                onChange={handleChange}
                placeholder="Buscar por nombre..."
            />
            <Button onClick={handleClick}>Filtrar</Button>
        </FilterContainer>
    );
};

export default FiltroClientes;

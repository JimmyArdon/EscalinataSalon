import React, { useState } from 'react';

interface FiltroCitasProps {
    aplicarFiltros: (nombre: string, fecha: string) => void;
}

const FiltroCitas: React.FC<FiltroCitasProps> = ({ aplicarFiltros }) => {
    const [searchName, setSearchName] = useState("");
    const [searchDate, setSearchDate] = useState("");

    const handleSearch = () => {
        // Convertir la fecha a formato ISO (YYYY-MM-DD)
        const formattedDate = searchDate ? new Date(searchDate).toISOString().split('T')[0] : "";
        aplicarFiltros(searchName, formattedDate);
    };

    const handleReset = () => {
        setSearchName("");
        setSearchDate("");
        aplicarFiltros("", "");
    };

    return (
        <div className="flex flex-col md:flex-row items-center">
            <input
                type="text"
                placeholder="Buscar por nombre"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="p-2 border rounded-md mr-2 mb-2 md:mb-0"
            />
            <input
                type="date"
                placeholder="Buscar por fecha"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
                className="p-2 border rounded-md mr-2 mb-2 md:mb-0"
            />
            <button
                onClick={handleSearch}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
                Buscar
            </button>
            <button
                type="button"
                onClick={handleReset}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200 ml-2"
            >
                Limpiar
            </button>
        </div>
    );
};

export default FiltroCitas;

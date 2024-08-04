import React, { useState } from "react";

interface FiltroProveedoresProps {
    aplicarFiltros: (proveedor: string) => void;
}

const FiltroProveedores: React.FC<FiltroProveedoresProps> = ({ aplicarFiltros }) => {
    const [proveedor, setProveedor] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        aplicarFiltros(proveedor);
    };

    const handleReset = () => {
        setProveedor("");
        aplicarFiltros("");
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex flex-col">
                <label htmlFor="proveedor" className="font-bold mb-1">Proveedor:</label>
                <input
                    type="text"
                    id="proveedor"
                    value={proveedor}
                    onChange={(e) => setProveedor(e.target.value)}
                    className="p-2 border rounded-md"
                />
            </div>
            <div className="flex items-end">
                <button
                    type="submit"
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
        </form>
    );
};

export default FiltroProveedores;

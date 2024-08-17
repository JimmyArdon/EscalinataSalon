import React, { useState } from "react";
import { useLocation } from "react-router-dom";

type Servicio = { //Servicios
    id: string;
    nombre: string;
    duracion: number;
    precio: number;
};

interface FiltroProveedoresProps {
    aplicarFiltros: (proveedor: string) => void;
    setServicios: React.Dispatch<React.SetStateAction<Servicio[]>>; //Servicios
}

const FiltroProveedores: React.FC<FiltroProveedoresProps> = ({ aplicarFiltros, setServicios }) => {
    const [proveedor, setProveedor] = useState("");
    const [filtroServicios, setFiltroServicios] = useState("") //Servicios

    const ubicacion = useLocation()
    const urlActual = ubicacion.pathname;

    const lugar = urlActual === '/dashboard-admin/gestion-de-servicios'

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();    

        if (lugar) {
            try {
                const res = await fetch(`https://66972cf402f3150fb66cd356.mockapi.io/api/v1/servicios?filter=${filtroServicios}`);
                if (!res.ok) {
                    throw new Error(`Error: ${res.status} ${res.statusText}`);
                }
                const data = await res.json();

                if (data.length === 0) {
                    throw new Error("No se encontraron servicios con ese filtro.");
                }

                setServicios(data);
            } catch (error) {
                console.error("Error al filtrar servicios:", error);
                alert(error.message); 
            }
        } else {
            aplicarFiltros(proveedor);
        }
    };

    const handleReset = () => {

        lugar ? (setFiltroServicios("") ) : (setProveedor(""), aplicarFiltros(""))
    };
    

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex flex-col">
                <label htmlFor={lugar ? "servicio" : "proveedor"} className="font-bold mb-1">{lugar ? "Servicios: " : "Proveedor:"}</label>
                <input
                    type="text"
                    id={lugar ? "servicio" : "proveedor"}
                    value={lugar ? filtroServicios : proveedor}
                    onChange={ lugar ? (e) => setFiltroServicios(e.target.value)  : (e) => setProveedor(e.target.value)}
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

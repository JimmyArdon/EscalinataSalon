import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Proveedor {
    proveedor: string;
    dirección: string;
    telefono: string;
    email: string;
}

const AgregarProveedor: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Proveedor>({
        proveedor: "",
        dirección: "",
        telefono: "",
        email: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Proveedor added:', formData);
        
        navigate("/dashboard-admin/gestion-proveedores");
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Agregar Proveedor</h1>
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex flex-col mb-4">
                    <label htmlFor="proveedor" className="font-bold mb-1">Proveedor:</label>
                    <input
                        type="text"
                        id="proveedor"
                        name="proveedor"
                        value={formData.proveedor}
                        onChange={handleInputChange}
                        className="p-2 border rounded-md"
                        required
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="dirección" className="font-bold mb-1">Dirección:</label>
                    <input
                        type="text"
                        id="Dirección"
                        name="dirección"
                        value={formData.dirección}
                        onChange={handleInputChange}
                        className="p-2 border rounded-md"
                        required
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="telefono" className="font-bold mb-1">Teléfono:</label>
                    <input
                        type="text"
                        id="telefono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        className="p-2 border rounded-md"
                        required
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="email" className="font-bold mb-1">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="p-2 border rounded-md"
                        required
                    />
                </div>
                <div className="flex justify-between">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">Guardar</button>
                    <button
                        type="button"
                        onClick={() => navigate("/dashboard-admin/gestion-proveedores")}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AgregarProveedor;

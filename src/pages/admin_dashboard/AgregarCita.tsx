import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Cita {
    nombre: string;
    fecha: string;
    hora: string;
    detalle: string;
}

const AgregarCita: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Cita>({
        nombre: "",
        fecha: "",
        hora: "",
        detalle: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Cita added:', formData);

        navigate("/dashboard-admin/gestion-citas");
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Agregar Cita</h1>
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex flex-col mb-4">
                    <label htmlFor="nombre" className="font-bold mb-1">Nombre del Cliente:</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        className="p-2 border rounded-md"
                        required
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="fecha" className="font-bold mb-1">Fecha:</label>
                    <input
                        type="date"
                        id="fecha"
                        name="fecha"
                        value={formData.fecha}
                        onChange={handleInputChange}
                        className="p-2 border rounded-md"
                        required
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="hora" className="font-bold mb-1">Hora:</label>
                    <input
                        type="time"
                        id="hora"
                        name="hora"
                        value={formData.hora}
                        onChange={handleInputChange}
                        className="p-2 border rounded-md"
                        required
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="detalle" className="font-bold mb-1">Detalles:</label>
                    <textarea
                        id="detalle"
                        name="detalle"
                        value={formData.detalle}
                        onChange={handleInputChange}
                        className="p-2 border rounded-md"
                        rows={4}
                    />
                </div>
                <div className="flex justify-between">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">Guardar</button>
                    <button
                        type="button"
                        onClick={() => navigate("/dashboard-admin/gestion-citas")}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AgregarCita;

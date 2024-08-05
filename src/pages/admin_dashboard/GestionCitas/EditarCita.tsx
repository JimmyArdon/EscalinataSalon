import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Cita {
    nombre: string;
    fecha: string;
    hora: string;
    detalle: string;
}

const EditarCita: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [cita, setCita] = useState<Cita | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const data: Cita = {
                nombre: "Cliente Ejemplo",
                fecha: "2024-08-01",
                hora: "10:00",
                detalle: "Detalle de la cita",
            };
            setCita(data);
        };

        fetchData();
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (cita) {
            setCita({
                ...cita,
                [name]: value,
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Cita updated:', cita);
        navigate("/dashboard-admin/gestion-citas");
    };

    const handleExit = () => {
        navigate("/dashboard-admin/gestion-citas");
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Editar Cita</h1>
            {cita ? (
                <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
                    <div className="flex flex-col mb-4">
                        <label htmlFor="nombre" className="font-bold mb-1">Nombre del Cliente:</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={cita.nombre}
                            onChange={handleInputChange}
                            className="p-2 border rounded-md"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="fecha" className="font-bold mb-1">Fecha:</label>
                        <input
                            type="date"
                            id="fecha"
                            name="fecha"
                            value={cita.fecha}
                            onChange={handleInputChange}
                            className="p-2 border rounded-md"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="hora" className="font-bold mb-1">Hora:</label>
                        <input
                            type="time"
                            id="hora"
                            name="hora"
                            value={cita.hora}
                            onChange={handleInputChange}
                            className="p-2 border rounded-md"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="detalle" className="font-bold mb-1">Detalles:</label>
                        <textarea
                            id="detalle"
                            name="detalle"
                            value={cita.detalle}
                            onChange={handleInputChange}
                            className="p-2 border rounded-md"
                            rows={4}
                        />
                    </div>
                    <div className="flex space-x-4">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">Guardar Cambios</button>
                        <button type="button" onClick={handleExit} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200">Salir</button>
                    </div>
                </form>
            ) : (
                <p>Cargando datos de la cita...</p>
            )}
        </div>
    );
};

export default EditarCita;

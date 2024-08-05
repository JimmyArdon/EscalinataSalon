import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


interface Proveedor {
    proveedor: string;
    dirección: string;
    telefono: string;
    email: string;
}

const EditarProveedor: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [proveedor, setProveedor] = useState<Proveedor | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const data: Proveedor = {
                proveedor: "Proveedor" ,
                dirección: "SPS " ,
                telefono: "12345678",
                email: "contacto" + "@example.com",
            };
            setProveedor(data);
        };

        fetchData();
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (proveedor) {
            setProveedor({
                ...proveedor,
                [name]: value,
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Proveedor updated:', proveedor);
        navigate('/dashboard-admin/gestion-proveedores');
    };

    const handleExit = () => {
        navigate('/dashboard-admin/gestion-proveedores');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Editar Proveedor</h1>
            {proveedor ? (
                <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
                    <div className="flex flex-col mb-4">
                        <label htmlFor="proveedor" className="font-bold mb-1">Proveedor:</label>
                        <input
                            type="text"
                            id="proveedor"
                            name="proveedor"
                            value={proveedor.proveedor}
                            onChange={handleInputChange}
                            className="p-2 border rounded-md"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="dirección" className="font-bold mb-1">Dirección:</label>
                        <input
                            type="text"
                            id="dirección"
                            name="dirección"
                            value={proveedor.dirección}
                            onChange={handleInputChange}
                            className="p-2 border rounded-md"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="telefono" className="font-bold mb-1">Teléfono:</label>
                        <input
                            type="text"
                            id="telefono"
                            name="telefono"
                            value={proveedor.telefono}
                            onChange={handleInputChange}
                            className="p-2 border rounded-md"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="email" className="font-bold mb-1">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={proveedor.email}
                            onChange={handleInputChange}
                            className="p-2 border rounded-md"
                        />
                    </div>
                    <div className="flex space-x-4">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">Guardar Cambios</button>
                        <button type="button" onClick={handleExit} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200">Salir</button>
                    </div>
                </form>
            ) : (
                <p>Cargando datos del proveedor...</p>
            )}
        </div>
    );
};

export default EditarProveedor;

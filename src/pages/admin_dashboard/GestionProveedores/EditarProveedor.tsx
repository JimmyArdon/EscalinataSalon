import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IoMdCloseCircleOutline } from 'react-icons/io';

interface Proveedor {
    proveedor: string;
    dirección: string;
    telefono: string;
    email: string;
}

const initialData: Proveedor[] = [
    { proveedor: "Proveedor 1", dirección: "SPS 1", telefono: "12345678", email: "contacto1@example.com" },
    { proveedor: "Proveedor 2", dirección: "SPS 2", telefono: "87654321", email: "contacto2@example.com" },
];

const Container = styled.div`
  margin: 40px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  background-color: #d9d9d9;
  padding: 40px 0;
  border-radius: 10px;
  position: relative;
  height: 100%;
  box-sizing: border-box;
`;

const Salir = styled(IoMdCloseCircleOutline)`
  width: 50px;
  height: 50px;
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  transition: all 3s ease;

  &:hover {
    width: 60px;
    height: 60px;
    color: #8b4513;
  }
`;

const EditarProveedor: React.FC = () => {
    const navigate = useNavigate();
    const [searchName, setSearchName] = useState<string>('');
    const [proveedor, setProveedor] = useState<Proveedor | null>(null);

    const fetchProveedorByName = async (nombre: string) => {
        const foundProveedor = initialData.find(prov => prov.proveedor.toLowerCase() === nombre.toLowerCase());
        setProveedor(foundProveedor || null);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchProveedorByName(searchName);
    };

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

    const handleClear = () => {
        setSearchName('');
        setProveedor(null);
    };

    return (
        <Container>
            <Salir onClick={handleExit} />
            <h1 className="text-body-secondary mb-10 font-bold">
                Editar Proveedor
            </h1>
            <form onSubmit={handleSearch} className="mb-4">
                <label htmlFor="searchName" className="font-bold text-sm text-black mb-1">
                    Buscar por nombre:
                </label>
                <input
                    type="text"
                    id="searchName"
                    name="searchName"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="p-2 border rounded-md mb-4 w-full text-black"
                />
                <div className="flex space-between">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                        Buscar
                    </button>
                    <button type="button" onClick={handleClear} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                        Limpiar
                    </button>
                </div>
            </form>
            {proveedor ? (
                <form onSubmit={handleSubmit} className="bg-slate-700 p-10 rounded-[15px] w-2/4">
                    <div className="flex flex-col mb-4">
                        <label htmlFor="proveedor" className="font-bold text-sm text-white mb-1">Proveedor:</label>
                        <input
                            type="text"
                            id="proveedor"
                            name="proveedor"
                            value={proveedor.proveedor}
                            onChange={handleInputChange}
                            className="rounded-2 border-b-2 p-2 mb-4 w-full text-black"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="dirección" className="font-bold text-sm text-white mb-1">Dirección:</label>
                        <input
                            type="text"
                            id="dirección"
                            name="dirección"
                            value={proveedor.dirección}
                            onChange={handleInputChange}
                            className="rounded-2 border-b-2 p-2 mb-4 w-full text-black"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="telefono" className="font-bold text-sm text-white mb-1">Teléfono:</label>
                        <input
                            type="text"
                            id="telefono"
                            name="telefono"
                            value={proveedor.telefono}
                            onChange={handleInputChange}
                            className="rounded-2 border-b-2 p-2 mb-4 w-full text-black"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="email" className="font-bold text-sm text-white mb-1">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={proveedor.email}
                            onChange={handleInputChange}
                            className="rounded-2 border-b-2 p-2 mb-4 w-full text-black"
                        />
                    </div>
                    <div className="flex space-between">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                            Guardar Cambios
                        </button>
                        <button type="button" onClick={handleExit} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Salir
                        </button>
                    </div>
                </form>
            ) : (
                <p></p>
            )}
        </Container>
    );
};

export default EditarProveedor;

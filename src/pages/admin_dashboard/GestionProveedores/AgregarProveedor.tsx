import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoMdCloseCircleOutline } from "react-icons/io";

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
  transition: all 0.3s ease;

  &:hover {
    width: 60px; /* Aumenta el tamaño en el hover */
    height: 60px; /* Aumenta el tamaño en el hover */
    color: #8b4513;
  }
`;

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Proveedor added:", formData);

    // Simulación de guardar el proveedor
    // Aquí deberías hacer la llamada a la API para guardar el proveedor
    // ...

    navigate("/dashboard-admin/gestion-proveedores");
  };

  const manejarOnClickSalir = () => {
    navigate("/dashboard-admin/gestion-proveedores");
  };

  return (
    <Container>
      <Salir onClick={manejarOnClickSalir} />
      <h1 className="text-body-secondary mb-10 font-bold">Agregar Proveedor</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-slate-700 p-10 rounded-[15px] w-2/4"
      >
        <label htmlFor="proveedor" className="font-bold text-sm text-white">
          Proveedor
        </label>
        <input
          value={formData.proveedor}
          onChange={handleInputChange}
          required
          type="text"
          id="proveedor"
          name="proveedor"
          className="rounded-2 border-b-2 p-2 mb-4 w-full text-black"
          placeholder="Proveedor"
        />
        <label htmlFor="dirección" className="font-bold text-sm text-white">
          Dirección
        </label>
        <input
          value={formData.dirección}
          onChange={handleInputChange}
          required
          type="text"
          id="dirección"
          name="dirección"
          className="rounded-2 border-b-2 p-2 mb-4 w-full text-black"
          placeholder="Dirección"
        />
        <label htmlFor="telefono" className="font-bold text-sm text-white">
          Teléfono
        </label>
        <input
          value={formData.telefono}
          onChange={handleInputChange}
          required
          type="text"
          id="telefono"
          name="telefono"
          className="rounded-2 border-b-2 p-2 mb-4 w-full text-black"
          placeholder="Teléfono"
        />
        <label htmlFor="email" className="font-bold text-sm text-white">
          Email
        </label>
        <input
          value={formData.email}
          onChange={handleInputChange}
          required
          type="email"
          id="email"
          name="email"
          className="rounded-2 border-b-2 p-2 mb-4 w-full text-black"
          placeholder="Email"
        />
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Guardar
          </button>
          <button
            type="button"
            onClick={manejarOnClickSalir}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancelar
          </button>
        </div>
      </form>
    </Container>
  );
};

export default AgregarProveedor;

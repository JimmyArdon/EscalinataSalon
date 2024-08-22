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
    width: 60px;
    height: 60px;
    color: #8b4513;
  }
`;

interface Proveedor {
  Nombre: string;
  Direccion: string;
  Numero_Telefono: string;
  Email: string;
}

const AgregarProveedor: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Proveedor>({
    Nombre: "",
    Direccion: "",
    Numero_Telefono: "",
    Email: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    fetch("http://localhost:4000/proveedores", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error al enviar los datos');
        return res.json();
      })
      .then(() => navigate("/dashboard-admin/gestion-proveedores"))
      .catch((err) => setError(err.message));
  };

  const manejarOnClickSalir = () => {
    navigate("/dashboard-admin/gestion-proveedores");
  };

  return (
    <Container>
      <Salir onClick={manejarOnClickSalir} />
      <h1 className="text-body-secondary mb-10 font-bold">
        Agregar Proveedor
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-slate-700 p-10 rounded-[15px] w-2/4"
      >
        <label htmlFor="Nombre" className="font-bold text-sm text-white">
          Proveedor
        </label>
        <input
          value={formData.Nombre}
          onChange={handleInputChange}
          type="text"
          id="Nombre"
          name="Nombre"
          className="rounded-2 border-b-2 p-2 mb-4 w-full text-black"
          placeholder="Proveedor"
        />
        <label htmlFor="Direccion" className="font-bold text-sm text-white">
          Dirección
        </label>
        <input
          value={formData.Direccion}
          onChange={handleInputChange}
          type="text"
          id="Direccion"
          name="Direccion"
          className="rounded-2 border-b-2 p-2 mb-4 w-full text-black"
          placeholder="Dirección"
        />
        <label htmlFor="Numero_Telefono" className="font-bold text-sm text-white">
          Teléfono
        </label>
        <input
          value={formData.Numero_Telefono}
          onChange={handleInputChange}
          type="text"
          id="Numero_Telefono"
          name="Numero_Telefono"
          className="rounded-2 border-b-2 p-2 mb-4 w-full text-black"
          placeholder="Teléfono"
        />
        <label htmlFor="Email" className="font-bold text-sm text-white">
          Email
        </label>
        <input
          value={formData.Email}
          onChange={handleInputChange}
          type="email"
          id="Email"
          name="Email"
          className="rounded-2 border-b-2 p-2 mb-4 w-full text-black"
          placeholder="Email"
        />
        {error && <div className="text-red-500">{error}</div>}
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Guardar Proveedor
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

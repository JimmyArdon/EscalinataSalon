import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdCloseCircleOutline } from "react-icons/io";
import axios from "axios";

// Define la interfaz para un cliente
interface Cliente {
  id: number;
  Nombre: string;
  Rtn: string;
  Direccion: string;
  Numero_Telefono: string;
  Email: string;
}

const EditarCliente = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios.get<Cliente>(`http://localhost:4000/clientess/${id}`)
        .then((response) => {
          setCliente(response.data);
        })
        .catch(() => {
          setErrorMessage("No se pudo cargar el cliente.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setErrorMessage("ID del cliente no especificado.");
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (cliente) {
      setCliente({
        ...cliente,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cliente && id) {
      axios
        .put(`http://localhost:4000/clientess/${id}`, {
          Nombre: cliente.Nombre,
          Rtn: cliente.Rtn,
          Direccion: cliente.Direccion,
          Numero_Telefono: cliente.Numero_Telefono,
          Email: cliente.Email
        })
        .then(() => {
          navigate("/dashboard-admin/gestion-clientes");
        })
        .catch(() => {
          setErrorMessage("Error al guardar los cambios.");
        });
    }
};


  const manejarOnClickSalir = () => {
    navigate("/dashboard-admin/gestion-clientes");
  };

  return (
    <div className="p-10 bg-gray-200 rounded-lg relative">
      <IoMdCloseCircleOutline
        onClick={manejarOnClickSalir}
        className="absolute top-2 right-2 w-12 h-12 text-red-500 cursor-pointer transition-transform transform hover:scale-110"
      />
      <h1 className="text-xl font-bold mb-6">Editar Cliente</h1>
      {loading && <p className="text-gray-600">Cargando...</p>}
      {errorMessage && <p className="mt-2 text-red-500 font-semibold">{errorMessage}</p>}
      {cliente && (
        <form onSubmit={handleSubmit} className="bg-gray-300 p-6 rounded-lg">
          <div className="mb-4">
            <label htmlFor="Nombre" className="block mb-2 font-semibold">Nombre</label>
            <input
              id="Nombre"
              type="text"
              name="Nombre"
              value={cliente.Nombre || ""}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-400 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="Rtn" className="block mb-2 font-semibold">RTN</label>
            <input
              id="Rtn"
              type="text"
              name="Rtn"
              value={cliente.Rtn || ""}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-400 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="Numero_Telefono" className="block mb-2 font-semibold">Número de Teléfono</label>
            <input
              id="Numero_Telefono"
              type="text"
              name="Numero_Telefono"
              value={cliente.Numero_Telefono || ""}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-400 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="Direccion" className="block mb-2 font-semibold">Dirección</label>
            <input
              id="Direccion"
              type="text"
              name="Direccion"
              value={cliente.Direccion || ""}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-400 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="Email" className="block mb-2 font-semibold">Email</label>
            <input
              id="Email"
              type="Email"
              name="Email"
              value={cliente.Email || ""}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-400 rounded-md"
            />
          </div>
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Guardar Cambios</button>
        </form>
      )}
    </div>
  );
};

export default EditarCliente;

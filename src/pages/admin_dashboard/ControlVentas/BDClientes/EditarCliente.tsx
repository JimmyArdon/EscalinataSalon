import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdCloseCircleOutline } from "react-icons/io";
import axios from "axios";

// Define the interface for a client
interface Cliente {
  id: string;
  nombre: string;
  rtn: string;
  direccion: string;
}

const EditarCliente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState<Cliente>({
    id: "",
    nombre: "",
    rtn: "",
    direccion: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [opcionesFiltradas, setOpcionesFiltradas] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      axios.get(`https://example.com/api/clientes/${id}`)
        .then((response) => {
          setCliente(response.data);
        })
        .catch(() => {
          setErrorMessage("No se pudo cargar el cliente.");
        });
    }
  }, [id]);

  useEffect(() => {
    if (searchQuery) {
      setLoading(true);
      axios
        .get(
          `https://example.com/api/clientes?nombre=${searchQuery}`
        )
        .then((response) => {
          setOpcionesFiltradas(response.data);
        })
        .catch(() => {
          setOpcionesFiltradas([]);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setOpcionesFiltradas([]);
    }
  }, [searchQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .get(
        `https://example.com/api/clientes?nombre=${searchQuery}`
      )
      .then((response) => {
        if (response.data.length > 0) {
          setCliente(response.data[0]);
          setErrorMessage("");
        } else {
          setErrorMessage("No se encontró ningún cliente con ese nombre.");
        }
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .put(
        `https://example.com/api/clientes/${id}`,
        cliente
      )
      .then(() => {
        navigate("/dashboard-admin/gestion-clientes");
      })
      .catch(() => {
        setErrorMessage("Error al guardar los cambios.");
      });
  };

  const handleClear = () => {
    setCliente({
      id: "",
      nombre: "",
      rtn: "",      
      direccion: ""
    });
    setSearchQuery("");
    setOpcionesFiltradas([]);
  };

  const manejarOnClickSalir = () => {
    navigate("/dashboard-admin/control-ventas/gestion-clientes");
  };

  const seleccionarOpcion = (opcion: Cliente) => {
    setCliente(opcion);
    setSearchQuery(opcion.nombre);
    setOpcionesFiltradas([]);
  };

  return (
    <div className="p-10 bg-gray-200 rounded-lg relative">
      <IoMdCloseCircleOutline
        onClick={manejarOnClickSalir}
        className="absolute top-2 right-2 w-12 h-12 text-red-500 cursor-pointer transition-transform transform hover:scale-110"
      />
      <h1 className="text-xl font-bold mb-6">Editar Cliente</h1>
      <form onSubmit={handleSearch} className="bg-gray-300 p-6 rounded-lg mb-6">
        <div className="relative mb-4">
          <label htmlFor="searchQuery" className="block mb-2 font-semibold">Buscar por Nombre</label>
          <input
            id="searchQuery"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Nombre del cliente"
            className="w-full p-2 border border-gray-400 rounded-md"
            required
          />
          {searchQuery && opcionesFiltradas.length > 0 && (
            <ul className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-400 rounded-md shadow-lg max-h-40 overflow-y-auto z-10">
              {opcionesFiltradas.map((opcion) => (
                <li
                  key={opcion.id}
                  onClick={() => seleccionarOpcion(opcion)}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                >
                  {opcion.nombre}
                </li>
              ))}
            </ul>
          )}
          {loading && <p className="mt-2 text-gray-600">Cargando...</p>}
        </div>
        {errorMessage && <p className="mt-2 text-red-500 font-semibold">{errorMessage}</p>}
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Buscar</button>
        <button type="button" onClick={handleClear} className="ml-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Limpiar</button>
      </form>
      {cliente.nombre && (
        <form onSubmit={handleSubmit} className="bg-gray-300 p-6 rounded-lg">
          <div className="mb-4">
            <label htmlFor="nombre" className="block mb-2 font-semibold">Nombre</label>
            <input
              id="nombre"
              type="text"
              name="nombre"
              value={cliente.nombre}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-400 rounded-md"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="rtn" className="block mb-2 font-semibold">Teléfono</label>
            <input
              id="rtn"
              type="text"
              name="rtn"
              value={cliente.rtn}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-400 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="direccion" className="block mb-2 font-semibold">Dirección</label>
            <input
              id="direccion"
              type="text"
              name="direccion"
              value={cliente.direccion}
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

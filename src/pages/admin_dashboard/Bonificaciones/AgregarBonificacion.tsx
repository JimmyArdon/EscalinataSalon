import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdCloseCircleOutline } from "react-icons/io";
import styled from "styled-components";
import axios from "axios";

interface Bonificacion {
  Id: string;
  Descripcion: string;
  Precio_unitario: number;
  Producto_id: string;
}

interface Producto {
  Id: string;
  Nombre: string;
  Precio_venta: string;
}

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

const AgregarBonificacion: React.FC = () => {
  const [listaProductos, setListaProductos] = useState<Producto[]>([]);
  const [descripcion, setDescripcion] = useState("");
  const [precioUnitario, setPrecioUnitario] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [opcionesFiltradas, setOpcionesFiltradas] = useState<Producto[]>([]);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState<Producto | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:4000/productos')
      .then((response) => {
        setListaProductos(response.data);
        setOpcionesFiltradas(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setError('No se pudo cargar la lista de productos.');
      });
  }, []);

  useEffect(() => {
    if (busqueda === "") {
      setOpcionesFiltradas([]);
    } else {
      setOpcionesFiltradas(
        listaProductos.filter((producto) =>
          producto.Nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
          producto.Nombre !== opcionSeleccionada?.Nombre 
        )
      );
    }
  }, [busqueda, listaProductos, opcionSeleccionada]);


  const manejarOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!opcionSeleccionada) {
      setError("Debe seleccionar un producto.");
      return;
    }
  
    const url = "http://localhost:4000/bonificaciones"; // Asegúrate de que la URL y el endpoint sean correctos.
  
    const bonificacionData: Bonificacion = {
      Id: "", // O un valor válido si es necesario.
      Descripcion: descripcion, // Asegúrate de que esto esté lleno.
      Precio_unitario: parseFloat(precioUnitario), // Convierte el precioUnitario a número.
      Producto_id: opcionSeleccionada.Id, // Usa el ID del producto seleccionado.
    };
  
    try {
      await axios.post(url, bonificacionData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate("/dashboard-admin/bonificaciones");
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Error al enviar los datos.");
    }
  };
  
  
  

  const manejarBusqueda = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusqueda(e.target.value);
  };

  const seleccionarOpcion = (opcion: Producto) => {
    setOpcionSeleccionada(opcion);
    setBusqueda(opcion.Nombre); 
    setOpcionesFiltradas([]); 
  };

  return (
    <Container>
      <Salir onClick={() => navigate("/dashboard-admin/bonificaciones")} />
      <h1 className="text-body-secondary mb-10 font-bold">
        Agregar Bonificación
      </h1>
      <form
        onSubmit={manejarOnSubmit}
        className="bg-slate-700 p-10 rounded-[15px] w-2/4"
      >
        <label htmlFor="descripcion" className="font-bold text-sm text-white">
          Producto
        </label>
        <input
          value={busqueda}
          onChange={manejarBusqueda}
          type="text"
          id="descripcion"
          className="rounded-2 border-b-2 p-2 mb-4 w-full text-black"
          placeholder="Buscar producto"
        />
        {busqueda && opcionesFiltradas.length > 0 && (
          <ul className="bg-white border border-gray-300 rounded-lg mt-2">
            {opcionesFiltradas.map((producto) => (
              <li
                key={producto.Id}
                onClick={() => seleccionarOpcion(producto)}
                className="p-2 cursor-pointer hover:bg-gray-200"
              >
                {producto.Nombre}
              </li>
            ))}
          </ul>
        )}
        <label htmlFor="descripcionBonificacion" className="font-bold text-sm text-white">
          Descripción de la Bonificacion
        </label>
        <input
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          type="text"
          id="descripcionBonificacion"
          className="rounded-2 border-b-2 p-2 mb-4 w-full text-black"
          placeholder="Ingrese la descripción de la bonificación"
        />
        <label htmlFor="compre" className="font-bold text-sm text-white">
          Precio Unitario
        </label>
        <input
          value={precioUnitario}
          onChange={(e) => setPrecioUnitario(e.target.value)}
          type="number"
          id="compre"
          className="rounded-2 border-b-2 p-2 mb-4 w-full text-black"
          placeholder="Ingrese el número de productos a comprar"
        />
        {error && <div className="text-red-500">{error}</div>}
        <div className="flex justify-center">
          <button
            className="bg-slate-800 text-white px-4 py-2 mt-4 rounded hover:bg-slate-500"
            type="submit"
          >
            Agregar Bonificación
          </button>
        </div>
      </form>
    </Container>
  );
};

export default AgregarBonificacion;

import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdCloseCircleOutline } from "react-icons/io";
import styled from "styled-components";

interface Servicio {
  id: string;
  nombre: string;
  duracion:string;
  precio: string;
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

const AgregarPromocion: React.FC = () => {
  const [listaServicios, setListaServicios] = useState<Servicio[]>([]);
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [precioOriginal, setPrecioOriginal] = useState(""); // Almacenar el precio original del servicio
  const [descuento, setDescuento] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [opcionesFiltradas, setOpcionesFiltradas] = useState<Servicio[]>([]);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://66972cf402f3150fb66cd356.mockapi.io/api/v1/servicios')
      .then((res) => res.json())
      .then(data => {
        setListaServicios(data);
        setOpcionesFiltradas(data);
      });
  }, []);

  useEffect(() => {
    if (id) {
      fetch(`https://66972cf402f3150fb66cd356.mockapi.io/api/v1/tarifasPromociones/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setDescripcion(data.descripcion);
          setPrecio(data.precio);
          setPrecioOriginal(data.precio); // Guardar el precio original
          setDescuento(data.descuento);
          setOpcionSeleccionada(data.descripcion); // Preseleccionar la opción
          setBusqueda(data.descripcion); // Mostrar la opción en el input
        });
    }
  }, [id]);

  useEffect(() => {
    if (busqueda === "") {
      setOpcionesFiltradas([]);
    } else {
      setOpcionesFiltradas(
        listaServicios.filter((servicio) =>
          servicio.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
          servicio.nombre !== opcionSeleccionada // Excluir la opción seleccionada
        )
      );
    }
  }, [busqueda, listaServicios, opcionSeleccionada]);

  const calcularPrecioConDescuento = (precioOriginal: string, descuento: string) => {
    const precioNum = parseFloat(precioOriginal);
    const descuentoNum = parseFloat(descuento);
    if (isNaN(precioNum) || isNaN(descuentoNum)) return "";
    return (precioNum - (precioNum * descuentoNum / 100)).toFixed(2);
  };

  const validarDescripcion = () => {
    const servicioExiste = listaServicios.some(
      (servicio) => servicio.nombre.toLowerCase() === descripcion.toLowerCase()
    );
    if (!servicioExiste) {
      setError("El servicio seleccionado no es válido.");
      return false;
    }
    setError(null);
    return true;
  };

  const validarDescuento = () => {
    const descuentoNumero = Number(descuento);
    if (isNaN(descuentoNumero) || descuentoNumero < 1 || descuentoNumero > 100) {
      setError("El descuento debe ser un número entre 1 y 100.");
      return false;
    }
    setError(null);
    return true;
  };

  const manejarOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validarDescripcion() || !validarDescuento()) return; // Validar antes de proceder

    const url = id
      ? `https://66972cf402f3150fb66cd356.mockapi.io/api/v1/tarifasPromociones/${id}`
      : "https://66972cf402f3150fb66cd356.mockapi.io/api/v1/tarifasPromociones";

    const method = id ? "PUT" : "POST";

    await fetch(url, {
      method,
      body: JSON.stringify({ descripcion: opcionSeleccionada, precio, descuento }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/dashboard-admin/bonificaciones");
  };

  const manejarOnClickSalir = () => {
    navigate("/dashboard-admin/bonificaciones");
  };

  const manejarEliminar = async () => {
    if (id) {
      await fetch(`https://66972cf402f3150fb66cd356.mockapi.io/api/v1/tarifasPromociones/${id}`, {
        method: "DELETE",
      });
      navigate('/dashboard-admin/bonificaciones');
    }
  };

  const manejarBusqueda = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusqueda(e.target.value);
  };

  const seleccionarOpcion = (opcion: string) => {
    const servicioSeleccionado = listaServicios.find(
      (servicio) => servicio.nombre === opcion
    );

    if (servicioSeleccionado) {
      setOpcionSeleccionada(opcion);
      setDescripcion(opcion);
      setPrecioOriginal(servicioSeleccionado.precio); // Actualizar el precio original
      setPrecio(calcularPrecioConDescuento(servicioSeleccionado.precio, descuento)); // Calcular el precio con el descuento actual
      setBusqueda(opcion); // Mostrar la opción seleccionada en el input
      setOpcionesFiltradas([]); // Limpiar las opciones filtradas
    }
  };

  const manejarDescuento = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevoDescuento = e.target.value;
    setDescuento(nuevoDescuento);
    setPrecio(calcularPrecioConDescuento(precioOriginal, nuevoDescuento)); // Actualizar el precio con el nuevo descuento
  };

  return (
    <Container>
      <Salir onClick={manejarOnClickSalir} />
      <h1 className="text-body-secondary mb-10 font-bold">
        {id ? 'Editar Promocion' : 'Agregar Promocion'}
      </h1>
      <form
        onSubmit={manejarOnSubmit}
        className="bg-slate-700 p-10 rounded-[15px] w-2/4"
      >
        <label htmlFor="descripcion" className="font-bold text-sm text-white">
          Servicio
        </label>
        <input
          value={busqueda}
          onChange={manejarBusqueda}
          type="text"
          id="descripcion"
          className="rounded-2 border-b-2 p-2 mb-4 w-full text-black"
          placeholder="Buscar servicio"
        />
        {busqueda && opcionesFiltradas.length > 0 && (
          <ul className="bg-white border border-gray-300 rounded-lg mt-2">
            {opcionesFiltradas.map((servicio) => (
              <li
                key={servicio.id}
                onClick={() => seleccionarOpcion(servicio.nombre)}
                className="p-2 cursor-pointer hover:bg-gray-200"
              >
                {servicio.nombre}
              </li>
            ))}
          </ul>
        )}
        <label htmlFor="descuento" className="font-bold text-sm text-white">
          Descuento
        </label>
        <input
          value={descuento}
          onChange={manejarDescuento}
          type="text"
          id="descuento"
          className="rounded-2 border-b-2 p-2 mb-4 w-full text-black"
          placeholder="Ingrese el descuento en %"
        />
        {error && <div className="text-red-500">{error}</div>}
        <div className="flex justify-center">
          <button
            className="bg-slate-800 text-white px-4 py-2 mt-4 rounded hover:bg-slate-500"
            type="submit"
          >
            {id ? 'Actualizar Promoción' : 'Agregar Promoción'}
          </button>
          {id && (
            <button
              className="bg-red-500 text-white px-4 py-2 mt-4 ml-4 rounded hover:bg-red-700"
              onClick={manejarEliminar}
              type="button"
            >
              Eliminar Promoción
            </button>
          )}
        </div>
      </form>
    </Container>
  );
};

export default AgregarPromocion;

import { FormEvent, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdCloseCircleOutline } from "react-icons/io";
import styled from "styled-components";

interface Servicio {
  Id: string;
  Nombre: string;
  Duracion:string;
  Precio: string;
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
  const hoy = new Date().toISOString().split('T')[0];
  const [fechaInicio, setFechaInicio] = useState<string>(hoy);
  const [fechaFinal, setFechaFinal] = useState<string>(hoy);
  const [busqueda, setBusqueda] = useState("");
  const [opcionesFiltradas, setOpcionesFiltradas] = useState<Servicio[]>([]);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:6500/servicios')
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
          servicio.Nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
          servicio.Nombre !== opcionSeleccionada // Excluir la opción seleccionada
        )
      );
    }
  }, [busqueda, listaServicios, opcionSeleccionada]);

  const calcularPrecioConDescuento = (precioOriginal: string, descuento: string) => {
    const precioNum = parseFloat(precioOriginal);
    const descuentoNum = parseFloat(descuento);
    if (isNaN(precioNum) || isNaN(descuentoNum)) return"";
    return (precioNum - (precioNum * descuentoNum / 100)).toFixed(2);
  };
  
  const validarDescripcion = useCallback(() => {
    const servicioExiste = listaServicios.some(
      (servicio) => servicio.Nombre.toLowerCase() === descripcion.toLowerCase()
    );
    if (!servicioExiste) {
      setError("El servicio seleccionado no es válido.");
      return false;
    }
    setError(null);
    return true;
  }, [descripcion, listaServicios]);
  
  const validarDescuento = useCallback(() => {
    const descuentoNumero = Number(descuento);
    if (isNaN(descuentoNumero) || descuentoNumero < 1 || descuentoNumero > 100) {
      setError("El descuento debe ser un número entre 1 y 100.");
      return false;
    }
    setError(null);
    return true;
  }, [descuento]);
  
  const validarFechas = useCallback(() => {
    const hoy = new Date().toISOString().split('T')[0];
    
  
    if (fechaInicio < hoy) {
      setError("La fecha de inicio no puede ser anterior a hoy.");
      return false;
    }
  
    if (fechaFinal <= fechaInicio) {
      setError("La fecha final debe ser al menos un día después de la fecha de inicio.");
      return false;
    }
  
    setError(null);
    return true;
  }, [fechaInicio, fechaFinal]);
  

  const manejarOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validarDescripcion() || !validarDescuento() || !validarFechas()) return; // Validar antes de proceder

    const url = id
      ? `https://66972cf402f3150fb66cd356.mockapi.io/api/v1/tarifasPromociones/${id}`
      : "https://66972cf402f3150fb66cd356.mockapi.io/api/v1/tarifasPromociones";

    const method = id ? "PUT" : "POST";

    await fetch(url, {
      method,
      body: JSON.stringify({ 
                             descripcion: opcionSeleccionada, 
                             precio, 
                             descuento, 
                             fechaInicio, 
                             fechaFinal,
                            }),
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

  const manejarBusqueda = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setBusqueda(e.target.value);
  }, []);
  
  const seleccionarOpcion = useCallback((opcion: string) => {
    const servicioSeleccionado = listaServicios.find(
      (servicio) => servicio.Nombre === opcion
    );
  
    if (servicioSeleccionado) {
      setOpcionSeleccionada(opcion);
      setDescripcion(opcion);
      setPrecioOriginal(servicioSeleccionado.Precio);
      setPrecio(calcularPrecioConDescuento(servicioSeleccionado.Precio, descuento));
      setBusqueda(opcion);
      setOpcionesFiltradas([]);
    }
  }, [listaServicios, calcularPrecioConDescuento, descuento]);

  const manejarDescuento = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevoDescuento = e.target.value;
    setDescuento(nuevoDescuento);
    setPrecio(calcularPrecioConDescuento(precioOriginal, nuevoDescuento)); // Actualizar el Precio con el nuevo descuento
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
                key={servicio.Id}
                onClick={() => seleccionarOpcion(servicio.Nombre)}
                className="p-2 cursor-pointer hover:bg-gray-200"
              >
                {servicio.Nombre}
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
        <label htmlFor="fechaInicio" className="font-bold text-sm text-white">
          Fecha Inicial
        </label>
        <input
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          type="date"
          id="fechaInicio"
          className="rounded-2 border-b-2 p-2 mb-4 w-full text-black"
          placeholder="Ingrese la fecha de Inicio"
          min={hoy}
        />
        <label htmlFor="fechaFinal" className="font-bold text-sm text-white">
          Fecha de Finalizacion
        </label>
        <input
          value={fechaFinal}
          onChange={(e) => setFechaFinal(e.target.value)}
          type="date"
          id="fechaFinal"
          className="rounded-2 border-b-2 p-2 mb-4 w-full text-black"
          placeholder="Ingrese la fecha de finalizacion"
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

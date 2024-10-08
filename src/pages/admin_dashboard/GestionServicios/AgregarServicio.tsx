import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  transition: all 3s ease;

  &:hover {
    width: 60px;
    height: 60px;
    color: #8b4513;
  }
`;

const AgregarServicio: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [duracion, setDuracion] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:4000/servicios/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setNombre(data.Nombre);
          setDuracion(data.Duracion);
          setPrecio(data.Precio);
          setDescripcion(data.Descripcion);
        });
    }
  }, [id]);

  const navigate = useNavigate();

  const manejarOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const servicio = {
      Nombre: nombre,
      Duracion: duracion,
      Precio: precio,
      Descripcion: descripcion,
    };

    if (id) {
      await fetch(`http://localhost:4000/servicios/${id}`, {
        method: "PUT",
        body: JSON.stringify(servicio),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      await fetch("http://localhost:4000/servicios", {
        method: "POST",
        body: JSON.stringify(servicio),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    navigate("/dashboard-admin/gestion-de-servicios");
  };

  const manejarOnClickSalir = () => {
    navigate("/dashboard-admin/gestion-de-servicios");
  };

  return (
    <Container>
      <Salir onClick={manejarOnClickSalir} />
      <h1 className="text-body-secondary mb-10 font-bold">
        {id ? 'Editar Servicio' : 'Agregar Servicio'}
      </h1>
      <form
        onSubmit={manejarOnSubmit}
        className="bg-slate-700 p-10 rounded-[15px] w-2/4"
      >
        <label htmlFor="titulo" className="font-bold text-sm text-white">
          Servicio
        </label>
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          type="text"
          id="titulo"
          className="rounded-2 border-b-2 p-2 mb-4 w-full text-black"
          placeholder="Servicio"
        />
        <label htmlFor="duracion" className="font-bold text-sm text-white">
          Duracion
        </label>
        <input
          value={duracion}
          onChange={(e) => setDuracion(e.target.value)}
          required
          type="text"
          id="duracion"
          className="rounded-2 border-b-2 p-2 mb-4 w-full text-black"
          placeholder="Duracion"
        />
        <label htmlFor="precio" className="font-bold text-sm text-white">
          Precio
        </label>
        <input
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
          type="text"
          id="precio"
          className="rounded-2 border-b-2 p-2 mb-4 w-full text-black"
          placeholder="Precio"
        />
        <label htmlFor="descripcion" className="font-bold text-sm text-white">
          Descripcion
        </label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
          id="descripcion"
          className="rounded-2 border-b-2 p-2 mb-4 w-full text-black"
          placeholder="Descripcion"
        />
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Guardar
          </button>
          {id && (
            <button
              onClick={async () => {
                await fetch(`http://localhost:4000/servicios/${id}`, {
                  method: "DELETE",
                });
                navigate("/dashboard-admin/gestion-de-servicios");
              }}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Eliminar
            </button>
          )}
        </div>
      </form>
    </Container>
  );
};

export default AgregarServicio;
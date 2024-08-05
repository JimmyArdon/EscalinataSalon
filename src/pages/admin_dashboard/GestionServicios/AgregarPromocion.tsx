import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdCloseCircleOutline } from "react-icons/io";
import styled from "styled-components";

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
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [descuento, setDescuento] = useState("");

  const { id } = useParams();
  
  useEffect(() => {
    if (id) {
      fetch(`https://66972cf402f3150fb66cd356.mockapi.io/api/v1/tarifasPromociones/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setDescripcion(data.descripcion);
          setPrecio(data.precio);
          setDescuento(data.descuento);
        });
    }
  }, [id]);

  const navigate = useNavigate();

  const manejarOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const url = id
      ? `https://66972cf402f3150fb66cd356.mockapi.io/api/v1/tarifasPromociones/${id}`
      : "https://66972cf402f3150fb66cd356.mockapi.io/api/v1/tarifasPromociones";

    const method = id ? "PUT" : "POST";

    await fetch(url, {
      method,
      body: JSON.stringify({ descripcion, precio, descuento }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/dashboard-recepcionista/main/gestion-de-servicios");
  };

  const manejarOnClickSalir = () => {
    navigate("/dashboard-recepcionista/main/gestion-de-servicios");
  };

  const manejarEliminar = async () => {
    if (id) {
      await fetch(`https://66972cf402f3150fb66cd356.mockapi.io/api/v1/tarifasPromociones/${id}`, {
        method: "DELETE",
      });
      navigate('/dashboard-recepcionista/gestion-de-servicios');
    }
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
          Descripcion
        </label>
        <input
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
          type="text"
          id="descripcion"
          className="rounded-2 border-b-2 p-2 mb-4 w-full text-black"
          placeholder="Descripcion"
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
        <label htmlFor="descuento" className="font-bold text-sm text-white">
          Descuento
        </label>
        <input
          value={descuento}
          onChange={(e) => setDescuento(e.target.value)}
          required
          type="text"
          id="descuento"
          className="rounded-2 border-b-2 p-2 mb-4 w-full text-black"
          placeholder="Descuento"
        />
        <div className="flex justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Guardar
          </button>
          {id && (
            <button 
              type="button"
              onClick={manejarEliminar}
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

export default AgregarPromocion;

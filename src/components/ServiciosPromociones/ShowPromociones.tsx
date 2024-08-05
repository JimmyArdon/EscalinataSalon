import { useEffect, useState } from "react";
import PromocionesCard from "./PromocionesCard";

interface Promocion {
  id: string;
  descripcion: string;
  precio: number;
  descuento: number;
}

const ShowPromociones: React.FC = () => {
  const [promociones, setPromociones] = useState<Promocion[]>([]);

  useEffect(() => {
    fetch("https://66972cf402f3150fb66cd356.mockapi.io/api/v1/tarifasPromociones")
      .then((res) => res.json())
      .then((data) => setPromociones(data));
  }, []);

  const handleDelete = (id: string) => {
    // Lógica para eliminar la promoción
    const nuevasPromociones = promociones.filter(promocion => promocion.id !== id);
    setPromociones(nuevasPromociones);
  };

  return (
    <div className="box-border">
      <table className="table">
        <thead>
          <tr className="table-active">
            <th scope="col">ID</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Descuento</th>
            <th scope="col">Precio</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {promociones.map((promocion) => (
            <PromocionesCard promocion={promocion} key={promocion.id} onDelete={handleDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowPromociones;

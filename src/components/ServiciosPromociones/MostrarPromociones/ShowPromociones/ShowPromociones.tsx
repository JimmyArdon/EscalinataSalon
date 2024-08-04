import { useEffect, useState } from "react";
import PromocionesCard from "./PromocionesCard/PromocionesCard";

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

  return (
    <div className="box-border">
      <table className="table">
        <thead>
          <tr className="table-active">
            <th scope="col">ID</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Descuento</th>
            <th scope="col">precio</th>
          </tr>
        </thead>
        <tbody>
          {promociones.map((promocion) => (
            <PromocionesCard promocion = {promocion} key={promocion.id}/>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowPromociones;


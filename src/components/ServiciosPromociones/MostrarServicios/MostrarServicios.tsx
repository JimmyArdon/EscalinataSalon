import { useEffect, useState } from "react";
import ServicioCard from "./ServicioCard/ServicioCard";

interface Servicio {
  id: string;
  nombre: string;
  duracion: string;
  precio: number;
}

const MostrarServicios: React.FC = () => {
  const [servicios, setServicios] = useState<Servicio[]>([]);

  useEffect(() => {
    fetch("https://66972cf402f3150fb66cd356.mockapi.io/api/v1/servicios")
      .then((res) => res.json())
      .then((data) => setServicios(data));
  }, []);

  return (
    <div className="box-border">
      <table className="table">
        <thead>
          <tr className="table-active">
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Duración</th>
            <th scope="col">Precio</th>
          </tr>
        </thead>
        <tbody>
          {servicios.map((servicio) => (
            <ServicioCard servicio = {servicio} key={servicio.id}/>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MostrarServicios;
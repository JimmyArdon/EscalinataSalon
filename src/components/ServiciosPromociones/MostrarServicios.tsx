import { useEffect, useState } from "react";
import ServicioCard from "./ServicioCard";
import styled from "styled-components";
import Pagination from "../Pagination";

interface Servicio {
  id: string;
  nombre: string;
  duracion: string;
  precio: number;
}

const Container = styled.div`
  margin: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MostrarServicios: React.FC = () => {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [serviciosPerPage] = useState(5);

  useEffect(() => {
    fetch("https://66972cf402f3150fb66cd356.mockapi.io/api/v1/servicios")
      .then((res) => res.json())
      .then((data) => setServicios(data));
  }, []);

  
  // Get current posts
  const indexOfLastServicio = currentPage * serviciosPerPage;
  const indexOfFirstServicio = indexOfLastServicio - serviciosPerPage;
  const currentServicios = servicios.slice(indexOfFirstServicio, indexOfLastServicio);

  const totalPages = Math.ceil(servicios.length / serviciosPerPage);

  const onPageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Container>
      <h3 className="text-body-secondary">Servicios</h3>
      <div className="box-border">
        <table className="table">
          <thead>
            <tr className="table-active">
              <th scope="col">Nombre</th>
              <th scope="col">Duracion</th>
              <th scope="col">Precio</th>
            </tr>
          </thead>
          <tbody>
            {currentServicios.map((servicio) => (
              <ServicioCard servicio={servicio} key={servicio.id}/>
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </Container>
  );
};

export default MostrarServicios;

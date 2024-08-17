import ServicioCard from "./ServicioCard";
import styled from "styled-components";
import Pagination from "../Pagination";
import { useState } from "react";

const Container = styled.div`
  margin: 0 20px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

interface Servicio {
  id: string;
  nombre: string;
  duracion: string;
  precio: number;
}

interface MostrarServiciosProps {
  servicios: Servicio[];
}

const MostrarServicios: React.FC<MostrarServiciosProps> = ({ servicios }) => {
  
  const [currentPage, setCurrentPage] = useState(1);
  const [serviciosPerPage] = useState(5);

  
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

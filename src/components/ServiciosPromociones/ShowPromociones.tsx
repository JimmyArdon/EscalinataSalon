import { useEffect, useState } from "react";
import PromocionesCard from "./PromocionesCard";
import styled from "styled-components";
import Pagination from "../Pagination";

interface PromocionServicio {
  Id: string;
  Descuento: number;
  Fecha_inicio: string;
  Fecha_fin: string;
  Servicio_id: string;
}

const Container = styled.div`
  margin: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ShowPromociones: React.FC = () => {
  const [promociones, setPromociones] = useState<PromocionServicio[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [promocionesPerPage] = useState(10);

  useEffect(() => {
    fetch("http://localhost:4000/promociones-servicios")
      .then((res) => res.json())
      .then((data) => setPromociones(data));
  }, []);

  

  // Get current posts
  const indexOfLastPromocion = currentPage * promocionesPerPage;
  const indexOfFirstPromocion = indexOfLastPromocion - promocionesPerPage;
  const currentPromociones = promociones.slice(indexOfFirstPromocion, indexOfLastPromocion);

  const totalPages = Math.ceil(promociones.length / promocionesPerPage);

  const onPageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Container>
      <h3 className="text-body-secondary">Promociones para los Servicios</h3>
      <div className="box-border">
        <table className="table">
          <thead>
            <tr className="table-active">
              <th className="text-center" scope="col">Servicio</th>
              <th className="text-center" scope="col">Descuento</th>
              <th className="text-center" scope="col">Precio con Descuento</th>
              <th className="text-center" scope="col">Inicio</th>
              <th className="text-center" scope="col">Final</th>
            </tr>
          </thead>
          <tbody>
            {currentPromociones.map((promocion) => (
              <PromocionesCard promocion={promocion} key={promocion.Id} />
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

export default ShowPromociones;

import { useEffect, useState } from "react";
import PromocionesCard from "./PromocionesCard";
import styled from "styled-components";
import Pagination from "../Pagination";

interface Promocion {
  id: string;
  descripcion: string;
  precio: number;
  descuento: number;
}

const Container = styled.div`
  margin: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ShowPromociones: React.FC = () => {
  const [promociones, setPromociones] = useState<Promocion[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [promocionesPerPage] = useState(10);

  useEffect(() => {
    fetch("https://66972cf402f3150fb66cd356.mockapi.io/api/v1/tarifasPromociones")
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
      <h3 className="text-body-secondary">Promociones en Servicios</h3>
      <div className="box-border">
        <table className="table">
          <thead>
            <tr className="table-active">
              <th scope="col">ID</th>
              <th scope="col">Servicio</th>
              <th scope="col">Descuento</th>
              <th scope="col">PrecioD</th>
            </tr>
          </thead>
          <tbody>
            {currentPromociones.map((promocion) => (
              <PromocionesCard promocion={promocion} key={promocion.id} />
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

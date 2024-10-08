import { useEffect, useState } from "react";
import styled from "styled-components";
import Pagination from "../../../Pagination";
import BonificacionesCard from "../../BonificacionesCard/BonificacionesCard";

interface Bonificacion {
  Id: string;
  Descripcion: string;
  Precio_unitario: number;
  Producto_id: string;
}

const Container = styled.div`
  margin: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ShowBonificaciones: React.FC = () => {
  const [bonificaciones, setBonificaciones] = useState<Bonificacion[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [promocionesPerPage] = useState(10);

  useEffect(() => {
    fetch("http://localhost:4000/bonificaciones")
      .then((res) => res.json())
      .then((data) => setBonificaciones(data)
      );
  }, []);

  

  // Get current posts
  const indexOfLastPromocion = currentPage * promocionesPerPage;
  const indexOfFirstPromocion = indexOfLastPromocion - promocionesPerPage;
  const currentBonificaciones = bonificaciones.slice(indexOfFirstPromocion, indexOfLastPromocion);

  const totalPages = Math.ceil(bonificaciones.length / promocionesPerPage);

  const onPageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Container>
      <h3 className="text-body-secondary">Bonificaciones en los Productos</h3>
      <div className="box-border">
        <table className="table">
          <thead>
            <tr className="table-active">
              <th className="text-center" scope="col">Producto</th>
              <th className="text-center" scope="col">Marca</th>
              <th className="text-center" scope="col">Descripcion</th>
              <th className="text-center" scope="col">Precio Unitario con Descuento</th>
            </tr>
          </thead>
          <tbody>
            {currentBonificaciones.map((bonificacion) => (
              <BonificacionesCard bonificacion={bonificacion} key={bonificacion.Id} />
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

export default ShowBonificaciones;

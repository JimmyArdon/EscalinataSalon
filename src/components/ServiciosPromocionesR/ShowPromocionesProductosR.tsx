import styled from "styled-components";

const Container = styled.div`
  margin: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ShowPromocionesProductos = () => {
  return (
    <Container>
      <h3 className="text-body-secondary">Promociones para los Productos</h3>
      <div className="box-border">
        <table className="table">
          <thead>
            <tr className="table-active">
              <th scope="col">Producto</th>
              <th scope="col">Descripcion</th>
              <th scope="col">Precio Unitario</th>
            </tr>
          </thead>
          <tbody>
            {/* {currentPromociones.map((promocion) => (
              <PromocionesCard promocion={promocion} key={promocion.id} />
            ))} */}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default ShowPromocionesProductos;

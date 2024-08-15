import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTrashAlt } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  margin-bottom: 20px;
`;

const InfoSection = styled.div`
  flex: 1;
  padding-right: 20px;
  text-align: left;
`;

const Title = styled.h1`
  color: #333;
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const InfoContainer = styled.div`
  margin-bottom: 20px;
`;

const InfoItem = styled.p`
  margin: 5px 0;
  font-size: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TableContainer = styled.div`
  max-height: 400px; 
  overflow-y: auto;
  width: 100%;
  margin-top: 20px;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  font-family: 'Arial', sans-serif;
`;

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 6px; /* Reducido el padding */
  text-align: left;
  background-color: #ccc5b7;
  color: #333;
  font-size: 0.875rem; /* Tamaño de fuente reducido */
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 6px; /* Reducido el padding */
  text-align: left;
  font-size: 0.875rem; /* Tamaño de fuente reducido */
`;

const FormSection = styled.div`
  flex: 1;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const InvoiceTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 20px;
`;

const InvoiceTableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
  background-color: #ccc5b7;
  color: #333;
`;

const InvoiceTableCell = styled.td`
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
`;

const BottomSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const AddClientButton = styled.button`
  padding: 5px 10px; /* Reducción de padding para hacer el botón más pequeño */
  margin-left: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.875rem; /* Tamaño de fuente reducido */
  &:hover {
    background-color: #0056b3;
  }
`;

const TotalRow = styled.tr`
  background-color: #f2f2f2;
  font-weight: bold;
`;

const Venta: React.FC = () => {
  const [searchTerm, setSearchTerm ] = useState('');
  const [products, setProducts] = useState([
    {
        code: '123456',
        quantity: 2,
        concept: 'Producto A',
        unitPrice: 10,
        subTotal: 20,
        discount: 5,
        total: 15,
      },
      {
        code: '123456',
        quantity: 2,
        concept: 'Producto A',
        unitPrice: 10,
        subTotal: 20,
        discount: 5,
        total: 15,
      },
      {
        code: '123456',
        quantity: 2,
        concept: 'Producto A',
        unitPrice: 10,
        subTotal: 20,
        discount: 5,
        total: 15,
      },
      {
        code: '123456',
        quantity: 2,
        concept: 'Producto A',
        unitPrice: 10,
        subTotal: 20,
        discount: 5,
        total: 15,
      },
      {
        code: '123456',
        quantity: 2,
        concept: 'Producto A',
        unitPrice: 10,
        subTotal: 20,
        discount: 5,
        total: 15,
      }, {
        code: '123456',
        quantity: 2,
        concept: 'Producto A',
        unitPrice: 10,
        subTotal: 20,
        discount: 5,
        total: 15,
      },
    // Más filas de productos aquí
  ]);

  // Datos para el rango autorizado
  const establecimiento = '000';
  const puntoDeEmision = '001';
  const tipoDocumento = '01';
  const facturaInicio = '00000301';
  const facturaFin = '00000400';
  const facturaActual = '00000327';

  // Concatenar el rango autorizado
  const rangoAutorizado = `${establecimiento}-${puntoDeEmision}-${tipoDocumento} ${facturaInicio} 
  al ${establecimiento}-${puntoDeEmision}-${tipoDocumento} ${facturaFin}`;

  const factActual = `${establecimiento}-${puntoDeEmision}-${tipoDocumento} ${facturaActual}`;

  const filteredProducts = products.filter((product) =>
    product.concept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleQuantityChange = (index: number, value: string) => {
    const newQuantity = parseInt(value, 10) || 0;
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      const product = { ...updatedProducts[index] };
      product.quantity = newQuantity;
      product.subTotal = product.unitPrice * newQuantity;
      product.total = product.subTotal - product.discount;
      updatedProducts[index] = product;
      return updatedProducts;
    });
  };

  const handleUnitPriceChange = (index: number, value: string) => {
    const newUnitPrice = parseFloat(value) || 0;
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      const product = { ...updatedProducts[index] };
      product.unitPrice = newUnitPrice;
      product.subTotal = product.quantity * newUnitPrice;
      product.total = product.subTotal - product.discount;
      updatedProducts[index] = product;
      return updatedProducts;
    });
  };

  const handleDiscountChange = (index: number, value: string) => {
    const newDiscount = parseFloat(value) || 0;
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      const product = { ...updatedProducts[index] };
      product.discount = newDiscount;
      product.total = product.subTotal - newDiscount;
      updatedProducts[index] = product;
      return updatedProducts;
    });
  };

  const handleDeleteProduct = (index: number) => {
    setProducts((prevProducts) => prevProducts.filter((_, i) => i !== index));
  };

  const handleAddClient = () => {
    // Implementar lógica para agregar un cliente aquí
    alert('Funcionalidad para agregar cliente aún no implementada.');
  };

  const calculateTotalSale = () => {
    return products.reduce((acc, product) => acc + product.total, 0);
  };

  return (
    <Container>
      <Title>Factura</Title>
      <TopSection>
        <InfoSection>
          <InfoContainer>
            <InfoItem><strong>Nombre:</strong> Inversiones Estéticas C&C</InfoItem>
            <InfoItem><strong>RTN:</strong> 05019021339269</InfoItem>
            <InfoItem><strong>Teléfono:</strong> +(504) 8912-6011</InfoItem>
            <InfoItem><strong>Correo:</strong> escalinatacys@gmail.com</InfoItem>
            <InfoItem><strong>Dirección Principal:</strong> Col. Osorio, calle principal, atrás de iglesia Renacer, Santa Rosa de Copán, Honduras</InfoItem>
            <InfoItem><strong>CAI:</strong> 672002-A60EB4-6946A1-E1437B-9925CE-35</InfoItem>
            <InfoItem><strong>Rango Autorizado:</strong> {rangoAutorizado}</InfoItem>
            <InfoItem><strong>Fecha Límite de Emisión:</strong> 09/10/2024</InfoItem>
          </InfoContainer>
        </InfoSection>
        <FormSection>
          <InvoiceTable>
            <thead>
              <tr>
                <InvoiceTableHeader>N. Factura</InvoiceTableHeader>
                <InvoiceTableHeader>Fecha</InvoiceTableHeader>
              
              </tr>
            </thead>
            <tbody>
              <tr>
                <InvoiceTableCell>{factActual}</InvoiceTableCell>
                <InvoiceTableCell>08/08/2024</InvoiceTableCell>
               
              </tr>
            </tbody>
          </InvoiceTable>
          <InputContainer>
            <Input placeholder="Cliente" />
            <AddClientButton onClick={handleAddClient}>Agregar Cliente</AddClientButton>
          </InputContainer>
          <Input placeholder="RTN" />
          <Input placeholder="Dirección" />
        </FormSection>
      </TopSection>
      <h2>Busca un Producto</h2>
        <Input
          type="text"
          placeholder="Escanear el código de barras o escribir el nombre"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      <BottomSection>
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <TableHeader>Código</TableHeader>
                <TableHeader>Cantidad</TableHeader>
                <TableHeader>Concepto</TableHeader>
                <TableHeader>Precio Unitario</TableHeader>
                <TableHeader>Descuento/Promociones</TableHeader>
                <TableHeader>Total</TableHeader>
                <TableHeader>Acciones</TableHeader>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>{product.code}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={product.quantity}
                      onChange={(e) => handleQuantityChange(index, e.target.value)}
                    />
                  </TableCell>
                  <TableCell>{product.concept}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={product.unitPrice}
                      onChange={(e) => handleUnitPriceChange(index, e.target.value)}
                    />
                  </TableCell>
                 
                  <TableCell>
                    <Input
                      type="number"
                      value={product.discount}
                      onChange={(e) => handleDiscountChange(index, e.target.value)}
                    />
                  </TableCell>
                  <TableCell>Lps.{product.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <FaTrashAlt
                      onClick={() => handleDeleteProduct(index)}
                      style={{ cursor: 'pointer', color: '#ff0000' }}
                    />
                  </TableCell>
                </TableRow>
              ))}
              <TotalRow>
                <TableCell colSpan={6}>Total a Pagar</TableCell>
                <TableCell>Lps.{calculateTotalSale().toFixed(2)}</TableCell>
                
              </TotalRow>
            </tbody>
          </Table>
        </TableContainer>
      </BottomSection>
    </Container>
  );
};

export default Venta;

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
  padding: 6px;
  text-align: left;
  background-color: #ccc5b7;
  color: #333;
  font-size: 0.875rem;
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 6px;
  text-align: left;
  font-size: 0.875rem;
`;

const FormSection = styled.div`
  flex: 1;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const AddClientButton = styled.button`
  padding: 5px 10px;
  margin-left: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.875rem;
  &:hover {
    background-color: #0056b3;
  }
`;

const TotalRow = styled.tr`
  background-color: #f2f2f2;
  font-weight: bold;
`;

const Cotizacion: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
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
    // Más filas de productos aquí
  ]);

  const filteredProducts = products.filter((product) =>
    product.concept.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    alert('Funcionalidad para agregar cliente aún no implementada.');
  };

  const calculateTotalSale = () => {
    return products.reduce((acc, product) => acc + product.total, 0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container>
      <Title>Cotización</Title>
      <TopSection>
        <InfoSection>
          <InfoContainer>
            <InfoItem><strong>Nombre:</strong> Inversiones Estéticas C&C</InfoItem>
            <InfoItem><strong>Teléfono:</strong> +(504) 8912-6011</InfoItem>
            <InfoItem><strong>Correo:</strong> escalinatacys@gmail.com</InfoItem>
            <InfoItem><strong>Dirección Principal:</strong> Col. Osorio, calle principal, atrás de iglesia Renacer, Santa Rosa de Copán, Honduras</InfoItem>
          </InfoContainer>
        </InfoSection>
        <FormSection>
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
      <TopSection>
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
      </TopSection>
    </Container>
  );
};

export default Cotizacion;

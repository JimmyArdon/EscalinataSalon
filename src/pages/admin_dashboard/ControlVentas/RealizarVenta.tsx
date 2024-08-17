import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTrashAlt } from 'react-icons/fa';
import Modal from 'react-modal';
import Select from 'react-select';


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

// Estilos para el modal
const ModalContent = styled.div`
  padding: 20px;
  max-width: 500px;
  margin: auto;
  background-color: #fff;
  border-radius: 8px;
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ModalButton = styled.button<{ primary?: boolean }>`
  padding: 10px 20px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  color: #fff;
  background-color: ${(props: { primary?: boolean }) => (props.primary ? '#007bff' : '#6c757d')};
  &:hover {
    background-color: ${(props: { primary?: boolean }) => (props.primary ? '#0056b3' : '#5a6268')};
  }
`;

const ProceedButton = styled.button`
  background-color: #4CAF50; /* Color de fondo */
  color: white; /* Color del texto */
  padding: 10px 20px; /* Espaciado interno */
  border: none; /* Sin borde */
  border-radius: 5px; /* Bordes redondeados */
  cursor: pointer; /* Cursor en forma de mano */
  font-size: 16px; /* Tamaño de la fuente */
  margin-top: 30px; /* Espacio superior */
  margin-bottom: 30px; /* Espacio inferior */
  &:hover {
    background-color: #45a049; /* Color de fondo al pasar el ratón */
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
      discount: 0,
      total: 20,
      taxRate: 15
    }, {
      code: '123456',
      quantity: 2,
      concept: 'Producto A',
      unitPrice: 10,
      subTotal: 20,
      discount: 0,
      total: 20,
      taxRate: 15
    },
    {
      code: '123456',
      quantity: 2,
      concept: 'Producto A',
      unitPrice: 10,
      subTotal: 20,
      discount: 0,
      total: 20,
      taxRate: 15
    }, {
      code: '123456',
      quantity: 2,
      concept: 'Producto A',
      unitPrice: 10,
      subTotal: 20,
      discount: 0,
      total: 20,
      taxRate: 15
    },
      {
        code: '123456',
        quantity: 2,
        concept: 'Producto A',
        unitPrice: 10,
        subTotal: 20,
        discount: 0,
        total: 20,
        taxRate: 15
      }, {
        code: '123456',
        quantity: 2,
        concept: 'Producto A',
        unitPrice: 10,
        subTotal: 20,
        discount: 0,
        total: 20,
        taxRate: 15
      },
    // Más filas de productos aquí
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false); 
  const [newClient, setNewClient] = useState({
    name: '',
    rtn: '',
    address: ''
  });


 
  const [paymentType, setPaymentType] = useState('contado')

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
      product.total = product.subTotal;
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
      product.total = product.subTotal;
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
      product.total = product.subTotal;
      updatedProducts[index] = product;
      return updatedProducts;
    });
  };

  const handleDeleteProduct = (index: number) => {
    setProducts((prevProducts) => prevProducts.filter((_, i) => i !== index));
  };

  const handleAddClient = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleModalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewClient((prev) => ({ ...prev, [name]: value }));
  };
  const handleModalSubmit = () => {
    // Aquí puedes manejar la lógica para guardar el nuevo cliente
    console.log('Nuevo cliente agregado:', newClient);
    handleCloseModal();
  };

  
  const handleProceedToPayment = () => {
    setIsPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

  const handleConfirmPayment = () => {
    console.log('Proceder al cobro del cliente con los siguientes datos:', {
      client: newClient,
      paymentType,
      products,
    });
    handleClosePaymentModal();
    // Aquí podrías redirigir a una página de cobro o realizar alguna acción adicional
  };

  const calculateTotalSale = () => {
    let totalSubtotal = 0;
    let totalTax = 0;
    let totalDiscount = 0;
  
    // Calculamos el subtotal y el impuesto de cada producto
    products.forEach(product => {
      // Calcular el subtotal del producto (precio unitario * cantidad)
      const subtotal = product.unitPrice * product.quantity;
      // Calcular el impuesto del producto (subtotal * tasa de impuesto)
      const tax = subtotal * (product.taxRate / 100);
      // Agregar el subtotal y el impuesto al total
      totalSubtotal += subtotal;
      totalTax += tax;
      // Agregar el descuento (si existe) al total de descuentos
      totalDiscount += product.discount || 0; // Asegúrate de que `discount` pueda ser undefined
    });
  
    // Calcular el subtotal real (total subtotal - la suma de impuestos)
    const realSubtotal = totalSubtotal - totalTax;
    // Calcular el total a pagar (subtotal real + impuestos - descuentos)
    const total = realSubtotal + totalTax - totalDiscount;
  
    return total;
  };
  

  const calculateDiscount = () => {
    return products.reduce((acc, product) => acc + product.discount, 0);
  };

  const calculateSubtotal = () => {
    return products.reduce((acc, product) => acc + product.subTotal, 0);
  };

  const calculateTaxExempt = () => {
    // Puedes agregar lógica específica si hay productos exentos de impuestos
    return 0;
  };

  const calculateExoneratedTax = () => {
    // Puedes agregar lógica específica si hay productos exonerados de impuestos
    return 0;
  };

  const calculateTax15 = () => {
    return products
      .filter(product => product.taxRate === 15)
      .reduce((acc, product) => acc + (product.subTotal * 0.15), 0);
  };

  const calculateTax18 = () => {
    return products
      .filter(product => product.taxRate === 18)
      .reduce((acc, product) => acc + (product.subTotal * 0.18), 0);
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
                <InvoiceTableHeader>Terminos</InvoiceTableHeader>
              
              </tr>
            </thead>
            <tbody>
              <tr>
              <InvoiceTableCell>{factActual}</InvoiceTableCell>
              <InvoiceTableCell>19/08/2024</InvoiceTableCell>
              <InvoiceTableCell>
              <Select
                    value={{ value: paymentType, label: paymentType }}
                    onChange={(selectedOption) => {
                      if (selectedOption) setPaymentType(selectedOption.value);
                    }}
                    options={[
                      { value: 'contado', label: 'Contado' },
                      { value: 'tarjeta', label: 'Tarjeta' },
                      { value: 'transferencia', label: 'Transferencia' },
                      { value: 'credito', label: 'Crédito' },
                    ]}
                  />
              </InvoiceTableCell>
               
              </tr>
            </tbody>
          </InvoiceTable>
          <InputContainer>
            <Input placeholder="Nombre Cliente" />
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
                <TableCell colSpan={5}>Descuento/Promoción:</TableCell>
                <TableCell>Lps.{calculateDiscount().toFixed(2)}</TableCell>
              </TotalRow>
              <TotalRow>
                <TableCell colSpan={5}>Sub Total:</TableCell>
                <TableCell>Lps.{(calculateSubtotal() - calculateTax15() - calculateTax18()).toFixed(2)}</TableCell>
              </TotalRow>
              <TotalRow>
                <TableCell colSpan={5}>Impuesto Exonerado:</TableCell>
                <TableCell>Lps.{calculateExoneratedTax().toFixed(2)}</TableCell>
              </TotalRow>
              <TotalRow>
                <TableCell colSpan={5}>Impuesto Exento:</TableCell>
                <TableCell>Lps.{calculateTaxExempt().toFixed(2)}</TableCell>
              </TotalRow>
              <TotalRow>
                <TableCell colSpan={5}>Impuesto Gravado:</TableCell>
                <TableCell>Lps.{(0 + 0).toFixed(2)}</TableCell>
              </TotalRow>
              <TotalRow>
                <TableCell colSpan={5}>ISV 15%:</TableCell>
                <TableCell>Lps.{calculateTax15().toFixed(2)}</TableCell>
              </TotalRow>
              <TotalRow>
                <TableCell colSpan={5}>ISV 18%:</TableCell>
                <TableCell>Lps.{calculateTax18().toFixed(2)}</TableCell>
              </TotalRow>
              <TotalRow>
                <TableCell colSpan={5}>Total a Pagar:</TableCell>
                <TableCell>Lps.{calculateTotalSale().toFixed(2)}</TableCell>
              </TotalRow>
            </tbody>
          </Table>
        </TableContainer>
        <ProceedButton onClick={handleProceedToPayment}>Continuar al Cobro</ProceedButton>
      </BottomSection>
      {/* Modal para el cobro */}
     {/* Modal para confirmar pago */}
      <Modal isOpen={isPaymentModalOpen} onRequestClose={handleClosePaymentModal}>
        <h2>Confirmar Pago</h2>
        <p>Cliente: {newClient.name}</p>
        <p>Tipo de Pago: {paymentType}</p>
        <button onClick={handleConfirmPayment}>Confirmar Pago</button>
        <button onClick={handleClosePaymentModal}>Cerrar</button>
      </Modal>
      {/* Modal para agregar cliente */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        ariaHideApp={false}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            border: 'none',
            padding: '20px',
          },
        }}
      >
        <ModalContent>
          <h2>Agregar Nuevo Cliente</h2>
          <ModalInput 
            type="text" 
            name="name" 
            placeholder="Nombre" 
            value={newClient.name}
            onChange={handleModalChange}
          />
          <ModalInput 
            type="text" 
            name="rtn" 
            placeholder="RTN" 
            value={newClient.rtn}
            onChange={handleModalChange}
          />
          <ModalInput 
            type="text" 
            name="address" 
            placeholder="Dirección" 
            value={newClient.address}
            onChange={handleModalChange}
          />
          <ModalButton primary onClick={handleModalSubmit}>Guardar</ModalButton>
          <ModalButton onClick={handleCloseModal}>Cerrar</ModalButton>
        </ModalContent>
      </Modal>

    </Container>
  );
};

export default Venta;

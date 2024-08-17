import React, { useState, useRef } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import Modal from 'react-modal';
import Select from 'react-select';
import ModalConfirmarCompra from '../../../components/ModalConfirmarCompra'; 
import { Container, TopSection, InfoSection, Title, InfoContainer, InfoItem, 
  Input, TableContainer, Table, TableHeader, TableRow, TableCell, FormSection, 
  InvoiceTable, InvoiceTableHeader, InvoiceTableCell, BottomSection, InputContainer, 
  AddClientButton,ResetClientButton, ModalContent, ModalInput, ModalButton, ProceedButton, TotalRow, 
  ClientList, ClientListItem} 
from '../../../components/Estilos/ControlVentas/RealizarVentasStyle'; 



interface Client {
  name: string;
  rtn: string;
  address : string;
}

const Venta: React.FC = () => {
  
  const [searchTerm, setSearchTerm ] = useState('');
  const [clientSearchTerm, setClientSearchTerm] = useState('');
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

  const [clients, setClients] = useState<Client[]>([
    { name: 'Juan Pérez', rtn: '0801-123456-001' , address:'SRC' },
    { name: 'Ana Gómez', rtn: '0802-654321-001', address:'SRC'},
    // Agrega más clientes aquí
  ]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [paymentType, setPaymentType] = useState('contado')
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [newClient, setNewClient] = useState({
    name: '',
    rtn: '',
    address: ''
  });
 

  const sampleClient: Client = {
    name: 'Juan Pérez',
    rtn: '0801-123456-001',
   address:'SRC'
  };

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

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Maneja el cambio en el campo de búsqueda de productos
  const handleProductSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    // Lógica para búsqueda de productos
  };

  // Maneja el cambio en el campo de búsqueda de clientes
  const handleClientSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setClientSearchTerm(value);
    // Filtra los clientes basados en el término de búsqueda
    setFilteredClients(clients.filter(client =>
      client.name.toLowerCase().includes(value.toLowerCase())
    ));
  };

  // Maneja la selección de un cliente de la lista
  const handleClientSelect = (client: Client) => {
    setSelectedClient(client);
    setClientSearchTerm(client.name); // Establece el término de búsqueda al nombre del cliente seleccionado
    setFilteredClients([]); // Limpia la lista filtrada
  };

  // Abre el modal para agregar un nuevo cliente
  const handleAddClient = () => {
    setIsModalOpen(true);
  };

  // Maneja el cambio en el modal para agregar un nuevo cliente
  const handleModalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewClient((prev) => ({ ...prev, [name]: value }));
  };

  // Maneja el envío del nuevo cliente
  const handleModalSubmit = () => {
    console.log('Nuevo cliente agregado:', newClient);
    setClients([...clients, newClient]);
    handleCloseModal();
  };

  // Cierra el modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Maneja la confirmación del pago
  const handleConfirm = () => {
    console.log('Pago confirmado');
    handleCloseModal();
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

  const handleOpenModal = (client: Client, paymentType: string, totalAmount: number) => {
    setSelectedClient(client);
    setPaymentType(paymentType);
    setTotalAmount(totalAmount);
    setIsModalOpen(true);
  };

 // Resetea el cliente seleccionado y el término de búsqueda
 const handleResetClient = () => {
  setSelectedClient(null);
  setClientSearchTerm('');
  setFilteredClients([]);
  if (searchInputRef.current) {
    searchInputRef.current.focus();
  }
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
                      { value: 'credito', label: 'Crédito' }
                    ]}
                  />
              </InvoiceTableCell>
               
              </tr>
            </tbody>
          </InvoiceTable>
          <InputContainer style={{ position: 'relative' }}>
            <Input
              ref={searchInputRef}
              placeholder="Buscar Cliente"
              value={clientSearchTerm}
              onChange={handleClientSearchChange}
            />
            {filteredClients.length > 0 && (
              <ClientList>
               {filteredClients.map((client, index) => (
                <ClientListItem
                key={index}
                onClick={() => handleClientSelect(client)}
                style={{ cursor: 'pointer', padding: '8px', borderBottom: '1px solid #ccc' }}
              >
                {client.name}
              </ClientListItem>
               ))}
                  
             </ClientList>
             )}
            <AddClientButton onClick={handleAddClient}>Agregar Cliente</AddClientButton>
            <ResetClientButton onClick={handleResetClient}>Resetear</ResetClientButton>
            </InputContainer>
          <Input placeholder="RTN" value={selectedClient?.rtn || ''} readOnly />
          <Input placeholder="Dirección" value={selectedClient?.address || ''} readOnly/>
        </FormSection>
        
      </TopSection>
      <h2>Busca un Producto</h2>
      <Input
        type="text"
        placeholder="Escanea el código de barras o escribe el nombre del Producto/Servicio"
        value={searchTerm}
        onChange={handleProductSearchChange}
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
      </BottomSection>
     
     {/* Modal para confirmar pago */}
     <div>
     < BottomSection>
      <ProceedButton onClick={() => handleOpenModal(sampleClient, '', 0)}>Realizar Venta</ProceedButton>
      </BottomSection>

      {selectedClient && (
        <ModalConfirmarCompra
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        client={selectedClient}
        paymentType={paymentType}
        totalAmount={totalAmount}
        onConfirm={handleConfirm}
        />
      )}
    </div>
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
            placeholder="Dirección del Cliente" 
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

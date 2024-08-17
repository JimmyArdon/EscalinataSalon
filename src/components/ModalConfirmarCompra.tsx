// src/components/ConfirmPaymentModal.tsx

import React, { useState, ChangeEvent } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import PrintFactModal from './Factura/PrintFactModal';
import { FacturaData } from './Factura/PrintFact'; // Asegúrate de que esto sea correcto

interface Client {
  name: string;
  rtn: string;
}

interface ConfirmPaymentModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  client: Client;
  paymentType: string;
  totalAmount: number;
  onConfirm: () => void;
}

const ModalContent = styled.div`
  padding: 20px;
  max-width: 500px;
  margin: auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #333;
`;

const InfoSection = styled.div`
  margin-bottom: 20px;
`;

const InfoItem = styled.p`
  font-size: 1rem;
  margin: 5px 0;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const PaymentSummary = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const PaymentColumn = styled.div`
  flex: 1;
`;

const PaymentLabel = styled.p`
  font-weight: bold;
  margin: 5px 0;
  font-size: 1rem;
  color: #333;
`;

const PaymentButton = styled.button<{ primary?: boolean }>`
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  color: #fff;
  background-color: ${(props) => (props.primary ? '#007bff' : '#6c757d')};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.primary ? '#0056b3' : '#5a6268')};
  }
`;

const ConfirmPaymentModal: React.FC<ConfirmPaymentModalProps> = ({ isOpen, onRequestClose, client, paymentType, totalAmount, onConfirm }) => {
  const [amountPaid, setAmountPaid] = useState<number>(0);
  const [change, setChange] = useState<number>(0);
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);

  const handleAmountPaidChange = (event: ChangeEvent<HTMLInputElement>) => {
    const paid = parseFloat(event.target.value) || 0;
    setAmountPaid(paid);
    setChange(paid - totalAmount);
  };

  const handleConfirmPayment = () => {
    if (amountPaid < totalAmount) {
      alert('El monto pagado es menor que el total. Por favor, ingrese el monto correcto.');
      return;
    }
    onConfirm();
    setShowPrintModal(true); // Mostrar el modal de impresión después de confirmar el pago
  };

  const handleClosePrintModal = () => {
    setShowPrintModal(false);
  };

  // Datos de ejemplo, debes reemplazarlos con los datos reales
  const facturaData: FacturaData = {
    cai: '123456789',
    fechaLimite: '2024-12-31',
    rangoFacturacion: '2024-0001 - 2024-0100',
    numeroFactura: '0001',
    nombreCliente: client.name,
    rtnCliente: client.rtn,
    productos: [
      { descripcion: 'Producto A', cantidad: 2, precioUnitario: 50 },
      { descripcion: 'Producto B', cantidad: 1, precioUnitario: 100 },
    ],
    subtotal: 200,
    descuento: 10,
    impuesto: 30,
    total: 220,
  };

  return (
    <>
      <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
        <ModalContent>
          <Title>Confirmación de Pago</Title>
          <InfoSection>
            <InfoItem>Cliente: {client.name}</InfoItem>
            <InfoItem>RTN: {client.rtn}</InfoItem>
            <InfoItem>Tipo de Pago: {paymentType}</InfoItem>
          </InfoSection>
          <Input
            type="number"
            placeholder="Ingrese el dinero que da el cliente"
            value={amountPaid.toFixed(2)}
            onChange={handleAmountPaidChange}
          />
          <PaymentSummary>
            <PaymentColumn>
              <PaymentLabel>Total a Pagar:</PaymentLabel>
              <PaymentLabel>Dinero Recibido:</PaymentLabel>
              <PaymentLabel>Cambio:</PaymentLabel>
            </PaymentColumn>
            <PaymentColumn>
              <PaymentLabel>{totalAmount.toFixed(2)}</PaymentLabel>
              <PaymentLabel>{amountPaid.toFixed(2)}</PaymentLabel>
              <PaymentLabel>{change.toFixed(2)}</PaymentLabel>
            </PaymentColumn>
          </PaymentSummary>
          <div>
            <PaymentButton primary onClick={handleConfirmPayment}>Confirmar</PaymentButton>
            <PaymentButton onClick={onRequestClose}>Cancelar</PaymentButton>
          </div>
        </ModalContent>
      </Modal>
      {showPrintModal && (
        <PrintFactModal
          isOpen={showPrintModal}
          onRequestClose={handleClosePrintModal}
          facturaData={facturaData}
        />
      )}
    </>
  );
};

export default ConfirmPaymentModal;

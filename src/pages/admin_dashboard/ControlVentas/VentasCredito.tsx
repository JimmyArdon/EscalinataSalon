import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import FiltroClientes from "../../../components/FiltroClientes"; 
import Pagination from "../../../components/Pagination";

interface VentaCredito {
  id: number;
  cliente: string;
  monto: number;
  fecha: string;
  estado: string;
}

interface HistorialPago {
  id: number;
  cliente: string;
  montoPagado: number;
  fechaPago: string;
}

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  text-align: center;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  thead {
    background-color: #f4f4f4;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const DetailsContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 5px;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
`;

const ModalButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const HistoryTable = styled(Table)`
  margin-top: 40px;
`;

const VentasCredito: React.FC = () => {
  const [ventas, setVentas] = useState<VentaCredito[]>([
    { id: 1, cliente: 'Cliente A', monto: 1500, fecha: '2024-08-01', estado: 'Pendiente' },
    { id: 2, cliente: 'Cliente B', monto: 2000, fecha: '2024-08-05', estado: 'Pendiente' },
    { id: 3, cliente: 'Cliente C', monto: 1200, fecha: '2024-08-10', estado: 'Pagado' },
    // Más datos si es necesario
  ]);

  const [historialPagos, setHistorialPagos] = useState<HistorialPago[]>([
    { id: 1, cliente: 'Cliente C', montoPagado: 1200, fechaPago: '2024-08-10' }
    // Más datos si es necesario
  ]);

  const [selectedVenta, setSelectedVenta] = useState<VentaCredito | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [pago, setPago] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5; // Número de ítems por página
  const navigate = useNavigate();

  const filteredVentas = ventas.filter((venta) =>
    venta.cliente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredVentas.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredVentas.length / itemsPerPage);

  const handleRowClick = (venta: VentaCredito) => {
    setSelectedVenta(venta);
  };

  const handleAgregarVenta = () => {
    navigate('/agregar-venta-credito');
  };

  const handleRegistrarPago = async () => {
    if (selectedVenta) {
      try {
        const updatedVentas = ventas.map(venta =>
          venta.id === selectedVenta.id
            ? { ...venta, estado: 'Pagado', monto: venta.monto - pago }
            : venta
        );
        const updatedHistorial = [
          ...historialPagos,
          { id: historialPagos.length + 1, cliente: selectedVenta.cliente, montoPagado: pago, fechaPago: new Date().toISOString().split('T')[0] }
        ];
        setVentas(updatedVentas);
        setHistorialPagos(updatedHistorial);
        setShowModal(false);
        setSelectedVenta(null);
        setPago(0);
      } catch (error) {
        console.error('Error registrando pago:', error);
      }
    }
  };

  return (
    <Container>
      <Title>Ventas al Crédito</Title>
      <FiltroClientes aplicarFiltros={setSearchTerm} />
      <Button onClick={handleAgregarVenta}>Agregar Nueva Venta</Button>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Monto</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((venta) => (
            <tr key={venta.id} onClick={() => handleRowClick(venta)}>
              <td>{venta.id}</td>
              <td>{venta.cliente}</td>
              <td>{venta.monto}</td>
              <td>{venta.fecha}</td>
              <td>{venta.estado}</td>
              <td>
                <Button onClick={() => { setSelectedVenta(venta); setShowModal(true); }}>Registrar Pago</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {selectedVenta && (
        <DetailsContainer>
          <h3>Detalles de la Venta</h3>
          <p><strong>ID:</strong> {selectedVenta.id}</p>
          <p><strong>Cliente:</strong> {selectedVenta.cliente}</p>
          <p><strong>Monto:</strong> {selectedVenta.monto}</p>
          <p><strong>Fecha:</strong> {selectedVenta.fecha}</p>
          <p><strong>Estado:</strong> {selectedVenta.estado}</p>
        </DetailsContainer>
      )}
      {showModal && (
        <Modal>
          <ModalContent>
            <h3>Registrar Pago</h3>
            <label>
              Monto del Pago:
              <input
                type="number"
                value={pago}
                onChange={(e) => setPago(Number(e.target.value))}
              />
            </label>
            <br />
            <ModalButton onClick={handleRegistrarPago}>Registrar</ModalButton>
            <ModalButton onClick={() => setShowModal(false)}>Cancelar</ModalButton>
          </ModalContent>
        </Modal>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      <HistoryTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Monto Pagado</th>
            <th>Fecha de Pago</th>
          </tr>
        </thead>
        <tbody>
          {historialPagos.map((pago) => (
            <tr key={pago.id}>
              <td>{pago.id}</td>
              <td>{pago.cliente}</td>
              <td>{pago.montoPagado}</td>
              <td>{pago.fechaPago}</td>
            </tr>
          ))}
        </tbody>
      </HistoryTable>
    </Container>
  );
};

export default VentasCredito;

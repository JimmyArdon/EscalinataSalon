import React, { useState } from 'react';
import FiltroCitas from "../../../components/FiltroInventario"; 
import Pagination from "../../../components/Pagination";
import "../../../components/VentasAlCredito.css";

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

const VentasCredito: React.FC = () => {
  const [ventas, setVentas] = useState<VentaCredito[]>([
    { id: 1, cliente: 'Cliente A', monto: 1500, fecha: '2024-08-01', estado: 'Pendiente' },
    { id: 2, cliente: 'Cliente B', monto: 2000, fecha: '2024-08-05', estado: 'Pendiente' },
    { id: 3, cliente: 'Cliente C', monto: 1200, fecha: '2024-08-10', estado: 'Pendiente' },
  ]);

  const [historialPagos, setHistorialPagos] = useState<HistorialPago[]>([
    { id: 1, cliente: 'Cliente C', montoPagado: 1200, fechaPago: '2024-08-10' }
  ]);

  const [selectedVenta, setSelectedVenta] = useState<VentaCredito | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [pago, setPago] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const [currentPageHistorial, setCurrentPageHistorial] = useState<number>(1);

  const filteredVentas = ventas.filter((venta) =>
    venta.cliente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredVentas.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredVentas.length / itemsPerPage);

  const indexOfLastItemHistorial = currentPageHistorial * itemsPerPage;
  const indexOfFirstItemHistorial = indexOfLastItemHistorial - itemsPerPage;
  const currentHistorialItems = historialPagos.slice(indexOfFirstItemHistorial, indexOfLastItemHistorial);
  const totalPagesHistorial = Math.ceil(historialPagos.length / itemsPerPage);

  const handleRegistrarPago = async () => {
    if (selectedVenta) {
      if (pago <= 0 || pago > selectedVenta.monto) {
        alert("El pago no puede ser mayor al crédito pendiente ni 0");
        return;
      }
      
      try {
        const updatedVentas = ventas.map(venta =>
          venta.id === selectedVenta.id
            ? {
                ...venta,
                monto: venta.monto - pago,
                estado: venta.monto - pago === 0 ? 'Pagado' : 'Pendiente'
              }
            : venta
        );
        const updatedHistorial = [
          ...historialPagos,
          {
            id: historialPagos.length + 1,
            cliente: selectedVenta.cliente,
            montoPagado: pago,
            fechaPago: new Date().toISOString().split('T')[0]
          }
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
    <div className="container">
      <h2 className="title">Ventas al Crédito</h2>
      <FiltroCitas aplicarFiltros={setSearchTerm} />
      <table className="table-primary">
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
            <tr key={venta.id}>
              <td>{venta.id}</td>
              <td>{venta.cliente}</td>
              <td>{venta.monto}</td>
              <td>{venta.fecha}</td>
              <td>{venta.estado}</td>
              <td>
                <button className="button" onClick={() => { setSelectedVenta(venta); setShowModal(true); }}>Registrar Pago</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Registrar Pago</h3>
            <label>
              Monto del Pago:
              <input
                type="number"
                value={pago}
                onChange={(e) => setPago(Number(e.target.value))}
              />
            </label>
            <div>
              <button className="modal-button" onClick={handleRegistrarPago}>Registrar</button>
              <button className="modal-button" onClick={() => setShowModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      <h2 className="title">Historial de Pagos</h2>
      <table className="table-secondary">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Monto Pagado</th>
            <th>Fecha de Pago</th>
          </tr>
        </thead>
        <tbody>
          {currentHistorialItems.map((pago) => (
            <tr key={pago.id}>
              <td>{pago.id}</td>
              <td>{pago.cliente}</td>
              <td>{pago.montoPagado}</td>
              <td>{pago.fechaPago}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPageHistorial}
        totalPages={totalPagesHistorial}
        onPageChange={setCurrentPageHistorial}
      />
    </div>
  );
};

export default VentasCredito;
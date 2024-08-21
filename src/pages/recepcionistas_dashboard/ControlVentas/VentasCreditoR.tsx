import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FiltroCitas from "../../../components/FiltroInventario";
import Pagination from "../../../components/Pagination";
import "../../../components/VentasAlCredito.css";

interface VentaCredito {
  id: number;
  cliente: string;
  montoPendiente: number;
  fecha: string;
  estado: string;
}

interface HistorialPago {
  id: number;
  cliente: string;
  montoPagado: number;
  fechaPago: string;
}

interface VentaCreditoAPIResponse {
  Id: number;
  nombre: string;
  Monto_pendiente: number;
  Fecha: string;
  Descripcion: string;
}

interface HistorialPagoAPIResponse {
  Id: number;
  Nombre: string;
  Monto_pagado: number;
  Fecha_pago: string;
}

const VentasCredito: React.FC = () => {
  const [ventas, setVentas] = useState<VentaCredito[]>([]);
  const [historialPagos, setHistorialPagos] = useState<HistorialPago[]>([]);
  const [selectedVenta, setSelectedVenta] = useState<VentaCredito | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [pago, setPago] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const [currentPageHistorial, setCurrentPageHistorial] = useState<number>(1);

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const response = await axios.get<VentaCreditoAPIResponse[]>('http://localhost:4000/ventas-credito', {
          params: { searchTerm }
        });
        const ventasData = response.data.map((venta) => ({
          id: venta.Id,
          cliente: venta.nombre,
          montoPendiente: venta.Monto_pendiente,
          fecha: venta.Fecha.split('T')[0],
          estado: venta.Descripcion,
        }));
        setVentas(ventasData);
      } catch (error) {
        console.error('Error fetching ventas data:', error);
      }
    };

    fetchVentas();
  }, [searchTerm]);

  useEffect(() => {
    const fetchHistorialPagos = async () => {
      try {
        const response = await axios.get<HistorialPagoAPIResponse[]>('http://localhost:4000/historial-pagos');
        const historialData = response.data.map((pago) => ({
          id: pago.Id,
          cliente: pago.Nombre,
          montoPagado: pago.Monto_pagado,
          fechaPago: pago.Fecha_pago.split('T')[0],
        }));
        setHistorialPagos(historialData);
      } catch (error) {
        console.error('Error fetching historial pagos data:', error);
      }
    };

    fetchHistorialPagos();
  }, []);

  const handleRegistrarPago = async () => {
    if (selectedVenta) {
      if (pago <= 0 || pago > selectedVenta.montoPendiente) {
        alert("El pago no puede ser mayor al crédito pendiente ni 0");
        return;
      }

      try {
        await axios.post('http://localhost:4000/registrar-pago', {
          ClienteId: selectedVenta.id,
          montoPagado: pago,
          fechaPago: new Date().toISOString().split('T')[0]
        });

        // Update state after successful request
        const updatedVentas = ventas.map(venta =>
          venta.id === selectedVenta.id
            ? {
                ...venta,
                montoPendiente: venta.montoPendiente - pago,
                estado: venta.montoPendiente - pago === 0 ? 'Pagado' : 'Pendiente'
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
        alert("Pago registrado exitosamente");
      } catch (error) {
        console.error('Error registrando pago:', error);
      }
    }
  };

  const filteredVentas = ventas.filter((venta) =>
    venta.cliente?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredVentas.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredVentas.length / itemsPerPage);

  const indexOfLastItemHistorial = currentPageHistorial * itemsPerPage;
  const indexOfFirstItemHistorial = indexOfLastItemHistorial - itemsPerPage;
  const currentHistorialItems = historialPagos.slice(indexOfFirstItemHistorial, indexOfLastItemHistorial);
  const totalPagesHistorial = Math.ceil(historialPagos.length / itemsPerPage);

  return (
    <div className="container">
      <h2 className="title">Ventas al Crédito</h2>
      <FiltroCitas aplicarFiltros={setSearchTerm} />
      <table className="table-primary">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Monto Pendiente</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((venta) => (
            <tr key={venta.id}>
              <td>{venta.cliente}</td>
              <td>{venta.montoPendiente}</td>
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
        onPageChange={(page) => setCurrentPage(page)}
      />
      <h2 className="title">Historial de Pagos</h2>
      <table className="table-primary">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Monto Pagado</th>
            <th>Fecha de Pago</th>
          </tr>
        </thead>
        <tbody>
          {currentHistorialItems.map((pago) => (
            <tr key={pago.id}>
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
        onPageChange={(page) => setCurrentPageHistorial(page)}
      />
    </div>
  );
};

export default VentasCredito;

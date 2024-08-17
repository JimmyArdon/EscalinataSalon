import React, { useState } from 'react';
import FiltroCitas from "../../../components/FiltroInventario";
import "../../../components/HistorialDeVentas.css";

interface Sale {
  invoiceNumber: string;
  clientName: string;
  totalAmount: number;
  date: string;
}

const parseDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day);
};

const HistoricoVentas: React.FC = () => {
  const [filter, setFilter] = useState<string>('today');
  const [clientFilter, setClientFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 7;
  const [salesHistory] = useState<Sale[]>([
    {
      invoiceNumber: '001',
      clientName: 'Cliente A',
      totalAmount: 100,
      date: '13/08/2024',
    },
    {
      invoiceNumber: '002',
      clientName: 'Cliente B',
      totalAmount: 200,
      date: '14/08/2024',
    },
    {
      invoiceNumber: '003',
      clientName: 'Cliente C',
      totalAmount: 150,
      date: '15/08/2024',
    },
    {
      invoiceNumber: '001',
      clientName: 'Cliente A',
      totalAmount: 100,
      date: '13/08/2024',
    },
    {
      invoiceNumber: '002',
      clientName: 'Maria',
      totalAmount: 200,
      date: '14/08/2024',
    },
    {
      invoiceNumber: '003',
      clientName: 'Jose',
      totalAmount: 150,
      date: '15/03/2024',
    },
    {
      invoiceNumber: '001',
      clientName: 'Alberto',
      totalAmount: 100,
      date: '13/04/2024',
    },
    {
      invoiceNumber: '002',
      clientName: 'Blanca',
      totalAmount: 200,
      date: '14/05/2024',
    },
    {
      invoiceNumber: '003',
      clientName: 'Carlos',
      totalAmount: 150,
      date: '15/06/2024',
    },
    {
      invoiceNumber: '001',
      clientName: 'Cliente A',
      totalAmount: 100,
      date: '13/08/2024',
    },
    {
      invoiceNumber: '002',
      clientName: 'Cliente B',
      totalAmount: 200,
      date: '14/08/2024',
    },
    {
      invoiceNumber: '003',
      clientName: 'Cliente C',
      totalAmount: 150,
      date: '10/08/2024',
    },
    {
      invoiceNumber: '001',
      clientName: 'Cliente A',
      totalAmount: 100,
      date: '5/08/2024',
    },
    {
      invoiceNumber: '002',
      clientName: 'Maria',
      totalAmount: 200,
      date: '4/08/2024',
    },
    {
      invoiceNumber: '001',
      clientName: 'Cliente A',
      totalAmount: 100,
      date: '13/08/2024',
    },
    {
      invoiceNumber: '002',
      clientName: 'Cliente B',
      totalAmount: 200,
      date: '14/08/2024',
    },
    {
      invoiceNumber: '003',
      clientName: 'Cliente C',
      totalAmount: 150,
      date: '16/08/2024',
    },
    {
      invoiceNumber: '001',
      clientName: 'Cliente A',
      totalAmount: 100,
      date: '16/08/2024',
    },
    {
      invoiceNumber: '002',
      clientName: 'Maria',
      totalAmount: 200,
      date: '15/08/2024',
    },
    // Más registros de ventas aquí
  ]);


  const filteredSalesHistory = salesHistory.filter((sale) => {
    const saleDate = parseDate(sale.date);
    const currentDate = new Date();

    const startOfDay = new Date(currentDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(startOfDay.getDate() + 1);

    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    return (
      sale.clientName.toLowerCase().includes(clientFilter.toLowerCase()) &&
      ((filter === 'today' && saleDate >= startOfDay && saleDate < endOfDay) ||
        (filter === 'week' && saleDate >= startOfWeek && saleDate <= currentDate) ||
        (filter === 'month' && saleDate >= startOfMonth && saleDate <= endOfMonth) ||
        (filter === 'year' && saleDate.getFullYear() === currentDate.getFullYear()))
    );
  });

  const totalSales = filteredSalesHistory.reduce((acc, sale) => acc + sale.totalAmount, 0);

  const paginatedSales = filteredSalesHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(filteredSalesHistory.length / itemsPerPage);

  return (
    <div className="container">
      <h1 className="title">Historial de Ventas</h1>
      <div className="filter-section">
        <FiltroCitas aplicarFiltros={setClientFilter} />
        <div>
          <button className="filter-button" onClick={() => setFilter('today')}>Hoy</button>
          <button className="filter-button" onClick={() => setFilter('week')}>Semana</button>
          <button className="filter-button" onClick={() => setFilter('month')}>Mes</button>
          <button className="filter-button" onClick={() => setFilter('year')}>Año</button>
        </div>
      </div>
      <label className="total-sales-label">Total Ventas: Lps. {totalSales.toFixed(2)}</label>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Número de Factura</th>
              <th>Cliente</th>
              <th>Total</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginatedSales.map((sale, index) => (
              <tr key={index}>
                <td>{sale.invoiceNumber}</td>
                <td>{sale.clientName}</td>
                <td>Lps. {sale.totalAmount.toFixed(2)}</td>
                <td>{sale.date}</td>
                <td>
                  <button className="view-button" onClick={() => alert(`Viewing details of ${sale.invoiceNumber}`)}>
                    Ver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={currentPage === number ? 'active' : ''}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
    </div>
  );
};

export default HistoricoVentas;
import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
`;

const Title = styled.h1`
  color: #333;
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const FilterButton = styled.button`
  padding: 10px 20px;
  margin-right: 10px;
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

const TableContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
  width: 100%;
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

interface Sale {
  invoiceNumber: string;
  clientName: string;
  totalAmount: number;
  date: string; // Asume que la fecha es en formato DD/MM/YYYY
}

// Función para convertir DD/MM/YYYY a objeto Date
const parseDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day);
};

const HistoricoVentas: React.FC = () => {
  const [filter, setFilter] = useState<string>('today');
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
    // Más registros de ventas aquí
  ]);

  const filteredSalesHistory = salesHistory.filter((sale) => {
    const saleDate = parseDate(sale.date);
    const currentDate = new Date();

    // Reset hours, minutes, seconds, and milliseconds to compare only the date part
    const startOfDay = new Date(currentDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(startOfDay.getDate() + 1);

    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    switch (filter) {
      case 'today': {
        return saleDate >= startOfDay && saleDate < endOfDay;
      }
      case 'week': {
        return saleDate >= startOfWeek && saleDate <= currentDate;
      }
      case 'month': {
        return saleDate >= startOfMonth && saleDate <= endOfMonth;
      }
      case 'year': {
        return saleDate.getFullYear() === currentDate.getFullYear();
      }
      default:
        return true;
    }
  });

  return (
    <Container>
      <Title>Historia de Ventas</Title>
      <FilterSection>
        <FilterButton onClick={() => setFilter('today')}>Hoy</FilterButton>
        <FilterButton onClick={() => setFilter('week')}>Semana</FilterButton>
        <FilterButton onClick={() => setFilter('month')}>Mes</FilterButton>
        <FilterButton onClick={() => setFilter('year')}>Año</FilterButton>
      </FilterSection>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <TableHeader>Número de Factura</TableHeader>
              <TableHeader>Cliente</TableHeader>
              <TableHeader>Total</TableHeader>
              <TableHeader>Fecha</TableHeader>
            </tr>
          </thead>
          <tbody>
            {filteredSalesHistory.map((sale, index) => (
              <TableRow key={index}>
                <TableCell>{sale.invoiceNumber}</TableCell>
                <TableCell>{sale.clientName}</TableCell>
                <TableCell>Lps. {sale.totalAmount.toFixed(2)}</TableCell>
                <TableCell>{sale.date}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default HistoricoVentas;

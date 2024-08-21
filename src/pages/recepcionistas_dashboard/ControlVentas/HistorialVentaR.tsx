import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FiltroCitas from "../../../components/FiltroInventario";
import "../../../components/HistorialDeVentas.css";

interface Venta {
  numero_factura: string;
  nombreCliente: string;
  Total: number;
  Fecha: string;
}

const HistoricoVentas: React.FC = () => {
  const [historicoVentas, setHistoricoVentas] = useState<Venta[]>([]);
  const [filtro, setFiltro] = useState<string>('today');
  const [filtroCliente, setFiltroCliente] = useState<string>('');
  const [paginaActual, setPaginaActual] = useState<number>(1);
  const itemsPorPagina = 7;

  useEffect(() => {
    const obtenerDatosVentas = async () => {
      try {
        const response = await axios.get('http://localhost:4000/historial-venta', {
          params: { filter: filtro, clientFilter: filtroCliente }
        });
        setHistoricoVentas(response.data);
      } catch (error) {
        console.error('Error al obtener los datos de ventas:', error);
      }
    };
  
    obtenerDatosVentas();
  }, [filtro, filtroCliente]);
  
  // Calcula el total de ventas basado en el filtro actual
  const totalVentas = historicoVentas.reduce((acc, venta) => acc + (venta.Total ?? 0), 0);

  const ventasPaginadas = historicoVentas.slice(
    (paginaActual - 1) * itemsPorPagina,
    paginaActual * itemsPorPagina
  );

  const manejarCambioDePagina = (nuevaPagina: number) => {
    setPaginaActual(nuevaPagina);
  };

  const totalPaginas = Math.ceil(historicoVentas.length / itemsPorPagina);

  const manejarCambioDeFiltro = (nuevoFiltro: string) => {
    setFiltro(nuevoFiltro);
    setPaginaActual(1); // Resetea a la primera página cuando cambie el filtro
  };

  return (
    <div className="container">
      <h1 className="title">Historial de Ventas</h1>
      <div className="filter-section">
        <FiltroCitas aplicarFiltros={setFiltroCliente} />
        <div>
          <button
            className={`filter-button ${filtro === 'today' ? 'active' : ''}`}
            onClick={() => manejarCambioDeFiltro('today')}
          >
            Hoy
          </button>
          <button
            className={`filter-button ${filtro === 'week' ? 'active' : ''}`}
            onClick={() => manejarCambioDeFiltro('week')}
          >
            Semana
          </button>
          <button
            className={`filter-button ${filtro === 'month' ? 'active' : ''}`}
            onClick={() => manejarCambioDeFiltro('month')}
          >
            Mes
          </button>
          <button
            className={`filter-button ${filtro === 'year' ? 'active' : ''}`}
            onClick={() => manejarCambioDeFiltro('year')}
          >
            Año
          </button>
        </div>
      </div>
      <label className="total-sales-label">Total Ventas: Lps. {totalVentas.toFixed(2)}</label>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Número de Factura</th>
              <th>Cliente</th>
              <th>Total</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {ventasPaginadas.map((venta, index) => (
              <tr key={index}>
                <td>{venta.numero_factura}</td>
                <td>{venta.nombreCliente}</td>
                <td>Lps. {(venta.Total ?? 0).toFixed(2)}</td>
                <td>{venta.Fecha.split("T")[0]}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Paginacion
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        onPageChange={manejarCambioDePagina}
      />
    </div>
  );
};

const Paginacion: React.FC<{
  paginaActual: number;
  totalPaginas: number;
  onPageChange: (pagina: number) => void;
}> = ({ paginaActual, totalPaginas, onPageChange }) => {
  const numerosDePagina = [];

  for (let i = 1; i <= totalPaginas; i++) {
    numerosDePagina.push(i);
  }

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(paginaActual - 1)}
        disabled={paginaActual === 1}
      >
        Anterior
      </button>
      {numerosDePagina.map((numero) => (
        <button
          key={numero}
          onClick={() => onPageChange(numero)}
          className={paginaActual === numero ? 'active' : ''}
        >
          {numero}
        </button>
      ))}
      <button
        onClick={() => onPageChange(paginaActual + 1)}
        disabled={paginaActual === totalPaginas}
      >
        Siguiente
      </button>
    </div>
  );
};

export default HistoricoVentas;

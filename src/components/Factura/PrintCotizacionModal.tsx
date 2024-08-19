import React from 'react';
import Modal from 'react-modal';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import PrintCotizacion, { FacturaData } from './PrintCotizacion';

interface PrintCotizacionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  facturaData: FacturaData;
}

const PrintCotizacionModal: React.FC<PrintCotizacionModalProps> = ({ isOpen, onRequestClose, facturaData }) => {
  const handlePrint = () => {
    const printContent = document.getElementById('pdf-content');
    if (printContent) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write('<html><head><title>Imprimir Cotización</title></head><body>');
        printWindow.document.write(printContent.innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Opciones de Factura"
      ariaHideApp={false}
      style={{
        content: {
          padding: '20px',
          maxWidth: '600px',
          margin: 'auto',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <div style={{ padding: '20px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Opciones de Factura</h2>
        <div id="pdf-content" style={{ marginBottom: '20px', height: '500px' }}>
          <PDFViewer style={{ width: '100%', height: '100%' }}>
            <PrintCotizacion data={facturaData} />
          </PDFViewer>
        </div>
        <div style={{ marginTop: '20px' }}>
          <PDFDownloadLink
            document={<PrintCotizacion data={facturaData} />}
            fileName="cotización.pdf"
            style={{
              textDecoration: 'none',
              display: 'inline-block',
              padding: '10px 20px',
              color: '#fff',
              backgroundColor: '#007bff',
              borderRadius: '5px',
              fontSize: '1rem',
              marginRight: '10px',
            }}
          >
            {({ loading }) => (loading ? 'Cargando documento...' : 'Descargar Factura')}
          </PDFDownloadLink>
          <button
            onClick={handlePrint}
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            Imprimir Cotización
          </button>
        </div>
        <button
          onClick={onRequestClose}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          Cerrar
        </button>
      </div>
    </Modal>
  );
};

export default PrintCotizacionModal;

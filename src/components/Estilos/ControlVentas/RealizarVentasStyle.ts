
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
`;

export const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  margin-bottom: 20px;
`;

export const InfoSection = styled.div`
  flex: 1;
  padding-right: 20px;
  text-align: left;
`;

export const Title = styled.h1`
  color: #333;
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

export const InfoContainer = styled.div`
  margin-bottom: 20px;
`;

export const InfoItem = styled.p`
  margin: 5px 0;
  font-size: 1rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const TableContainer = styled.div`
  max-height: 400px; 
  overflow-y: auto;
  width: 100%;
  margin-top: 20px;
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  font-family: 'Arial', sans-serif;
`;

export const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 6px; /* Reducido el padding */
  text-align: left;
  background-color: #ccc5b7;
  color: #333;
  font-size: 0.875rem; /* Tamaño de fuente reducido */
`;

export const TableRow = styled.tr`
  &:hover {
    background-color: #f2f2f2;
  }
`;

export const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 6px; /* Reducido el padding */
  text-align: left;
  font-size: 0.875rem; /* Tamaño de fuente reducido */
`;

export const FormSection = styled.div`
  flex: 1;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const InvoiceTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 20px;
`;

export const InvoiceTableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
  background-color: #ccc5b7;
  color: #333;
`;

export const InvoiceTableCell = styled.td`
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
`;

export const BottomSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const AddClientButton = styled.button`
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
export const ModalContent = styled.div`
  padding: 20px;
  max-width: 500px;
  margin: auto;
  background-color: #fff;
  border-radius: 8px;
`;

export const ModalInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const ModalButton = styled.button<{ primary?: boolean }>`
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

export const ProceedButton = styled.button`
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


export const TotalRow = styled.tr`
  background-color: #f2f2f2;
  font-weight: bold;
`;

export const ClientList = styled.div`
  position: absolute;
  top: 100%; /* Ajusta según sea necesario para alinear debajo del campo de búsqueda */
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000; /* Asegura que el menú esté encima de otros elementos */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  div {
    padding: 8px;
    cursor: pointer;
    &:hover {
      background-color: #f0f0f0;
    }
  }
`;


export const ClientListItem = styled.div`
  padding: 10px;
  cursor: pointer;
  background-color: #f0f0f0;
`;

export const ResetClientButton = styled.button`
  padding: 5px 10px; /* Reducción de padding para hacer el botón más pequeño */
  margin-left: 10px;
  background-color: #f44336;;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.875rem; /* Tamaño de fuente reducido */
  &:hover {
    background-color: #e53935;
  }


`;

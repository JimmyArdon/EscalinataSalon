import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import styled from "styled-components";

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #009879;
  cursor: pointer;
  margin: 0 5px;

  &:hover {
      color: #00755f;
  }
`;

interface Servicio {
  id: string;
  nombre: string;
  duracion: string;
  precio: number;
}

interface ServicioCardProps {
  servicio: Servicio; 
  onDelete: (id: string) => void;
}

const ServicioCard: React.FC<ServicioCardProps> = ({ servicio, onDelete }) => {
  const navigate = useNavigate();

  const manejarOnclick = () => {
    navigate(`/dashboard-admin/gestion-de-servicios/servicios/edit/${servicio.id}`);
  };

  return (
    <tr className="cursor-pointer transform transition-transform duration-300 hover:scale-105 border-black">
      <th scope="row">{servicio.id}</th>
      <td>{servicio.nombre}</td>
      <td>{servicio.duracion}</td>
      <td>Lps.{servicio.precio}</td>
      <td>
        <ActionButton onClick={manejarOnclick}>
          <FontAwesomeIcon icon={faEdit} />
        </ActionButton>
        <ActionButton onClick={() => onDelete(servicio.id)}>
          <FontAwesomeIcon icon={faTrash} />
        </ActionButton>
      </td>
    </tr>
  );
};

export default ServicioCard;

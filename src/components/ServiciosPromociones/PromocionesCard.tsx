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

interface Promocion {
  id: string;
  descripcion: string;
  precio: number;
  descuento: number;
}

interface PromocionCardProps {
  promocion: Promocion;
  onDelete: (id: string) => void;
}

const PromocionesCard: React.FC<PromocionCardProps> = ({ promocion, onDelete }) => {
  const navigate = useNavigate();

  const manejarOnclick = () => {
    navigate(`/dashboard-admin/gestion-de-servicios/promociones/edit/${promocion.id}`);
  };

  return (
    <tr className="cursor-pointer transform transition-transform duration-300 hover:scale-105 border-black">
      <th scope="row">{promocion.id}</th>
      <td>{promocion.descripcion}</td>
      <td>{promocion.precio}</td>
      <td>Lps.{promocion.descuento}</td>
      <td>
        <ActionButton onClick={manejarOnclick}>
          <FontAwesomeIcon icon={faEdit} />
        </ActionButton>
        <ActionButton onClick={() => onDelete(promocion.id)}>
          <FontAwesomeIcon icon={faTrash} />
        </ActionButton>
      </td>
    </tr>
  );
};

export default PromocionesCard;

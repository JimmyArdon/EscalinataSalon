import { useNavigate } from "react-router-dom";

interface Promocion {
    id: string;
    descripcion: string;
    precio: number;
    descuento: number;
  }

  interface PromocionCardProps {
    promocion: Promocion; 
  }

const PromocionesCard: React.FC<PromocionCardProps> = ({promocion}) => {

  const navigate = useNavigate()

  const manejarOnclick = () => {
    navigate(`/dashboard-recepcionista/main/gestion-de-servicios/promociones/edit/${promocion.id}`)
  }

    return (
            <tr onClick={manejarOnclick} className="cursor-pointer transform transition-transform duration-300 hover:scale-105 border-black">
              <th scope="row">{promocion.id}</th>
              <td>{promocion.descripcion}</td>
              <td>{promocion.precio}</td>
              <td>Lps.{promocion.descuento}</td>
            </tr>
    )
}

export default PromocionesCard
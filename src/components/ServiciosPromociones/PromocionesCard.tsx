

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

    return (
            <tr className="cursor-pointer transform transition-transform duration-300 hover:scale-105 border-black">
              <th scope="row">{promocion.id}</th>
              <td>{promocion.descripcion}</td>
              <td>{promocion.descuento}</td>
              <td>Lps.{promocion.precio}</td>
            </tr>
    )
}

export default PromocionesCard
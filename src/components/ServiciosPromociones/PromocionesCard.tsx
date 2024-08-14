

interface Promocion {
    id: string;
    descripcion: string;
    precio: number;
    descuento: number;
  }

  interface PromocionCardProps {
    promocion: Promocion; 
  }

const   PromocionesCard: React.FC<PromocionCardProps> = ({promocion}) => {

    return (
            <tr className="cursor-pointer transform transition-transform duration-300 hover:scale-105 border-black">
              
              <td className="text-center">{promocion.descripcion}</td>
              <td className="text-center">{promocion.descuento}%</td>
              <td className="text-center">Lps.{promocion.precio}</td>
            </tr>
    )
}

export default PromocionesCard
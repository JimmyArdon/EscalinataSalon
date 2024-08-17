

interface Promocion {
    id: string;
    descripcion: string;
    precio: number;
    descuento: number;
    fechaInicio: string;
    fechaFinal: string;
  }

  interface PromocionCardProps {
    promocion: Promocion; 
  }

const   PromocionesCard: React.FC<PromocionCardProps> = ({promocion}) => {
  
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString(); // Muestra la fecha como DD/MM/YYYY según la configuración regional
  };

    return (
            <tr className="cursor-pointer transform transition-transform duration-300 hover:scale-105 border-black">
              <td className="text-center">{promocion.descripcion}</td>
              <td className="text-center">{promocion.descuento}%</td>
              <td className="text-center">Lps.{promocion.precio}</td>
              <td className="text-center">{formatDate(promocion.fechaInicio)}</td>
              <td className="text-center">{formatDate(promocion.fechaFinal)}</td>
            </tr>
    )
}

export default PromocionesCard
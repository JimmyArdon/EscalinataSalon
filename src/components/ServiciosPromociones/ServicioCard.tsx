
interface Servicio {
    id: string;
    nombre: string;
    duracion: string;
    precio: number;
  }

  interface ServicioCardProps {
    servicio: Servicio; 
  }

const ServicioCard: React.FC<ServicioCardProps> = ({servicio}) => {

    return (
            <tr className="cursor-pointer transform transition-transform duration-300 hover:scale-105 border-black">
              <th scope="row">{servicio.id}</th>
              <td>{servicio.nombre}</td>
              <td>{servicio.duracion}</td>
              <td>Lps.{servicio.precio}</td>
            </tr>
    )
}

export default ServicioCard
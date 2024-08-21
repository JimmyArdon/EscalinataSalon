
interface Servicio {
    Id: string;
    Nombre: string;
    Duracion: string;
    Precio: number;
  }

  interface ServicioCardProps {
    servicio: Servicio; 
  }

const ServicioCard: React.FC<ServicioCardProps> = ({servicio}) => {

    return (
            <tr className="cursor-pointer transform transition-transform duration-300 hover:scale-105 border-black">
             
              <td>{servicio.Nombre}</td>
              <td>{servicio.Duracion}</td>
              <td>Lps.{servicio.Precio}</td>
            </tr>
    )
}

export default ServicioCard
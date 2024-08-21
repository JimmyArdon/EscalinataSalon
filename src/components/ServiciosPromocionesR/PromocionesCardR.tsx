import { useEffect, useState } from "react";

interface PromocionServicio {
  Id: string;
  Descuento: number;
  Fecha_inicio: string;
  Fecha_fin: string;
  Servicio_id: string;
}

interface Servicio {
  Id: string;
  Nombre: string;
  Precio: number;
}

interface PromocionCardProps {
  promocion: PromocionServicio;
}

const PromocionesCard: React.FC<PromocionCardProps> = ({ promocion }) => {
  const [servicio, setServicio] = useState<Servicio | null>(null);

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString(); // Muestra la fecha como DD/MM/YYYY según la configuración regional
  };

  useEffect(() => {
    fetch(`http://localhost:4000/servicioss/${promocion.Servicio_id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.text(); // Leer la respuesta como texto
      })
      .then(text => {
        try {
          const data = JSON.parse(text); // Intentar convertir el texto a JSON
          setServicio(data);
        } catch (error) {
          console.error('Failed to parse JSON:', error);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [promocion.Servicio_id]);

  if (!servicio) {
    return <tr><td colSpan={5} className="text-center">Loading...</td></tr>;
  }

  return (
    <tr className="cursor-pointer transform transition-transform duration-300 hover:scale-105 border-black">
      <td className="text-center">{servicio.Nombre}</td>
      <td className="text-center">{promocion.Descuento}%</td>
      <td className="text-center">Lps.{(servicio.Precio - (servicio.Precio * (promocion.Descuento / 100))).toFixed(2)}</td>
      <td className="text-center">{formatDate(promocion.Fecha_inicio)}</td>
      <td className="text-center">{formatDate(promocion.Fecha_fin)}</td>
    </tr>
  );
};

export default PromocionesCard;

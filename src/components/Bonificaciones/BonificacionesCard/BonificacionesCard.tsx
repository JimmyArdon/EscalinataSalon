import { useEffect, useState } from "react";

interface Bonificacion {
  id: string;
  descripcion: string;
  compre: number;
  lleve: number;
  idProducto: string;
  preUniDescuento: number;
}

interface BonificacionCardProps {
  bonificacion: Bonificacion;
}

const BonificacionesCard: React.FC<BonificacionCardProps> = ({
  bonificacion,
}) => {
  const [producto, setProducto] = useState<{ nombre?: string; precioVenta?: number; marca?: string; }>({});

  useEffect(() => {
    fetch(
      `https://66972cf402f3150fb66cd356.mockapi.io/api/v1/productos/${bonificacion.idProducto}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducto(data);
      });
  }, [bonificacion.idProducto]);
  
  

  return (
    <tr className="cursor-pointer transform transition-transform duration-300 hover:scale-105 border-black">
      <td className="text-center">{producto.nombre || "Cargando..."}</td>
      <td className="text-center">{producto.marca || "Cargando..."}</td>
      <td className="text-center">{bonificacion.descripcion}</td>
      <td className="text-center">
        Lps. {bonificacion.preUniDescuento ? bonificacion.preUniDescuento.toFixed(2) : "0.00"}
      </td>
    </tr>
  );
};

export default BonificacionesCard;

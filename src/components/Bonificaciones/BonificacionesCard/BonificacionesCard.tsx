import { useEffect, useState } from "react";

interface Bonificacion {
  Id: string;
  Descripcion: string;
  Precio_unitario: number;
  Producto_id: string;
}

interface Producto {
  Id: string;
  Nombre: string;
  Precio: string;
  Marca_id: string;
}

interface Marca {
  Id: string;
  Descripcion: string;
}

interface BonificacionCardProps {
  bonificacion: Bonificacion;
}

const BonificacionesCard: React.FC<BonificacionCardProps> = ({
  bonificacion,
}) => {
  const [producto, setProducto] = useState<Producto | undefined>(undefined);
  const [marca, setMarca] = useState<Marca | undefined>(undefined);

  useEffect(() => {
    fetch(`http://localhost:4000/productos/${bonificacion.Producto_id}`)
      .then((res) => res.json())
      .then((data) => {
        setProducto(data);
      });
  }, [bonificacion.Producto_id]);

  useEffect(() => {
    if (producto && producto.Marca_id) {
      fetch(`http://localhost:4000/marca/${producto.Marca_id}`)
        .then(res => res.json())
        .then(data => setMarca(data));
    }
  }, [producto]);

  // Para evitar el error y visualizar los datos correctamente
  if (!producto) {
    return (
      <tr className="cursor-pointer transform transition-transform duration-300 hover:scale-105 border-black">
        <td className="text-center">Cargando...</td>
        <td className="text-center">Cargando...</td>
        <td className="text-center">{bonificacion.Descripcion}</td>
        <td className="text-center">
          Lps. {bonificacion.Precio_unitario.toFixed(2)}
        </td>
      </tr>
    );
  }

  return (
    <tr className="cursor-pointer transform transition-transform duration-300 hover:scale-105 border-black">
      <td className="text-center">{producto.Nombre}</td>
      <td className="text-center">{marca?.Descripcion || "Cargando..."}</td>
      <td className="text-center">{bonificacion.Descripcion}</td>
      <td className="text-center">
        Lps. {bonificacion.Precio_unitario.toFixed(2)}
      </td>
    </tr>
  );
};

export default BonificacionesCard;

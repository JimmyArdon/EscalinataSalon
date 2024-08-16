import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BorrarCita: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleDelete = () => {
    // Lógica para eliminar la cita
    console.log(`Cita ${id} eliminada.`);
    navigate('/');
  };

  return (
    <div>
      <h2>Eliminar Cita {id}</h2>
      <p>¿Estás seguro de que deseas eliminar esta cita?</p>
      <button onClick={handleDelete}>Eliminar</button>
      <button onClick={() => navigate('/')}>Cancelar</button>
    </div>
  );
};

export default BorrarCita;

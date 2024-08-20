import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

// Define la interfaz para los datos de la cita
export interface Cita {
  id: number;
  fecha: string;
  hora: string;
  servicio: string;
  usuario: string;
  cliente: string;
  estado_cita: string;
  Estilista: string;
}

// Define estilos para la ventana emergente y el fondo
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  animation: fadeIn 0.3s ease;

  &.fadeOut {
    animation: fadeOut 0.3s ease forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

const Modal = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  animation: fadeIn 0.3s ease;

  &.fadeOut {
    animation: fadeOut 0.3s ease forwards;
  }
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &.btn-submit {
    background-color: #d9534f;
    color: #fff;
  }
  &.btn-cancel {
    background-color: #6c757d;
    color: #fff;
  }
`;

const BorrarCita: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(true);
  const [closing, setClosing] = useState(false);
  const [clienteNombre, setClienteNombre] = useState<string>(''); // Estado para el nombre del cliente

  useEffect(() => {
    const fetchCita = async () => {
      if (id) { // Verifica que id no sea undefined
        try {
          // Obtén todas las citas y filtra por el ID
          const response = await axios.get<Cita[]>('http://localhost:4000/citas');
          const citas = response.data;
          const cita = citas.find((cita) => cita.id === parseInt(id));
          if (cita) {
            setClienteNombre(cita.cliente); // Asigna el nombre del cliente al estado
          }
        } catch (error) {
          console.error('Error al obtener los detalles de la cita:', error);
          alert('Hubo un error al obtener los detalles de la cita.');
        }
      }
    };

    fetchCita();
  }, [id]);

  const confirmDeleteUser = async () => {
    if (id) { // Verifica que id no sea undefined
      try {
        await axios.delete(`http://localhost:4000/citas/${id}`);
        console.log(`Cita ${id} eliminada.`);
        closeModal();
      } catch (error) {
        console.error('Error al eliminar la cita:', error);
        alert('Hubo un error al eliminar la cita. Intenta nuevamente.');
      }
    }
  };

  const closeModal = () => {
    setClosing(true);
    setTimeout(() => {
      setShowConfirmModal(false);
      navigate('/dashboard-admin/gestion-citas');
    }, 300); // Espera a que termine la animación
  };

  const preventDefaultAction = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <>
      {showConfirmModal && (
        <Overlay className={closing ? 'fadeOut' : 'fadeIn'}>
          <Modal className={closing ? 'fadeOut' : 'fadeIn'}>
            <p>¿Seguro que quieres eliminar la cita del cliente {clienteNombre}?</p>
            <Button onClick={(e) => {preventDefaultAction(e); confirmDeleteUser();}} className="btn-submit">Confirmar</Button>
            <Button onClick={(e) => {preventDefaultAction(e); closeModal();}} className="btn-cancel">Cancelar</Button>
          </Modal>
        </Overlay>
      )}
    </>
  );
};

export default BorrarCita;

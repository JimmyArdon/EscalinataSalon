import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  padding: 40px;
  background-color: #f4f4f4;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  font-family: 'Arial', sans-serif;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  max-width: 100%;
`;

const Button = styled.button`
  background-color: #ccc5b7;
  color: #333;
  padding: 15px 25px;
  border: 2px solid #ccc5b7;
  border-radius: 10px;
  cursor: pointer;
  font-size: 18px;
  text-align: center;
  width: 220px;
  height: 160px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  transition: background-color 0.3s, color 0.3s, transform 0.3s;
  font-weight: bold;

  &:hover {
    background-color: #b3a8a0;
    color: white;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 150px;
    height: 120px;
    font-size: 16px;
  }

  @media (max-width: 480px) {
    width: 120px;
    height: 100px;
    font-size: 14px;
  }
`;

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>Dashboard</Title>
      <ButtonContainer>
        <Button onClick={() => navigate('venta')}>Realizar una Venta</Button>
        <Button onClick={() => navigate('cotizacion')}>Realizar una Cotización</Button>
        <Button onClick={() => navigate('historial-venta')}>Historial de Ventas</Button>
        <Button onClick={() => navigate('ventas-creditos')}>Ventas al Crédito</Button>
      </ButtonContainer>
    </Container>
  );
};

export default Dashboard;
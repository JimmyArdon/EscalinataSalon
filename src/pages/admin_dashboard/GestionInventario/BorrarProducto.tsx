import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoMdCloseCircleOutline } from "react-icons/io";
import axios from "axios";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
}

const Container = styled.div`
  margin: 40px auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  background-color: #d9d9d9;
  padding: 40px;
  border-radius: 10px;
  position: relative;
  width: 80%;
  max-width: 800px;
  box-sizing: border-box;
  min-height: 100vh;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const Salir = styled(IoMdCloseCircleOutline)`
  width: 50px;
  height: 50px;
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    width: 60px;
    height: 60px;
    color: #8b4513;
  }
`;

const Message = styled.p`
  color: #4caf50;
  font-weight: bold;
`;

const ErrorMessage = styled.p`
  color: #f44336;
  font-weight: bold;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  position: relative;
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ListaProductos = styled.ul`
  width: 100%;
  list-style: none;
  padding: 0;
  margin-top: 20px;
`;

const ProductoItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
`;

const BorrarProducto = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [productosFiltrados, setProductosFiltrados] = useState<Producto[]>([]);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProductos = async () => {
      if (searchQuery.length > 0) {
        setLoading(true);
        try {
          const response = await axios.get<Producto[]>(
            `https://api.example.com/inventario?nombre=${searchQuery}`
          );
          setProductosFiltrados(response.data);
        } catch {
          setProductosFiltrados([]);
        } finally {
          setLoading(false);
        }
      } else {
        setProductosFiltrados([]);
      }
    };

    fetchProductos();
  }, [searchQuery]);

  const handleDelete = (id: number) => {
    axios
      .delete(`https://api.example.com/productos/${id}`)
      .then(() => {
        setMessage("Producto eliminado con éxito.");
        setProductosFiltrados((prev) =>
          prev.filter((producto) => producto.id !== id)
        );
        setTimeout(() => {
          setMessage("");
        }, 2000);
      })
      .catch(() => {
        setErrorMessage("No se pudo eliminar el producto.");
        setTimeout(() => {
          setErrorMessage("");
        }, 2000);
      });
  };

  const manejarOnClickSalir = () => {
    navigate("/dashboard-admin/inventario");
  };

  const handleSearch = () => {
    // Aquí puedes manejar la lógica de búsqueda si no deseas hacerla automática.
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setProductosFiltrados([]);
  };

  return (
    <Container>
      <Salir onClick={manejarOnClickSalir} />
      <h2>Eliminar Producto</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <FormGroup>
          <Label>Buscar por Nombre</Label>
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Nombre del producto"
            required
          />
          <Button onClick={handleSearch}>Buscar</Button>
          <Button onClick={handleClearSearch} style={{ backgroundColor: "#f44336" }}>
            Limpiar
          </Button>
        </FormGroup>
        {loading && <p>Cargando...</p>}
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </form>
      <ListaProductos>
        {productosFiltrados.map((producto) => (
          <ProductoItem key={producto.id}>
            <span>{producto.nombre}</span>
            <Button onClick={() => handleDelete(producto.id)}>Eliminar</Button>
          </ProductoItem>
        ))}
      </ListaProductos>
      {message && <Message>{message}</Message>}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Container>
  );
};

export default BorrarProducto;

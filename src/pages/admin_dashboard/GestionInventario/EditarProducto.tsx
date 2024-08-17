import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoMdCloseCircleOutline } from "react-icons/io";
import axios from "axios";

interface Producto {
  id: number;
  nombre: string;
  marca: string;
  codigoBarras: string;
  descripcion: string;
  proveedor: string;
  precioCompra: number;
  precioVenta: number;
  impuesto: number;
  stock: number;
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
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
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

const EditarProducto = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [productosFiltrados, setProductosFiltrados] = useState<Producto[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);
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

  const handleSelectProduct = (producto: Producto) => {
    setSelectedProduct(producto);
    setMessage("Producto seleccionado para edición.");
  };

  const handleSearch = () => {
    setSearchQuery(searchQuery);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setProductosFiltrados([]);
    setSelectedProduct(null);
  };

  const manejarOnClickSalir = () => {
    navigate("/dashboard-admin/inventario");
  };

  const handleUpdateProduct = () => {
    if (selectedProduct) {
      axios
        .put(`https://api.example.com/productos/${selectedProduct.id}`, selectedProduct)
        .then(() => {
          setMessage("Producto actualizado con éxito.");
        })
        .catch(() => {
          setErrorMessage("No se pudo actualizar el producto.");
        });
    }
  };

  return (
    <Container>
      <Salir onClick={manejarOnClickSalir} />
      <h2>Buscar y Editar Producto</h2>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-slate-500 p-10 rounded-[15px] w-full max-w-md"
      >
        <FormGroup>
          <Label>Buscar por Nombre</Label>
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Nombre del producto"
            required
          />
          {loading && <p>Cargando...</p>}
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </FormGroup>
        <Button onClick={handleSearch}>Realizar Búsqueda</Button>
        <Button onClick={handleClearSearch} style={{ marginLeft: "10px" }}>
          Limpiar Búsqueda
        </Button>
      </form>

      {selectedProduct ? (
        <>
          <h3>Editando: {selectedProduct.nombre}</h3>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="bg-slate-500 p-10 rounded-[15px] w-full max-w-md"
          >
            <FormGroup>
              <Label>Marca</Label>
              <Input
                type="text"
                value={selectedProduct.marca}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    marca: e.target.value,
                  })
                }
                placeholder="Marca"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Código de Barras</Label>
              <Input
                type="text"
                value={selectedProduct.codigoBarras}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    codigoBarras: e.target.value,
                  })
                }
                placeholder="Código de Barras"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Descripción</Label>
              <Input
                type="text"
                value={selectedProduct.descripcion}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    descripcion: e.target.value,
                  })
                }
                placeholder="Descripción"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Proveedor</Label>
              <Input
                type="text"
                value={selectedProduct.proveedor}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    proveedor: e.target.value,
                  })
                }
                placeholder="Proveedor"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Precio de Compra</Label>
              <Input
                type="number"
                value={selectedProduct.precioCompra}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    precioCompra: parseFloat(e.target.value),
                  })
                }
                placeholder="Precio de Compra"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Precio de Venta</Label>
              <Input
                type="number"
                value={selectedProduct.precioVenta}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    precioVenta: parseFloat(e.target.value),
                  })
                }
                placeholder="Precio de Venta"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Impuesto</Label>
              <Input
                type="number"
                value={selectedProduct.impuesto}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    impuesto: parseFloat(e.target.value),
                  })
                }
                placeholder="Impuesto"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Stock</Label>
              <Input
                type="number"
                value={selectedProduct.stock}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    stock: parseInt(e.target.value),
                  })
                }
                placeholder="Stock"
                required
              />
            </FormGroup>
            <Button onClick={handleUpdateProduct}>Actualizar Producto</Button>
          </form>
        </>
      ) : (
        <ListaProductos>
          {productosFiltrados.map((producto) => (
            <ProductoItem key={producto.id}>
              <span>{producto.nombre}</span>
              <Button onClick={() => handleSelectProduct(producto)}>
                Seleccionar para Editar
              </Button>
            </ProductoItem>
          ))}
        </ListaProductos>
      )}
      {message && <Message>{message}</Message>}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Container>
  );
};

export default EditarProducto;

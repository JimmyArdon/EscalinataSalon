import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IoMdCloseCircleOutline } from "react-icons/io";

const Container = styled.div`
  margin: 0 auto;
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

const FormGroup = styled.div`
  margin-bottom: 15px;
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

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
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

const ClearButton = styled(Button)`
  background-color: #f44336;
  &:hover {
    background-color: #d32f2f;
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

const ErrorMessage = styled.p`
  color: #f44336;
  font-weight: bold;
`;

const ResultList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-height: 150px;
  overflow-y: auto;
  background-color: #fff;
`;

const ResultItem = styled.li`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

interface Opcion {
  id: string;
  descripcion: string;
}

interface Producto {
  Id: string;
  Nombre: string;
  Proveedor_id: string;
  Marca_id: string;
  Cantidad_stock: string;
  Precio: string;
  ISV: string;
  Precio_venta: string;
}

const EditarProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState<Producto>({
    Id: "",
    Nombre: "",
    Proveedor_id: "",
    Marca_id: "",
    Cantidad_stock: "",
    Precio: "",
    ISV: "",
    Precio_venta: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [allProductos, setAllProductos] = useState<Producto[]>([]);
  const [filteredProductos, setFilteredProductos] = useState<Producto[]>([]);
  const [proveedores, setProveedores] = useState<Opcion[]>([]);
  const [marcas, setMarcas] = useState<Opcion[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000/proveedores")
      .then((response) => response.json())
      .then((data) => setProveedores(data))
      .catch((error) => console.error("Error al cargar los proveedores:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/marcas")
      .then((response) => response.json())
      .then((data) => setMarcas(data))
      .catch((error) => console.error("Error al cargar las marcas:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/productos")
      .then((response) => response.json())
      .then((data) => setAllProductos(data));
  }, []);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:4000/productos/${id}`)
        .then((response) => response.json())
        .then((data) => setProducto(data));
    }
  }, [id]);

  useEffect(() => {
    if (searchQuery) {
      setFilteredProductos(
        allProductos.filter((producto) =>
          producto.Nombre.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredProductos([]);
    }
  }, [searchQuery, allProductos]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = allProductos.find(
      (producto) => producto.Nombre.toLowerCase() === searchQuery.toLowerCase()
    );
    if (result) {
      setProducto(result);
      setErrorMessage("");
    } else {
      setProducto({
        Id: "",
        Nombre: "",
        Proveedor_id: "",
        Marca_id: "",
        Cantidad_stock: "",
        Precio: "",
        ISV: "",
        Precio_venta: "",
      });
      setErrorMessage("No se encontró ningún producto con ese nombre.");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (producto.Id) {
      fetch(`http://localhost:4000/productos/${producto.Id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
      }).then(() => {
        navigate("/dashboard-admin/inventario");
      });
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    setProducto({
      Id: "",
      Nombre: "",
      Proveedor_id: "",
      Marca_id: "",
      Cantidad_stock: "",
      Precio: "",
      ISV: "",
      Precio_venta: "",
    });
    setErrorMessage("");
  };

  const manejarOnClickSalir = () => {
    navigate("/dashboard-admin/inventario");
  };

  const handleSelectProducto = (selectedProducto: Producto) => {
    setProducto(selectedProducto);
    setSearchQuery(selectedProducto.Nombre);
    setFilteredProductos([]);
    setErrorMessage("");
  };

  return (
    <Container>
      <Salir onClick={manejarOnClickSalir} />
      <h2>Editar Producto</h2>
      <form onSubmit={handleSearch} className="bg-slate-500 p-10 rounded-[15px] w-full">
        <FormGroup>
          <Label>Buscar por Nombre</Label>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Nombre del producto"
              required
            />
            <Button type="submit">Buscar</Button>
            <ClearButton type="button" onClick={handleClear}>
              Limpiar
            </ClearButton>
          </div>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          {filteredProductos.length > 0 && (
            <ResultList>
              {filteredProductos.map((producto) => (
                <ResultItem key={producto.Id} onClick={() => handleSelectProducto(producto)}>
                  {producto.Nombre}
                </ResultItem>
              ))}
            </ResultList>
          )}
        </FormGroup>
      </form>
      {producto.Nombre && (
        <form onSubmit={handleSubmit} className="bg-slate-500 p-10 rounded-[15px] w-full">
          <FormGroup>
            <Label>Nombre</Label>
            <Input
              type="text"
              name="Nombre"
              value={producto.Nombre}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Proveedor:</Label>
            <Select name="Proveedor_id" value={producto.Proveedor_id} onChange={handleChange} required>
              <option value="">Selecciona un proveedor</option>
              {proveedores.map((proveedor) => (
                <option key={proveedor.id} value={proveedor.id}>
                  {proveedor.descripcion}
                </option>
              ))}
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>Marca:</Label>
            <Select name="Marca_id" value={producto.Marca_id} onChange={handleChange} required>
              <option value="">Selecciona una marca</option>
              {marcas.map((marca) => (
                <option key={marca.id} value={marca.id}>
                  {marca.descripcion}
                </option>
              ))}
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>Cantidad en Stock</Label>
            <Input
              type="number"
              name="Cantidad_stock"
              value={producto.Cantidad_stock}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Precio de Compra</Label>
            <Input
              type="number"
              name="Precio"
              value={producto.Precio}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>ISV (%)</Label>
            <Input
              type="number"
              name="ISV"
              value={producto.ISV}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Precio de Venta</Label>
            <Input
              type="number"
              name="Precio_venta"
              value={producto.Precio_venta}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <Button type="submit">Guardar Cambios</Button>
        </form>
      )}
    </Container>
  );
};

export default EditarProducto;
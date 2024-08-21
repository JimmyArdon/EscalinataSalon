// import React, { useState } from 'react';
// import styled from 'styled-components';

// const Container = styled.div`
//   padding: 20px;
// `;

// const SearchInput = styled.input`
//   padding: 8px;
//   margin-right: 10px;
// `;

// const Button = styled.button`
//   padding: 8px;
//   margin-top: 10px;
// `;

// const FormContainer = styled.div`
//   margin-top: 20px;
// `;

// const FormInput = styled.input`
//   display: block;
//   margin-bottom: 10px;
//   padding: 8px;
//   width: 100%;
// `;

// const ProductEditView: React.FC = () => {
//   const [searchName, setSearchName] = useState<string>('');
//   const [product, setProduct] = useState(null);
//   const [editData, setEditData] = useState({
//     Proveedor_id: '',
//     Marca_id: '',
//     Cantidad_stock: '',
//     Precio: '',
//     ISV: '',
//     Precio_venta: '',
//   });

//   const handleSearch = async () => {
//     try {
//       const response = await fetch(`/nameProductos?Nombre=${searchName}`);
//       const data = await response.json();
//       if (data.length > 0) {
//         setProduct(data[0]); // Assuming you only want to edit one product at a time
//         setEditData({
//           Proveedor_id: data[0].Proveedor_id,
//           Marca_id: data[0].Marca_id,
//           Cantidad_stock: data[0].Cantidad_stock,
//           Precio: data[0].Precio,
//           ISV: data[0].ISV,
//           Precio_venta: data[0].Precio_venta,
//         });
//       } else {
//         alert('Producto no encontrado');
//       }
//     } catch (error) {
//       console.error('Error fetching product:', error);
//     }
//   };

//   const handleEdit = async () => {
//     try {
//       const response = await fetch('/productos', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ Nombre: searchName, ...editData }),
//       });
//       const result = await response.json();
//       if (response.ok) {
//         alert('Producto editado exitosamente');
//       } else {
//         alert(result.error || 'Error al editar el producto');
//       }
//     } catch (error) {
//       console.error('Error editing product:', error);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setEditData(prevState => ({ ...prevState, [name]: value }));
//   };

//   return (
//     <Container>
//       <h1>Buscar y Editar Producto</h1>
//       <div>
//         <SearchInput
//           type="text"
//           placeholder="Nombre del producto"
//           value={searchName}
//           onChange={(e) => setSearchName(e.target.value)}
//         />
//         <Button onClick={handleSearch}>Buscar</Button>
//       </div>

//       {product && (
//         <FormContainer>
//           <h2>Editar Producto</h2>
//           <FormInput
//             type="text"
//             name="Proveedor_id"
//             placeholder="ID del Proveedor"
//             value={editData.Proveedor_id}
//             onChange={handleChange}
//           />
//           <FormInput
//             type="text"
//             name="Marca_id"
//             placeholder="ID de la Marca"
//             value={editData.Marca_id}
//             onChange={handleChange}
//           />
//           <FormInput
//             type="number"
//             name="Cantidad_stock"
//             placeholder="Cantidad en stock"
//             value={editData.Cantidad_stock}
//             onChange={handleChange}
//           />
//           <FormInput
//             type="number"
//             name="Precio"
//             placeholder="Precio de compra"
//             value={editData.Precio}
//             onChange={handleChange}
//           />
//           <FormInput
//             type="number"
//             name="ISV"
//             placeholder="ISV"
//             value={editData.ISV}
//             onChange={handleChange}
//           />
//           <FormInput
//             type="number"
//             name="Precio_venta"
//             placeholder="Precio de venta"
//             value={editData.Precio_venta}
//             onChange={handleChange}
//           />
//           <Button onClick={handleEdit}>Actualizar Producto</Button>
//         </FormContainer>
//       )}
//     </Container>
//   );
// };

// export default ProductEditView;

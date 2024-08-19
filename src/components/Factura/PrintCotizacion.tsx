import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Define el estilo del documento
const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
  },
});

// Define el tipo de los datos de la factura
interface Producto {
  descripcion: string;
  cantidad: number;
  precioUnitario: number;
}

export interface FacturaData {
  nombreCliente: string;
  rtnCliente: string;
  productos: Producto[];
  subtotal: number;
  descuento: number;
  impuesto: number;
  total: number;
}

const PrintCotizacion: React.FC<{ data: FacturaData }> = ({ data }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Cotización</Text>
        </View>
        <View style={styles.section}>
          <Text>Cliente: {data.nombreCliente}</Text>
          <Text>RTN: {data.rtnCliente}</Text>
        </View>
        <View style={styles.section}>
          <Text>Productos:</Text>
          {data.productos.map((producto, index) => (
            <Text key={index}>
              {producto.descripcion} - Cantidad: {producto.cantidad} - Precio: {producto.precioUnitario.toFixed(2)}
            </Text>
          ))}
        </View>
        <View style={styles.section}>
          <Text>Subtotal: {data.subtotal.toFixed(2)}</Text>
          <Text>Descuento: {data.descuento.toFixed(2)}</Text>
          <Text>Impuesto: {data.impuesto.toFixed(2)}</Text>
          <Text>Total: {data.total.toFixed(2)}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PrintCotizacion;

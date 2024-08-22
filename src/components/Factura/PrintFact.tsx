import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { convertirNumeroConCentavos } from '../../convertirNumeros';
// Define el estilo del documento
const styles = StyleSheet.create({
    page: {
      padding: 20,
      fontSize: 12,
      fontFamily: 'Helvetica',
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    logo: {
      width: 100,
      height: 100,
    },
    section: {
      marginBottom: 10,
    },
    title: {
      fontSize: 18,
      marginBottom: 10,
      color: '#007bff',
      textAlign: 'center',
    },
    clientSection: {
      padding: 10,
      borderTop: '2px solid #007bff',
      borderBottom: '2px solid #007bff',
      marginBottom: 20,
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: 20,
    },
    tableRow: {
      flexDirection: 'row',
    },
    tableColHeader: {
      width: '20%', // Ajustar el ancho de las columnas de encabezado
      border: '1px solid #ddd',
      backgroundColor: '#007bff',
      color: '#fff',
      padding: 4,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    tableCol: {
      width: '20%', // Ajustar el ancho de las columnas de datos
      border: '1px solid #ddd',
      padding: 4,
      textAlign: 'right',
    },
    tableColDescription: {
      width: '40%', // Mayor ancho para la descripción
      textAlign: 'left',
      padding: 4
    },
    totalsContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    totalsLeft: {
      width: '50%',
    },
    totalsRight: {
      width: '50%',
    },
    totalsItem: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 4,
    },
    lineItem: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    lineLabel: {
      width: '50%',
      borderBottom: '1px solid #000',
      marginRight: 8,
    },
    lineText: {
      width: '50%',
      borderBottom: '1px solid #000',
      textAlign: 'right',
    },
    footer: {
      marginTop: 20,
      textAlign: 'center',
    },
    footerItem: {
      marginBottom: 4,
    },
    printDate: {
      marginTop: 10,
      textAlign: 'left',
    },
    term: {
      marginTop: 10,
      textAlign: 'left',
    },
  });

// Define el tipo de los datos de la factura
interface Producto {
    descripcion: string;
    cantidad: number;
    precioUnitario?: number;
    descuento?: number;
    total?: number;
  }
  
  export interface FacturaData {
      cai: string;
      fechaLimite: string;
      rangoFacturacion: string;
      numeroFactura: string;
      nombreCliente: string;
      rtnCliente: string;
      direccionCliente: string;
      productos: Producto[];
      subtotal: number | null;  
      descuento: number | null;
      impuesto: number | null;
      total: number | null;
      logo?: string;
      usuario?: string;
      fecha: Date;
      termino: string

  }

const PrintFact: React.FC<{ data: FacturaData }> = ({ data }) => {
    const subtotal = data.subtotal !== undefined && data.subtotal !== null ? data.subtotal.toFixed(2) : '0.00';
    const descuento = data.descuento !== undefined && data.descuento !== null ? data.descuento.toFixed(2) : '0.00';
    const impuesto = data.impuesto !== undefined && data.impuesto !== null ? data.impuesto.toFixed(2) : '0.00';
    const total = data.total !== undefined && data.total !== null ? data.total.toFixed(2) : '0.00';
    const fechaImpresion = new Date().toLocaleDateString(); 
    const termino = data.termino || 'Al contado'; 
    const montoEnLetras = convertirNumeroConCentavos(Number(total));

  return (
    <Document>
      <Page style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Image src="/src/assets/Logo1.png" style={styles.logo} />
            <Text style={styles.title}>Inversiones Estéticas C&C</Text>
            <Text>RTN 05019021339269</Text>
            <Text>Col. Osorio, calle principal, atrás de Iglesia Renacer</Text>
            <Text>Santa Rosa de Copán, Honduras</Text>
            <Text>Teléfono: (504) 8912-6011</Text>
            <Text>Correo: escalinatacyc@gmail.com</Text>
          </View>
          <View>
            <Text style={styles.title}>FACTURA</Text>
            <Text>CAI: {data.cai}</Text>
            <Text>Fecha Límite: {data.fechaLimite}</Text>
            <Text>Rango de Facturación: {data.rangoFacturacion}</Text>
            <Text>Número de Factura: {data.numeroFactura}</Text>
            <Text>Fecha de Impresión: {fechaImpresion}</Text>
            <Text>Término: {termino}</Text>
          </View>
        </View>

        {/* Cliente Section */}
        <View style={styles.clientSection}>
          <Text>FACTURAR A:</Text>
          <Text>Cliente: {data.nombreCliente}</Text>
          <Text>RTN: {data.rtnCliente}</Text>
          <Text>Dirección: {data.direccionCliente}</Text>
          <Text>Vendedor: {data.usuario}</Text>
        </View>

        {/* Productos Table */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Cant.</Text>
            <Text style={[styles.tableColHeader, styles.tableColDescription]}>Descripción</Text>
            <Text style={styles.tableColHeader}>Precio Unitario</Text>
            <Text style={styles.tableColHeader}>Descuento/Promoción</Text>
            <Text style={styles.tableColHeader}>Total</Text>
          </View>
          {data.productos.map((producto, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.tableCol}>{producto.cantidad}</Text>
              <Text style={[styles.tableCol, styles.tableColDescription]}>{producto.descripcion}</Text>
              <Text style={styles.tableCol}>{producto.precioUnitario?.toFixed(2)}</Text>
              <Text style={styles.tableCol}>{producto.descuento?.toFixed(2)}</Text>
              <Text style={styles.tableCol}>{producto.total?.toFixed(2)}</Text>
            </View>
          ))}
        </View>

       {/* Totals Section */}
       <View style={styles.totalsContainer}>
        <View style={styles.totalsLeft}>
          <Text>No. Orden de Compra Exenta:</Text>
          <Text>No. Registro de Exonerante:</Text>
          <Text>No. de Registro SAG:</Text>
         
        </View>

          <View style={styles.totalsRight}>
            <View style={styles.totalsItem}>
              <Text>Descuento/Promoción:</Text>
              <Text>{descuento}</Text>
            </View>
            <View style={styles.totalsItem}>
              <Text>Sub Total:</Text>
              <Text>{subtotal}</Text>
            </View>
            <View style={styles.totalsItem}>
              <Text>Impuesto Exonerado:</Text>
              <Text>0.00</Text>
            </View>
            <View style={styles.totalsItem}>
              <Text>Impuesto Exento:</Text>
              <Text>0.00</Text>
            </View>
            <View style={styles.totalsItem}>
              <Text>Impuesto Gravado:</Text>
              <Text>0.00</Text>
            </View>
            <View style={styles.totalsItem}>
              <Text>ISV 15%:</Text>
              <Text>{impuesto}</Text>
            </View>
            <View style={styles.totalsItem}>
              <Text>ISV 18%:</Text>
              <Text>0.00</Text>
            </View>
            <View style={styles.totalsItem}>
              <Text>Total a Pagar:</Text>
              <Text>{total}</Text>
            </View>
          </View>
        </View>

        {/* Total en Letras */}
        <View>
          <Text style={styles.lineItem}>
            <Text style={styles.lineLabel}>SON:</Text>
            <Text style={styles.lineText}>{montoEnLetras} LEMPIRAS</Text>
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerItem}>Gracias por su compra</Text>
          <Text>Original: Cliente -- Copia: Obligado Tributario Emisor</Text>
          
        </View>
      </Page>
    </Document>
  );
};

export default PrintFact;

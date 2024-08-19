const unidades = [
  '', 'UNO', 'DOS', 'TRES', 'CUATRO', 'CINCO', 'SEIS', 'SIETE', 'OCHO', 'NUEVE'
];

const decenas = [
  '', 'DIEZ', 'VEINTE', 'TREINTA', 'CUARENTA', 'CINCUENTA', 'SESENTA', 'SETENTA', 'OCHENTA', 'NOVENTA'
];

const especiales = [
  'DIEZ', 'ONCE', 'DOCE', 'TRECE', 'CATORCE', 'QUINCE', 'DIECISEIS', 'DIECISIETE', 'DIECIOCHO', 'DIECINUEVE'
];

const centenas = [
  '', 'CIEN', 'DOCIENTOS', 'TRESCIENTOS', 'CUATROCIENTOS', 'QUINIENTOS', 'SEISCIENTOS', 'SETECIENTOS', 'OCHOCIENTOS', 'NOVECIENTOS'
];


export function numeroEnLetras(num: number): string {
  if (num === 0) return 'cero';
  
  if (num < 10) return unidades[num];
  if (num < 20) return especiales[num - 10];
  if (num < 100) return decenas[Math.floor(num / 10)] + (num % 10 !== 0 ? ' y ' + unidades[num % 10] : '');
  if (num < 1000) return centenas[Math.floor(num / 100)] + (num % 100 !== 0 ? ' ' + numeroEnLetras(num % 100) : '');
  if (num < 1000000) return numeroEnLetras(Math.floor(num / 1000)) + ' mil' + (num % 1000 !== 0 ? ' ' + numeroEnLetras(num % 1000) : '');
  if (num < 1000000000) return numeroEnLetras(Math.floor(num / 1000000)) + ' millón' + (num % 1000000 !== 0 ? ' ' + numeroEnLetras(num % 1000000) : '');

  return 'Número demasiado grande';
}

export function convertirNumeroConCentavos(numero: number): string {
  const [entero, decimal] = numero.toFixed(2).split('.').map(Number);
  const letrasEnteras = numeroEnLetras(entero);
  const letrasCentavos = decimal === 0 ? '' : ` CON ${numeroEnLetras(decimal)} CENTAVOS`;

  return `${letrasEnteras}${letrasCentavos}`;
}

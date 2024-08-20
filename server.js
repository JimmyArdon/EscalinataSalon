// server.js
import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();

// Configuración de la base de datos
const db = mysql.createConnection({
    host: 'localhost', // Cambia estos valores según tu configuración
    user: 'root', // Cambia estos valores según tu configuración
    password: '12345678', // Cambia estos valores según tu configuración
    database: 'EscalinataSalon' // Nombre de la base de datos
});

app.use(express.json());
app.use(cors());

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conexión a la base de datos establecida');
});

app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Backend Salon Escalinata</title>
            </head>
            <body>
                <h1>Conexión a la base de datos establecida correctamente</h1>
            </body>
        </html>
    `);
});

// Obtener productos del inventario
app.get('/productos', (req, res) => {
    const query = 'SELECT * FROM Producto';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ error: 'Error al obtener los productos' });
        }

        console.log('Datos obtenidos:', results);
        res.status(200).json(results);
    });
});

// Agregar un nuevo producto al inventario
app.post('/addProductos', (req, res) => {
    const { Nombre, Proveedor_id, Marca_id, Cantidad_stock, Precio, ISV, Precio_venta } = req.body;

    // Validación simple de datos
    if (!Nombre || !Proveedor_id || !Marca_id || !Cantidad_stock || !Precio || !ISV || !Precio_venta) {
        return res.status(400).json({ error: 'Por favor, proporciona todos los campos requeridos' });
    }

    const query = `
        INSERT INTO Producto (Nombre, Proveedor_id, Marca_id, Cantidad_stock, Precio, ISV, Precio_venta)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [Nombre, Proveedor_id, Marca_id, Cantidad_stock, Precio, ISV, Precio_venta], (err, result) => {
        if (err) {
            console.error(err); // Agregar un log para más detalles en caso de error
            return res.status(500).json({ error: 'Error al agregar el producto' });
        }

        res.status(201).json({ message: 'Producto agregado exitosamente', productId: result.insertId });
    });
});

// Borrar un producto por nombre
app.delete('/productos', (req, res) => {
    const { Nombre } = req.body;

    if (!Nombre) {
        return res.status(400).json({ error: 'Por favor, proporciona el nombre del producto a eliminar' });
    }

    const query = 'DELETE FROM Producto WHERE Nombre = ?';

    db.query(query, [Nombre], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al borrar el producto' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json({ message: 'Producto borrado exitosamente' });
    });
});

// Editar un producto por nombre
app.put('/productos', (req, res) => {
    const { Nombre, Proveedor_id, Marca_id, Cantidad_stock, Precio, ISV, Precio_venta } = req.body;

    if (!Nombre) {
        return res.status(400).json({ error: 'Por favor, proporciona el nombre del producto a editar' });
    }

    const query = `
        UPDATE Producto
        SET Proveedor_id = ?, Marca_id = ?, Cantidad_stock = ?, Precio = ?, ISV = ?, Precio_venta = ?
        WHERE Nombre = ?
    `;

    db.query(query, [Proveedor_id, Marca_id, Cantidad_stock, Precio, ISV, Precio_venta, Nombre], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al editar el producto' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json({ message: 'Producto editado exitosamente' });
    });
});



app.get('/citas', (req, res) => {
    const query = `
         SELECT 
    cita.id AS id,
    cita.fecha AS fecha,
    cita.hora AS hora,
    servicio.nombre AS servicio,
    usuario.nombre AS usuario,
    cliente.nombre AS cliente,
    estado_cita.descripcion AS estado_cita,
    CASE 
        WHEN usuario.Rol_id = 3 THEN 'Estilista'
        ELSE 'Otro Rol'
    END AS Estilista
FROM cita
JOIN servicio ON cita.servicio_id = servicio.id
JOIN usuario ON cita.usuario_id = usuario.id
JOIN cliente ON cita.cliente_id = cliente.id
 JOIN estado_cita ON cita.estado_cita_id = estado_cita.id;
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener citas:', err);
            return res.status(500).json({ error: 'Error al obtener citas' });
        }

        console.log('Datos obtenidos:', results);
        res.json(results);
    });
});
// GET Obtener los nombres de los servicios
app.get('/servicios', (req, res) => {
    db.query('SELECT Nombre FROM servicio', (err, results) => {
        if (err) {
            console.error('Error al obtener servicios:', err);
            return res.status(500).json({ error: 'Error al obtener servicios' });
        }
        res.status(200).json(results);
    });
});
// GET /estilistas - Obtener todos los usuarios con rol de estilista
app.get('/estilistas', (req, res) => {
    db.query('SELECT Nombre FROM usuario WHERE rol_id = 2', (err, results) => {
        if (err) {
            console.error('Error al obtener estilistas:', err);
            return res.status(500).json({ error: 'Error al obtener estilista' });
        }
        res.status(200).json(results);
    });
});

// GET /GET Obtener los nombres de los clientes
app.get('/clientes', (req, res) => {
    db.query('SELECT Nombre FROM cliente', (err, results) => {
        if (err) {
            console.error('Error al obtener clientes:', err);
            return res.status(500).json({ error: 'Error al obtener clientes' });
        }
        res.status(200).json(results);
    });
});

// Endpoint para agregar un cliente
app.post('/clientes', (req, res) => {
    const { Nombre, Rtn, Direccion, Numero_Telefono, Email } = req.body;
    db.query('INSERT INTO cliente (Nombre, Rtn, Direccion, Numero_Telefono, Email) VALUES (?, ?, ?, ?, ?)',
         [Nombre, Rtn, Direccion, Numero_Telefono, Email], (err, results) => {
        if (err) {
            console.error('Error al agregar cliente:', err);
            return res.status(500).json({ error: 'Error al agregar cliente' });
        }
        res.status(201).json({ message: 'Cliente agregado con éxito', id: results.insertId });
    });
});

// Endpoint para agregar una cita
app.post('/citas', (req, res) => {
    const { Cliente_id, fecha, hora, Servicio_id, Usuario_id } = req.body;

    const query = `
        INSERT INTO cita (Cliente_id, fecha, hora, Servicio_id, Usuario_id, estado_cita_id)
        VALUES (?, ?, ?, ?, ?, (SELECT id FROM estado_cita WHERE descripcion = 'Pendiente'))
    `;

    db.query(query, [Cliente_id, fecha, hora,  Servicio_id, Usuario_id ], (err, results) => {
        if (err) {
            console.error('Error al agregar cita:', err);
            return res.status(500).json({ error: 'Error al agregar cita' });
        }

        res.status(201).json({ message: 'Cita agregada con éxito', id: results.insertId });
    });
});


app.delete('/citas/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM cita WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) {
            console.error('Error al eliminar la cita: ' + err.stack);
            return res.status(500).json({ error: 'Error al eliminar la cita' });
        }
        res.status(200).json({ message: 'Cita eliminada con exito' });
    });
});

// Endpoint para obtener la información de la empresa
app.get('/empresa', (req, res) => {
    const query = `
          SELECT 
        nombre,
        razon_social AS razonSocial,
        rtn,
        Teléfono,
       	direccion,
        Correo_electronico ,
        cai,
        establecimiento,
        punto_emision AS puntoEmision,
        tipo_documento AS tipoDocumento,
        factura_inicio AS facturaInicio,
        factura_limite AS facturaLimite,
        factura_actual AS facturaActual,
        fecha_limite_emision AS fechaLimiteEmision,
        fecha_inicio AS fechaInicio
      FROM info_empresa
      LIMIT 1
    `;
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error al obtener la información de la empresa:', err);
        return res.status(500).json({ error: 'Error al obtener la información de la empresa' });
      }
  
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ message: 'Información de la empresa no encontrada' });
      }
    });
  });

  // Endpoint para obtener la información de la empresa
app.get('/empresa/detalles', (req, res) => {
    const query = `
          SELECT 
        nombre,
        razon_social AS razonSocial,
        rtn,
        Teléfono,
       	direccion,
        Correo_electronico ,
        cai,
        establecimiento,
        punto_emision AS puntoEmision,
        tipo_documento AS tipoDocumento,
        factura_inicio AS facturaInicio,
        factura_limite AS facturaLimite,
        fecha_limite_emision AS fechaLimiteEmision,
        fecha_inicio AS fechaInicio
      FROM info_empresa
      LIMIT 1
    `;
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error al obtener la información de la empresa:', err);
        return res.status(500).json({ error: 'Error al obtener la información de la empresa' });
      }
  
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ message: 'Información de la empresa no encontrada' });
      }
    });
  });

// Endpoint para actualizar la información de la empresa
app.put('/empresa/detalles', (req, res) => {
    const {
        nombre,
        razonSocial,
        rtn,
        Teléfono,
        Correo_electronico,
        direccion,
        cai,
        establecimiento,
        puntoEmision,
        tipoDocumento,
        facturaInicio,
        facturaLimite,
        fechaLimiteEmision,
        fechaInicio
    } = req.body;

    // Asegúrate de que todos los campos necesarios estén presentes
    if (!nombre || !razonSocial || !rtn || !Teléfono || !Correo_electronico || !direccion || !cai || !establecimiento || !puntoEmision || !tipoDocumento || !facturaInicio || !facturaLimite || !fechaLimiteEmision || !fechaInicio) {
        return res.status(400).json({ error: 'Todos los campos son necesarios' });
    }

    const query = `
      UPDATE info_empresa
      SET 
        nombre = ?,
        razon_social = ?,
        rtn = ?,
        Teléfono = ?,
        Correo_electronico = ?,
        direccion = ?,
        cai = ?,
        establecimiento = ?,
        punto_emision = ?,
        tipo_documento = ?,
        factura_inicio = ?,
        factura_limite = ?,
        fecha_limite_emision = ?,
        fecha_inicio = ?
      WHERE id = 1;  
    `;

    const values = [
        nombre,
        razonSocial,
        rtn,
        Teléfono,
        Correo_electronico,
        direccion,
        cai,
        establecimiento,
        puntoEmision,
        tipoDocumento,
        facturaInicio,
        facturaLimite,
        fechaLimiteEmision,
        fechaInicio
    ];

    db.query(query, values, (err) => {
        if (err) {
            console.error('Error al actualizar la información de la empresa:', err);
            return res.status(500).json({ error: 'Error al actualizar la información de la empresa' });
        }

        res.json({ message: 'Información de la empresa actualizada correctamente' });
    });
});

// Endpoint para obtener la lista de proveedores
app.get('/proveedores', (req, res) => {
    const query = 'SELECT id, Nombre , Direccion, Numero_Telefono , email FROM proveedor';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching proveedores:', err);
            return res.status(500).json({ error: 'Error al obtener la lista de proveedores' });
        }

        res.json(results);
    });
});

app.get('/productos-proveedor/:Proveedor_id', (req, res) => {
    const { Proveedor_id } = req.params;

    const query = ' SELECT Nombre, Marca_id, descripcion, Precio FROM producto WHERE Proveedor_id = ?';
    db.query(query, [Proveedor_id], (err, results) => {
        if (err) {
            console.error('Error al realizar la consulta: ' + err.stack);
            return res.status(500).json({ error: 'Error al obtener productos' });
        }
        res.json(results);
    });
});

app.post('/proveedores', (req, res) => {
    const { Nombre, Direccion, Numero_Telefono, Email } = req.body;

    const query = 'INSERT INTO proveedor (Nombre, Direccion, Numero_Telefono , Email) VALUES (?, ?, ?, ?)';
    db.query(query, [Nombre, Direccion, Numero_Telefono, Email], (err, results) => {
        if (err) {
            console.error('Error al agregar proveedor: ' + err.stack);
            return res.status(500).json({ error: 'Error al agregar proveedor' });
        }
        res.status(201).json({ id: results.insertId, ...req.body });
    });
});

app.put('/proveedores/:id', (req, res) => {
    const { id } = req.params;
    const { Nombre, Direccion, Numero_Telefono, Email} = req.body;

    const query = 'UPDATE proveedor SET Nombre = ?, Direccion = ?, Numero_Telefono = ?, Email = ? WHERE id = ?';
    db.query(query, [Nombre, Direccion, Numero_Telefono, Email, id], (err) => {
        if (err) {
            console.error('Error al actualizar proveedor: ' + err.stack);
            return res.status(500).json({ error: 'Error al actualizar proveedor' });
        }
        res.status(200).json({ id, ...req.body });
    });
});

app.delete('/proveedores/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM proveedor WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) {
            console.error('Error al eliminar proveedor: ' + err.stack);
            return res.status(500).json({ error: 'Error al eliminar proveedor' });
        }
        res.status(200).json({ message: 'Proveedor eliminado' });
    });
});

app.listen(4000, () => {
    console.log("Backend conectado en el puerto 4000");
});

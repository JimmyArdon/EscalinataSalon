import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();

// Configuración de la base de datos
const db = mysql.createConnection({
    host: 'localhost', //en estos campos
    user: 'root', //introduzcan sus credenciales
    password: 'root0101', //del mysql para que asi puedan
    database: 'escalinatasalon' //hacer llamado de los datos
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

//Obtener productos del inventario
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
    const { Nombre, CodigoBarra, Proveedor_id, Marca_id, Cantidad_stock, Precio, ISV, Precio_venta } = req.body;

    // Validación simple de datos
    if (!Nombre || !CodigoBarra || !Proveedor_id || !Marca_id || !Cantidad_stock || !Precio || !ISV || !Precio_venta) {
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


// Obtener usuarios
app.get('/usuarios', (req, res) => {
    const query = 'SELECT * FROM Usuario';

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener los productos' });
        }

        res.status(200).json(results);
    });
});

app.listen(4000, () => {
    console.log("Backend conectado en el puerto 4000");
});

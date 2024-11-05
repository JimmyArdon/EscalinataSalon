import dotenv from 'dotenv';
import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



dotenv.config();
const app = express();


// Configuración de la base de datos
const db = mysql.createConnection({
    host: 'localhost', // Cambia estos valores según tu configuración
    user: 'root', // Cambia estos valores según tu configuración
    password: '12345678', // Cambia estos valores según tu configuración
    database: 'escalinatasalon' // Nombre de la base de datos

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

// Middleware de Autorización
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer token

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};
// Ruta de login
app.post('/login', async (req, res) => {
    const { usuario, contraseña } = req.body;

    if (!usuario || !contraseña) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const query = 'SELECT * FROM usuario WHERE usuario = ?';
    db.query(query, [usuario], async (err, results) => {
        if (err) {
            console.error('Error en la base de datos:', err);
            return res.status(500).json({ error: 'Error en la base de datos' });
        }
        if (results.length === 0) {
            return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
        }

        const user = results[0];

        const isMatch = await bcrypt.compare(contraseña, user.contraseña);
        if (!isMatch) {
            return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
        }

        if (!process.env.JWT_SECRET) {
            console.error('La clave secreta para JWT no está definida en las variables de entorno.');
            return res.status(500).json({ error: 'Error en la configuración del servidor' });
        }

        const token = jwt.sign({ id: user.id, rol_id: user.rol_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, rol_id: user.rol_id });
    });
});


app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Acceso concedido', user: req.user });
});

// Obtener usuarios
app.get('/usuarios', (req, res) => {
    const query = `
    SELECT 
      u.id,
      u.nombre,
      u.apellido,
      u.telefono,
      u.email,
      u.usuario,
      r.descripcion AS Rol
    FROM 
      usuario u
    JOIN 
      roles r ON u.rol_id = r.id
  `;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener usuarios: ', err);
            return res.status(500).json({ error: 'Error al obtener los usuarios' });
        }
        res.status(200).json(results);
    });
});

// Obtener roles
app.get('/roles', (req, res) => {
    const query = `SELECT * FROM roles`;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener los roles: ', err);
            return res.status(500).json({ error: 'Error al obtener los roles' });
        }
        res.status(200).json(results);
    });
});


// Endpoint para obtener usuarios con sus roles
app.get('/usuarios-roles', (req, res) => {
    const query = `
    SELECT 
      u.id,
      u.nombre,
      u.apellido,
      u.telefono,
      u.email,
      u.usuario,
      r.descripcion AS Rol
    FROM 
      usuario u
    JOIN 
      roles r ON u.rol_id = r.id
  `;
  
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Error en la consulta' });
      }
      res.json(results);
    });
});


// Método POST para agregar un nuevo usuario
app.post('/usuarios', async (req, res) => {
    const { nombre, apellido, telefono, email, usuario, contraseña, rol_id } = req.body;
    if (!nombre || !apellido || !telefono || !email || !usuario || !contraseña || rol_id === undefined) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const query = 'INSERT INTO usuario (nombre, apellido, telefono, email, usuario, contraseña, rol_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [nombre, apellido, telefono, email, usuario, hashedPassword, rol_id];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al insertar el usuario' });
        }
        res.status(201).json({ id: result.insertId, nombre, apellido, telefono, email, rol_id });
    });
});

// Método PUT para actualizar un usuario
app.put('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, telefono, email, usuario,  rol_id } = req.body;

    if (!nombre || !apellido || !telefono || !email || !usuario || rol_id === undefined) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const query = `
        UPDATE usuario
        SET nombre = ?, apellido = ?, telefono = ?, email = ?, usuario = ?, rol_id = ?
        WHERE id = ?
    `;
    const values = [nombre, apellido, telefono, email, usuario, rol_id, id];

    db.query(query, values, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al actualizar el usuario' });
        }
        res.status(200).json({ message: 'Usuario actualizado', id });
    });
});

app.put('/usuarios/:id, async' , (req, res) => {
    const { id } = req.params;
    const { nuevaContraseña } = req.body;

    // Verifica que la nueva contraseña esté presente
    if (!nuevaContraseña) {
        return res.status(400).json({ error: 'Falta la nueva contraseña' });
    }
    // Hashea la nueva contraseña
    const hashedPassword = bcrypt.hash(nuevaContraseña, 10);
    // Consulta SQL para actualizar solo la contraseña
    const query = `
        UPDATE usuario
        SET contraseña = ?
        WHERE id = ?
    `;
    const values = [hashedPassword, id];
    // Ejecuta la consulta
    db.query(query, values, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al cambiar la contraseña' });
        }
        res.status(200).json({ message: 'Contraseña cambiada con éxito', id });
    });
});

// Método DELETE para eliminar
app.delete('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM usuario WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar el usuario:', err);
            return res.status(500).json({ message: 'Error al eliminar el usuario.' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        res.status(200).json({ message: 'Usuario eliminado correctamente.' });
    });
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

// Obtener un productos del inventario
app.get('/productos/:id', (req, res) => {
    const { id } = req.params;
    try {
      db.query(`SELECT * FROM Producto WHERE Id = ?`, [id], (err, rows) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(200).json(rows[0]);
        }
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
})
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

// Método PUT para actualizar un producto existente
app.put('/productos/:id', (req, res) => {
    const { id } = req.params;
    const { Nombre, Proveedor_id, Marca_id, Cantidad_stock, Precio, ISV, Precio_venta } = req.body;
    const query = `
     UPDATE Producto 
        SET Nombre = ?, Proveedor_id = ?, Marca_id = ?, Cantidad_stock = ?, Precio = ?, ISV = ?, Precio_venta = ? 
        WHERE Id = ?`;
        db.query(query, [Nombre, Proveedor_id, Marca_id, Cantidad_stock, Precio, ISV, Precio_venta, id], (err, result) => {
            if (err) {
                console.error('Error al actualizar el producto:', err);
            res.status(500).send('Error al actualizar el producto');
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('Producto no encontrado');
            return;
        }
        res.send('Producto actualizado exitosamente');
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

// Endpoint para obtener una cita específica
app.get('/citas/:id', (req, res) => {
    const citaId = req.params.id;
    const query = `
        SELECT 
            cita.id AS id,
            cita.fecha AS fecha,
            cita.hora AS hora,
            servicio.id AS servicio_id,
            servicio.nombre AS servicio,
            usuario.id AS usuario_id,
            usuario.nombre AS estilista,
            cliente.id AS cliente_id,
            cliente.nombre AS cliente,
            estado_cita.id AS estado_cita_id,
            estado_cita.descripcion AS estado_cita
        FROM cita
        JOIN servicio ON cita.servicio_id = servicio.id
        JOIN usuario ON cita.usuario_id = usuario.id
        JOIN cliente ON cita.cliente_id = cliente.id
        JOIN estado_cita ON cita.estado_cita_id = estado_cita.id
        WHERE cita.id = ?
    `;

    db.query(query, [citaId], (err, results) => {
        if (err) {
            console.error('Error al obtener la cita:', err);
            return res.status(500).json({ error: 'Error al obtener la cita' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Cita no encontrada' });
        }

        res.json(results[0]);
    });
});


// PUT /citas/:id - Editar una cita
app.put('/citas/:id', (req, res) => {
    const { id } = req.params; // Obtener el ID de la cita desde los parámetros de la URL
    const { clienteId, fecha, hora, servicioId, usuarioId, estadoCitaId } = req.body; // Obtener los datos desde el cuerpo de la solicitud

    // Consulta SQL para actualizar la cita
    const query = `
        UPDATE cita
        SET
            cliente_id = ?,
            fecha = ?,
            hora = ?,
            servicio_id = ?,
            usuario_id = ?,
            estado_cita_id = ?
        WHERE id = ?;
    `;

    // Ejecutar la consulta SQL
    db.query(query, [clienteId, fecha, hora, servicioId, usuarioId, estadoCitaId, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar la cita:', err);
            return res.status(500).json({ error: 'Error al actualizar la cita' });
        }

        // Verificar si se actualizó alguna fila
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Cita no encontrada' });
        }

        res.status(200).json({ message: 'Cita actualizada correctamente' });
    });
});

// GETALL Obtener los nombres de los servicios
app.get('/servicios', (req, res) => {
    db.query('SELECT Nombre FROM servicio', (err, results) => {
        if (err) {
            console.error('Error al obtener servicios:', err);
            return res.status(500).json({ error: 'Error al obtener servicios' });
        }
        res.status(200).json(results);
    });
});

app.delete('/servicios', (req, res) => {
    const nombreServicio = req.body.Nombre;

    // Primero, verificamos si el servicio existe
    const checkSql = 'SELECT * FROM Servicio WHERE Nombre = ?';
    db.query(checkSql, [nombreServicio], (err, results) => {
        if (err) {
            console.error('Error al buscar el servicio:', err);
            res.status(500).json({ error: 'Error al buscar el servicio' });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ error: 'Servicio no encontrado' });
            return;
        }

        const servicioId = results[0].Id;

        // Eliminar las citas relacionadas
        const deleteCitasSql = 'DELETE FROM Cita WHERE Servicio_id = ?';
        db.query(deleteCitasSql, [servicioId], (err) => {
            if (err) {
                console.error('Error al eliminar citas relacionadas:', err);
                res.status(500).json({ error: 'Error al eliminar citas relacionadas' });
                return;
            }

            // Ahora, eliminar el servicio
            const deleteSql = 'DELETE FROM Servicio WHERE Nombre = ?';
            db.query(deleteSql, [nombreServicio], (err) => {
                if (err) {
                    console.error('Error al eliminar el servicio:', err);
                    res.status(500).json({ error: 'Error al eliminar el servicio' });
                    return;
                }

                res.json({ message: 'Servicio y citas relacionadas eliminados con éxito' });
            });
        });
    });
});

// Método PUT para actualizar un servicio existente
app.put('/servicios/:id', (req, res) => {
    const { id } = req.params;
    const { Nombre, Duracion, Precio, Descripcion } = req.body;
    const query = 'UPDATE Servicio SET Nombre = ?, Duracion = ?, Precio = ?, Descripcion = ? WHERE Id = ?';
    db.query(query, [Nombre, Duracion, Precio, Descripcion, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar el servicio:', err);
            res.status(500).send('Error al actualizar el servicio');
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('Servicio no encontrado');
            return;
        }
        res.send('Servicio actualizado exitosamente');
    });
});

// Método POST para crear un nuevo servicio
app.post('/servicios', (req, res) => {
    const { Nombre, Duracion, Precio, Descripcion } = req.body;
    const query = 'INSERT INTO Servicio (Nombre, Duracion, Precio, Descripcion) VALUES (?, ?, ?, ?)';
    db.query(query, [Nombre, Duracion, Precio, Descripcion], (err, result) => {
        if (err) {
            console.error('Error al crear el servicio:', err);
            res.status(500).send('Error al crear el servicio');
            return;
        }
        res.status(201).send(`Servicio creado con ID: ${result.insertId}`);
    });
});


// GET Obtener data de los servicios
app.get('/servicioss', (req, res) => {
    db.query('SELECT * FROM servicio', (err, results) => {
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
  
//GETONE - Consultar un servicio
app.get('/servicioss/:id', (req, res) => {
    const { id } = req.params;
    try {
      db.query(`SELECT * FROM servicio WHERE Id = ?`, [id], (err, rows) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(200).json(rows[0]);
        }
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
})

// Buscar productos por nombre
app.get('/nameProductos', (req, res) => {
    const nombre = req.query.Nombre || '';
    const query = 'SELECT Id, Nombre, Proveedor_id, Marca_id, Cantidad_stock, Precio, ISV, Precio_venta FROM Producto WHERE Nombre LIKE ?';
    db.query(query, [`%${nombre}%`], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al obtener los productos' });
        }
        res.json(results);
    });
});

//BorrarProductos
app.delete('/nameProductos', (req, res) => {
    const { Id } = req.body;

    if (!Id) {
        return res.status(400).json({ error: 'ID del producto es requerido' });
    }
    const query = 'DELETE FROM Producto WHERE Id = ?';
    db.query(query, [Id], (err, results) => {
        if (err) { 
            console.error(err);
            return res.status(500).json({ error: 'Error al eliminar el producto' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json({ message: 'Producto eliminado correctamente' });
    });
});
//GETBYNAME - Consultar Servicio por nombre
app.get('/servicios/nombre', (req, res) => {
    const { Nombre } = req.query;

    if (!Nombre) {
        return res.status(400).json({ error: 'El parámetro de búsqueda es obligatorio' });
    }

    db.query(
        'SELECT * FROM servicio WHERE Nombre LIKE ?',
        [`%${Nombre}%`],
        (err, rows) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.status(200).json(rows);
        }
    );    
});

//GETONE - Ingresar un Servicio
app.post('/servicios', (req, res) => {
    try {
        const { Nombre, Duracion, Precio, Descripcion } = req.body;
        db.query(
          `INSERT INTO servicio (Id, Nombre, Duracion, Precio, Descripcion) VALUES (NULL, ?, ?, ?, ?);`,
          [Nombre, Duracion, Precio, Descripcion],
          (err, rows) => {
            if (err) {
              res.status(400).send(err);
            } else {
              res.status(201).json({ id: rows.insertId });
            }
          }
        );
      } catch (err) {
        res.status(500).send(err.message);
      }
})

//PUT  Actualizar Servicio
app.put('/servicios/:id', (req, res) => {
    const { id } = req.params;
    try {
        const { Nombre, Duracion, Precio, Descripcion } = req.body;
        db.query(
            `UPDATE servicio SET Nombre=?, Duracion=?, Precio=?, Descripcion=? WHERE Id=?;`,
            [Nombre, Duracion, Precio, Descripcion, id],
            (err, rows) => {
                if (err) {
                    return res.status(400).send(err);
                }
                if (rows.affectedRows == 1) {
                    return res.status(200).json({ respuesta: 'Servicio actualizado con éxito' });
                }
                return res.status(404).json({ mensaje: 'Servicio no encontrado' });
            }
        );
    } catch (err) {
        res.status(500).send(err.message);
    }
})

// DELETE - Borrar un servicio
app.delete('/servicios/:id', (req, res) => {
    const { id } = req.params;
    try {
        db.query(`DELETE FROM servicio WHERE Id=?;`,
            [id], (err, rows) => {
                if (err) {
                    return res.status(400).send(err);
                }
                if (rows.affectedRows == 1) {
                    return res.status(200).json({ respuesta: 'Servicio eliminado con éxito' });
                }
                return res.status(404).json({ mensaje: 'Servicio no encontrado' });
            }
        );
    } catch (err) {
        res.status(500).send(err.message);
    }
})

// Promociones para los servicios
app.get('/promociones-servicios', (req, res) => {
    const { Servicio_id } = req.query;

    if (Servicio_id) {
        db.query(
            'SELECT * FROM promociones_servicios WHERE Servicio_id LIKE ?',
            [`%${Servicio_id}%`],
            (err, rows) => {
                if (err) {
                    return res.status(400).json({ error: err.message });
                }
                res.status(200).json(rows);
            }
        );
    } else {
        // Buscar todos los servicios si no se proporciona Servicio_id
        db.query(
            'SELECT * FROM promociones_servicios',
            (err, rows) => {
                if (err) {
                    return res.status(400).json({ error: err.message });
                }
                res.status(200).json(rows);
            }
        );
    }
});

// GETONE - Una Promocion para los servicios
app.get('/promociones-servicios/:id', (req, res) => {
    const { id } = req.params;
        
        
        db.query('SELECT * FROM promociones_servicios WHERE Id = ?', [id], (err, rows) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            
            if (rows.length === 0) {
                return res.status(404).json({ message: 'Servicio no encontrado' });
            }
            res.status(200).json(rows[0]);
        });
})

// POST - Ingresar una promocion de servicios 
app.post('/promociones-servicios',(req, res) => {
    const { Servicio_id, Descuento, Fecha_inicio, Fecha_fin } = req.body;
        
        db.query(
            `INSERT INTO promociones_servicios (Servicio_id, Descuento, Fecha_inicio, Fecha_fin)
            VALUES (?, ?, ?, ?);`,
            [Servicio_id, Descuento, Fecha_inicio, Fecha_fin],
            (err, result) => {
                if (err) {
                    return res.status(400).json({ error: err.message });
                }
                res.status(201).json({ id: result.insertId });
            }
        );
});

// PUT - Actualizar una promocion de servicio
app.put('/promociones-servicios/:id', (req, res) => {
    const { id } = req.params;
    const { Servicio_id, Descuento, Fecha_inicio, Fecha_fin } = req.body;

    if (id) {
        // Actualizar por ID
        db.query(
            `UPDATE promociones_servicios SET Servicio_id = ?, Descuento = ?, Fecha_inicio = ?, Fecha_fin = ? WHERE Id = ?`,
            [Servicio_id, Descuento, Fecha_inicio, Fecha_fin, id],
            (err, result) => {
                if (err) {
                    return res.status(400).json({ error: err.message });
                }
                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: 'Promoción no encontrada' });
                }
                res.status(200).json({ message: 'Promoción actualizada correctamente' });
            }
        );
    } 
});

// DELETE - Elimina una promocion de servicios
app.delete('/promociones-servicios/:id', (req, res) => {
    const { id } = req.params;
    try {
        db.query(`DELETE FROM promociones_servicios WHERE Id=?;`,
            [id], (err, rows) => {
                if (err) {
                    return res.status(400).send(err);
                }
                if (rows.affectedRows == 1) {
                    return res.status(200).json({ respuesta: 'Promocion de servicio eliminado con éxito' });
                }
                return res.status(404).json({ mensaje: 'Promocion de servicio no encontrado' });
            }
        );
    } catch (err) {
        res.status(500).send(err.message);
    }
})

// GET BONIFICACIONES
app.get('/bonificaciones',(req, res) => {
    db.query('SELECT Id, Producto_id, Descripcion, Precio_unitario FROM bonificaciones;', (err, results) => {
        if (err) {
            console.error('Error al obtener estilistas:', err);
            return res.status(500).json({ error: 'Error al obtener bonificaciones' });
        }
        res.status(200).json(results);
    });
})

// GET una bonificación por Descripción
app.get('/bonificaciones/descripcion', (req, res) => {
    const { Descripcion } = req.query;

    if (!Descripcion) {
        return res.status(400).json({ error: 'El parámetro de búsqueda es obligatorio' });
    }

    db.query(
        'SELECT * FROM bonificaciones WHERE Descripcion LIKE ?',
        [`%${Descripcion}%`],
        (err, rows) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.status(200).json(rows);
        }
    );    
});

// GET una bonificacion
app.get('/bonificaciones/:id', (req, res) => {
    const { id } = req.params;
        
        
        db.query('SELECT * FROM bonificaciones WHERE Id = ?', [id], (err, rows) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            
            if (rows.length === 0) {
                return res.status(404).json({ message: 'Bonificacion no encontrado' });
            }
            res.status(200).json(rows[0]);
        });
})

// DELETE UNA BONIFICACION 
app.delete('/bonificaciones/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM bonificaciones WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) {
            console.error('Error al eliminar la bonificacion: ' + err.stack);
            return res.status(500).json({ error: 'Error al eliminar la bonificacion' });
        }
        res.status(200).json({ message: 'bonificacion eliminada con exito' });
    });
});

// POST - Una bonificacion

app.post('/bonificaciones',(req, res) => {
    const { Producto_id, Descripcion, Precio_unitario } = req.body;
        
        db.query(
            `INSERT INTO bonificaciones (Id, Producto_id, Descripcion, Precio_unitario)
            VALUES (NULL, ?, ?, ?);`,
            [Producto_id, Descripcion, Precio_unitario],
            (err, result) => {
                if (err) {
                    return res.status(400).json({ error: err.message });
                }
                res.status(201).json({ id: result.insertId });
            }
        );
})

// PUT - ACTUALIZAAR BONIFICAION
app.put('/bonificaciones/:id', (req, res) => {
    const { id } = req.params;
    const { Producto_id, Descripcion, Precio_unitario } = req.body;

    if (id) {
        // Actualizar por ID
        db.query(
            `UPDATE bonificaciones SET Producto_id = ?, Descripcion = ?, Precio_unitario = ? WHERE Id = ?`,
            [Producto_id, Descripcion, Precio_unitario, id],
            (err, result) => {
                if (err) {
                    return res.status(400).json({ error: err.message });
                }
                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: 'Bonificacion no encontrada' });
                }
                res.status(200).json({ message: 'Bonificacion actualizada correctamente' });
            }
        );
    } 
});

app.put('/promociones-servicios/:id', (req, res) => {
    const { id } = req.params;
    const { Servicio_id, Descuento, Fecha_inicio, Fecha_fin } = req.body;

    if (id) {
        // Actualizar por ID
        db.query(
            `UPDATE promociones_servicios SET Servicio_id = ?, Descuento = ?, Fecha_inicio = ?, Fecha_fin = ? WHERE Id = ?`,
            [Servicio_id, Descuento, Fecha_inicio, Fecha_fin, id],
            (err, result) => {
                if (err) {
                    return res.status(400).json({ error: err.message });
                }
                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: 'Promoción no encontrada' });
                }
                res.status(200).json({ message: 'Promoción actualizada correctamente' });
            }
        );
    } 
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


app.get('/clientess', (req, res) => {
    db.query('SELECT * FROM cliente', (err, results) => {
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


app.get('/clientess/:id', (req, res) => {
    const { id } = req.params; // Obtén el ID del parámetro de la solicitud

    // Realiza la consulta con un filtro WHERE para obtener el cliente específico
    db.query('SELECT * FROM cliente WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al obtener cliente:', err);
            return res.status(500).json({ error: 'Error al obtener cliente' });
        }

        if (results.length === 0) {
            // Si no se encuentra el cliente, devuelve un error 404
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        // Devuelve el primer resultado ya que el ID debería ser único
        res.status(200).json(results[0]);
    });
});


app.put('/clientess/:id', (req, res) => {
    const { id } = req.params;
    const { Nombre, Rtn, Direccion, Numero_Telefono, Email } = req.body;

    // Verificar que todos los campos necesarios están presentes
    if (!Nombre || !Rtn || !Direccion || !Numero_Telefono || !Email) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const query = `
        UPDATE cliente 
        SET Nombre = ?, Rtn = ?, Direccion = ?, Numero_Telefono = ?, Email = ?
        WHERE id = ?
    `;
    const values = [Nombre, Rtn, Direccion, Numero_Telefono, Email, id];

    db.query(query, values, (err) => {
        if (err) {
            console.error('Error al actualizar cliente:', err);
            return res.status(500).json({ error: 'Error al actualizar cliente' });
        }
        res.status(200).json({ message: 'Cliente actualizado con éxito' });
    });
});
// Endpoint para agregar una cita
app.post('/citas', (req, res) => {
    const { Cliente_id, fecha, hora, Servicio_id, Usuario_id } = req.body;

    // Query to check if the Cliente, Usuario, and Servicio IDs exist
    const validationQuery = `
        SELECT EXISTS(SELECT 1 FROM cliente WHERE Id = ?) AS clienteExists,
               EXISTS(SELECT 1 FROM usuario WHERE Id = ?) AS usuarioExists,
               EXISTS(SELECT 1 FROM servicio WHERE Id = ?) AS servicioExists
    `;


    db.query(validationQuery, [Cliente_id, Usuario_id, Servicio_id], (err, results) => {
        if (err) {
            console.error('Error al validar IDs:', err);
            return res.status(500).json({ error: 'Error al validar IDs' });
        }

        const { clienteExists, usuarioExists, servicioExists } = results[0];

        if (!clienteExists) {
            return res.status(400).json({ error: 'Cliente no encontrado' });
        }
        if (!usuarioExists) {
            return res.status(400).json({ error: 'Usuario no encontrado' });
        }
        if (!servicioExists) {
            return res.status(400).json({ error: 'Servicio no encontrado' });
        }

        // Proceed with the insertion if all IDs are valid
        const insertQuery = `
            INSERT INTO cita (Cliente_id, fecha, hora, Servicio_id, Usuario_id, estado_cita_id)
            VALUES (?, ?, ?, ?, ?, (SELECT id FROM estado_cita WHERE descripcion = 'Pendiente'))
        `;

        db.query(insertQuery, [Cliente_id, fecha, hora, Servicio_id, Usuario_id], (err, results) => {
            if (err) {
                console.error('Error al agregar cita:', err);
                return res.status(500).json({ error: 'Error al agregar cita' });
            }

            res.status(201).json({ message: 'Cita agregada con éxito', id: results.insertId });
        });
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
}) ;

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

    const query = ' SELECT Nombre, Marca_id, m.Descripcion as Marca , p.Descripcion, Precio FROM producto p join marca m on p.Marca_id = m.Id WHERE Proveedor_id = ?';
    db.query(query, [Proveedor_id], (err, results) => {
        if (err) {
            console.error('Error al realizar la consulta: ' + err.stack);
            return res.status(500).json({ error: 'Error al obtener productos' });
        }
        res.json(results);
    });
});

app.post('/proveedoress', (req, res) => {
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

app.put('/proveedoress/:id', (req, res) => {
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

app.delete('/proveedoress/:id', (req, res) => {
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

app.get('/terminos', (req, res) => {
    const query = 'SELECT * FROM tipo_venta;';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching marcas:', err);
            return res.status(500).json({ error: 'Error al obtener la lista de marcas' });
        }

        res.json(results);
    });
});
// GETALL - Trae las marcas
app.get('/marca', (req, res) => {
    const query = 'SELECT Id, Descripcion FROM marca;';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching marcas:', err);
            return res.status(500).json({ error: 'Error al obtener la lista de marcas' });
        }

        res.json(results);
    });
});

// GETALL - Trae una marcas
app.get('/marca/:id', (req, res) => {
    const { id } = req.params;
        
        
        db.query('SELECT * FROM marca WHERE Id = ?', [id], (err, rows) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            
            if (rows.length === 0) {
                return res.status(404).json({ message: 'Marca no encontrado' });
            }
            res.status(200).json(rows[0]);
        });
})

// Obtener ventas al crédito con filtro de cliente
app.get('/ventas-credito', (req, res) => {
    db.query('  SELECT vc.*, c.nombre, tev.Descripcion FROM ventas_credito vc JOIN cliente c ON vc.cliente_id = c.id JOIN tipo_estado_venta tev ON vc.Tipo_estado_id  = tev.Id ',
        (err, results) => {
            if (err) {
                console.error('Error fetching ventas data:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.json(results);
        });
});

app.get('/historial-venta', (req, res) => {
    const { filter, clientFilter } = req.query;

    // Consulta base
    let query = `
        SELECT hv.*, c.nombre AS nombreCliente, f.numero_factura
        FROM historial_ventas hv
        JOIN cliente c ON hv.Cliente_id = c.id
        JOIN factura f ON hv.Factura_id = f.id
        WHERE 1=1
    `;
    const params = [];

    // Filtro por nombre de cliente
    if (clientFilter) {
        query += ' AND c.nombre LIKE ?';
        params.push(`%${clientFilter}%`);
    }

    // Filtro por fecha
    if (filter === 'today') {
        query += ' AND DATE(hv.fecha) = CURDATE()';
    } else if (filter === 'week') {
        query += ' AND YEARWEEK(hv.fecha, 1) = YEARWEEK(CURDATE(), 1)';
    } else if (filter === 'month') {
        query += ' AND MONTH(hv.fecha) = MONTH(CURDATE()) AND YEAR(hv.fecha) = YEAR(CURDATE())';
    } else if (filter === 'year') {
        query += ' AND YEAR(hv.fecha) = YEAR(CURDATE())';
    }

    // Ejecución de la consulta
    db.query(query, params, (err, results) => {
        if (err) {
            console.error('Error fetching sales data:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

// Obtener historial de pagos
app.get('/historial-pagos', (req, res) => {
    db.query('SELECT hp.*, c.Nombre FROM historial_pagos hp JOIN cliente c ON hp.Cliente_id = c.id', (err, results) => {
        if (err) {
            console.error('Error fetching historial pagos data:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

// Define el endpoint para registrar un pago
app.post('/registrar-pago', (req, res) => {
    const { ClienteId, montoPagado, fechaPago } = req.body;

    // Verifica que los datos requeridos estén presentes
    if (typeof ClienteId !== 'number' || typeof montoPagado !== 'number' || typeof fechaPago !== 'string') {
        return res.status(400).send('Invalid input');
    }

    // Actualizar venta
    const updateQuery = `
      UPDATE ventas_credito
      SET Monto_pendiente = Monto_pendiente - ?, 
          Tipo_estado_id = CASE 
                            WHEN Monto_pendiente - ? = 0 THEN 1 
                            ELSE 2 
                          END
      WHERE id = ?;
    `;

    db.query(updateQuery, [montoPagado, montoPagado, ClienteId], (err) => {
        if (err) {
            console.error('Error updating venta:', err);
            return res.status(500).send('Internal Server Error');
        }

        // Insertar en historial de pagos
        const insertQuery = 'INSERT INTO historial_pagos (Cliente_id, Monto_pagado, Fecha_pago) VALUES (?, ?, ?)';
        db.query(insertQuery, [ClienteId, montoPagado, fechaPago], (err) => {
            if (err) {
                console.error('Error inserting into historial pagos:', err);
                return res.status(500).send('Internal Server Error');
            }
            res.status(200).send('Pago registrado exitosamente');
        });
    });
});

app.get('/marcas', (req, res) => {
    const query = 'SELECT Id as id, Descripcion as descripcion FROM Marca';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al obtener las marcas' });
        }
        res.json(results);
    });
});

// GETALL - Trae una marcas
app.get('/marca/:id', (req, res) => {
    const { id } = req.params;
        
        
        db.query('SELECT * FROM marca WHERE Id = ?', [id], (err, rows) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            
            if (rows.length === 0) {
                return res.status(404).json({ message: 'Marca no encontrado' });
            }
            res.status(200).json(rows[0]);
        });
})

/// Eliminados antes
// Buscar productos por nombre
app.get('/nameProductos', (req, res) => {
    const nombre = req.query.Nombre || '';
    const query = 'SELECT Id, Nombre, Proveedor_id, Marca_id, Cantidad_stock, Precio, ISV, Precio_venta FROM Producto WHERE Nombre LIKE ?';
    db.query(query, [`%${nombre}%`], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al obtener los productos' });
        }
        res.json(results);
    });
});

app.get('/clientess', (req, res) => {
    db.query('SELECT * FROM cliente', (err, results) => {
        if (err) {
            console.error('Error al obtener clientes:', err);
            return res.status(500).json({ error: 'Error al obtener clientes' });
        }
        res.status(200).json(results);
    })
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
            //res.status(200).json(rows[0]);
        });
})

// Endpoint para eliminar un cliente
app.delete('/clientess/:id', (req, res) => {
    const { id } = req.params;
    
    const query = 'DELETE FROM cliente WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) {
            console.error('Error al eliminar el cliente: ' + err.stack);
            return res.status(500).json({ error: 'Error al eliminar el cliente' });
        }
        res.status(200).json({ message: 'Cliente eliminado con exito' });
    });
});

// Endpoint para obtener un cliente
app.get('/clientess/:id', (req, res) => {
    const { id } = req.params; // Obtén el ID del parámetro de la solicitud

    // Realiza la consulta con un filtro WHERE para obtener el cliente específico
    db.query('SELECT * FROM cliente WHERE id = ?', [id], (err, results) => {
    if (err) {
        console.error('Error al obtener cliente:', err);
        return res.status(500).json({ error: 'Error al obtener cliente' });
    }

    if (results.length === 0) {
        // Si no se encuentra el cliente, devuelve un error 404
        return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    });
})

// Endpoint para actualizar un cliente
app.put('/clientess/:id', (req, res) => {
    const { id } = req.params;
    const { Nombre, Rtn, Direccion, Numero_Telefono, Email } = req.body;

    
    // Verificar que todos los campos necesarios están presentes
    if (!Nombre || !Rtn || !Direccion || !Numero_Telefono || !Email) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const query = `
        UPDATE cliente 
        SET Nombre = ?, Rtn = ?, Direccion = ?, Numero_Telefono = ?, Email = ?
        WHERE id = ?
    `;
    const values = [Nombre, Rtn, Direccion, Numero_Telefono, Email, id];

    db.query(query, values, (err) => {
        if (err) {
            console.error('Error al actualizar cliente:', err);
            return res.status(500).json({ error: 'Error al actualizar cliente' });
        }
    });
});

// DELETE CITA 
app.delete('/citas/:id', (req, res) => {
    const { id } = req.params;
    
    const query = 'DELETE FROM cita WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) {
            console.error('Error al eliminar el cliente: ' + err.stack);
            return res.status(500).json({ error: 'Error al eliminar el cliente' });
        }
        res.status(200).json({ message: 'Cliente eliminado con exito' });
    });
});


// POST - Ingresar una promocion de servicios 
app.post('/promociones-servicios',(req, res) => {
    const { Servicio_id, Descuento, Fecha_inicio, Fecha_fin } = req.body;

        db.query(
            `INSERT INTO promociones_servicios (Servicio_id, Descuento, Fecha_inicio, Fecha_fin)
            VALUES (?, ?, ?, ?);`,
            [Servicio_id, Descuento, Fecha_inicio, Fecha_fin],
            (err, result) => {
                if (err) {
                    return res.status(400).json({ error: err.message });
                }
                res.status(201).json({ id: result.insertId });
            }
        );
});


// Obtener todos los proveedores
app.get('/proveedoress', (req, res) => {
    const query = 'SELECT * FROM proveedor';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching proveedores:', err);
            return res.status(500).json({ error: 'Error al obtener la lista de proveedores' });
        }

        res.json(results);
    });
});


app.get('/marcas', (req, res) => {
    const query = 'SELECT Id as id, Descripcion as descripcion FROM Marca';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al obtener las marcas' });
        }
        res.json(results);
    });
});

app.get('/historial-venta', (req, res) => {
    const { filter, clientFilter } = req.query;

    // Consulta base
    let query = `
        SELECT hv.*, c.nombre AS nombreCliente, f.numero_factura
        FROM historial_ventas hv
        JOIN cliente c ON hv.Cliente_id = c.id
        JOIN factura f ON hv.Factura_id = f.id
        WHERE 1=1
    `;
    const params = [];

    // Filtro por nombre de cliente
    if (clientFilter) {
        query += ' AND c.nombre LIKE ?';
        params.push(`%${clientFilter}%`);
    }

    // Filtro por fecha
    if (filter === 'today') {
        query += ' AND DATE(hv.fecha) = CURDATE()';
    } else if (filter === 'week') {
        query += ' AND YEARWEEK(hv.fecha, 1) = YEARWEEK(CURDATE(), 1)';
    } else if (filter === 'month') {
        query += ' AND MONTH(hv.fecha) = MONTH(CURDATE()) AND YEAR(hv.fecha) = YEAR(CURDATE())';
    } else if (filter === 'year') {
        query += ' AND YEAR(hv.fecha) = YEAR(CURDATE())';
    }

    // Ejecución de la consulta
    db.query(query, params, (err, results) => {
        if (err) {
            console.error('Error fetching sales data:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

// Obtener ventas al crédito con filtro de cliente
app.get('/ventas-credito', (req, res) => {
      db.query('  SELECT vc.*, c.nombre, tev.Descripcion FROM ventas_credito vc JOIN cliente c ON vc.cliente_id = c.id JOIN tipo_estado_venta tev ON vc.Tipo_estado_id  = tev.Id ',
    (err, results) => {
      if (err) {
        console.error('Error fetching ventas data:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.json(results);
    });
  });

  // Obtener historial de pagos
  app.get('/historial-pagos', (req, res) => {
    db.query('SELECT hp.*, c.Nombre FROM historial_pagos hp JOIN cliente c ON hp.Cliente_id = c.id', (err, results) => {
      if (err) {
        console.error('Error fetching historial pagos data:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.json(results);
    });
  });

  // Define el endpoint para registrar un pago
app.post('/registrar-pago', (req, res) => {
    const { ClienteId, montoPagado, fechaPago } = req.body;

    // Verifica que los datos requeridos estén presentes
    if (typeof ClienteId !== 'number' || typeof montoPagado !== 'number' || typeof fechaPago !== 'string') {
      return res.status(400).send('Invalid input');
    }

    // Actualizar venta
    const updateQuery = `
      UPDATE ventas_credito
      SET Monto_pendiente = Monto_pendiente - ?, 
          Tipo_estado_id = CASE 
                            WHEN Monto_pendiente - ? = 0 THEN 1 
                            ELSE 2 
                          END
      WHERE id = ?;
    `;

    db.query(updateQuery, [montoPagado, montoPagado, ClienteId], (err) => {
      if (err) {
        console.error('Error updating venta:', err);
        return res.status(500).send('Internal Server Error');
      }

      // Insertar en historial de pagos
      const insertQuery = 'INSERT INTO historial_pagos (Cliente_id, Monto_pagado, Fecha_pago) VALUES (?, ?, ?)';
      db.query(insertQuery, [ClienteId, montoPagado, fechaPago], (err) => {
        if (err) {
          console.error('Error inserting into historial pagos:', err);
          return res.status(500).send('Internal Server Error');
        }
        res.status(200).send('Pago registrado exitosamente');
      });
    });
  });







app.listen(4000, () => {
    console.log("Backend conectado en el puerto 4000");
});

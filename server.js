import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import bcrypt from 'bcrypt';

const app = express();
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'escalinatasalon'
});

app.use(express.json());
app.use(cors());

db.connect(err => {
    if (err) {
        console.error('Error de conexión: ', err);
        return;
    }
    console.log('Conexión a la base de datos establecida');
});

// Obtener usuarios
app.get('/usuarios', (req, res) => {
    const query = 'SELECT * FROM Usuario';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener usuarios: ', err);
            return res.status(500).json({ error: 'Error al obtener los usuarios' });
        }
        res.status(200).json(results);
    });
});

// Endpoint para obtener usuarios con sus roles
app.get('/usuarios-roles', (req, res) => {
    const query = `
      SELECT 
        u.Id,
        u.Nombre,
        u.Apellido,
        u.Telefono,
        u.Email,
        u.Usuario,
        r.Descripcion AS Rol
      FROM 
        usuario u
      JOIN 
        roles r ON u.Rol_id = r.Id
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
    const { Nombre, Apellido, Telefono, Email, Usuario, Contraseña, Rol_id } = req.body;
    if (!Nombre || !Apellido || !Telefono || !Email || !Usuario || !Contraseña || Rol_id === undefined) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const hashedPassword = await bcrypt.hash(Contraseña, 10);
    const query = 'INSERT INTO usuario (Nombre, Apellido, Telefono, Email, Usuario, Contraseña, Rol_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [Nombre, Apellido, Telefono, Email, Usuario, hashedPassword, Rol_id];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al insertar el usuario' });
        }
        res.status(201).json({ id: result.insertId, Nombre, Apellido, Telefono, Email, Rol_id });
    });
});

// Método PUT para actualizar un usuario
app.put('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    const { Nombre, Apellido, Telefono, Email, Usuario, Contraseña, Rol_id } = req.body;

    if (!Nombre || !Apellido || !Telefono || !Email || !Usuario || Rol_id === undefined) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const hashedPassword = Contraseña ? await bcrypt.hash(Contraseña, 10) : undefined;

    const query = `
        UPDATE usuario
        SET Nombre = ?, Apellido = ?, Telefono = ?, Email = ?, Usuario = ?, Contraseña = ?, Rol_id = ?
        WHERE Id = ?
    `;
    const values = [Nombre, Apellido, Telefono, Email, Usuario, hashedPassword || Contraseña, Rol_id, id];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al actualizar el usuario' });
        }
        res.status(200).json({ message: 'Usuario actualizado', id });
    });
});

// Método DELETE para eliminar
app.delete('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM usuario WHERE Id = ?';
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

app.listen(4000, () => {
    console.log("Backend conectado en el puerto 4000");
});
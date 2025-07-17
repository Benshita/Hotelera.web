const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

// Conexión a la base de datos
const conexion = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hotel_db'
});

// =======================
// CRUD de USUARIOS
// =======================

// Obtener todos los usuarios
router.get('/usuarios', async (req, res) => {
  try {
    const [rows] = await conexion.query('SELECT * FROM usuarios');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Crear nuevo usuario
router.post('/usuarios', async (req, res) => {
  const { nombre, correo, contrasena } = req.body;
  try {
    const result = await conexion.query(
      'INSERT INTO usuarios (nombre, correo, contrasena) VALUES (?, ?, ?)',
      [nombre, correo, contrasena]
    );
    res.status(201).json({ mensaje: 'Usuario creado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear usuario' });
  }
});

// Actualizar usuario por ID
router.put('/usuarios/:id', async (req, res) => {
  const id = req.params.id;
  const { nombre, correo, contrasena } = req.body;
  try {
    const [result] = await conexion.query(
      'UPDATE usuarios SET nombre = ?, correo = ?, contrasena = ? WHERE id = ?',
      [nombre, correo, contrasena, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ mensaje: 'Usuario actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
});

// Eliminar usuario por ID
router.delete('/usuarios/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await conexion.query('DELETE FROM usuarios WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
});

module.exports = router;

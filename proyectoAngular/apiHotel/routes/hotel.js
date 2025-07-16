const express = require('express');
const router = express.Router();
const db = require('../db');

// USUARIOS
router.get('/usuarios', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => { if (err) return res.status(500).send(err); res.json(results); });
});
router.post('/usuarios', (req, res) => {
    const { nombre, correo, contraseña } = req.body;
    db.query('INSERT INTO usuarios (nombre, correo, contraseña) VALUES (?, ?, ?)', [nombre, correo, contraseña], (err, result) => {
        if (err) return res.status(500).send(err); res.json({ id: result.insertId, mensaje: 'Usuario creado' });
    });
});
router.put('/usuarios/:id', (req, res) => {
    const { nombre, correo, contraseña } = req.body;
    db.query('UPDATE usuarios SET nombre=?, correo=?, contraseña=? WHERE id=?', [nombre, correo, contraseña, req.params.id], (err) => {
        if (err) return res.status(500).send(err); res.json({ mensaje: 'Usuario actualizado' });
    });
});
router.delete('/usuarios/:id', (req, res) => {
    db.query('DELETE FROM usuarios WHERE id=?', [req.params.id], (err) => {
        if (err) return res.status(500).send(err); res.json({ mensaje: 'Usuario eliminado' });
    });
});

// HABITACIONES
router.get('/habitaciones', (req, res) => {
    db.query('SELECT * FROM habitaciones', (err, results) => { if (err) return res.status(500).send(err); res.json(results); });
});
router.post('/habitaciones', (req, res) => {
    const { numero, tipo, precio } = req.body;
    db.query('INSERT INTO habitaciones (numero, tipo, precio) VALUES (?, ?, ?)', [numero, tipo, precio], (err, result) => {
        if (err) return res.status(500).send(err); res.json({ id: result.insertId, mensaje: 'Habitación creada' });
    });
});
router.put('/habitaciones/:id', (req, res) => {
    const { numero, tipo, precio } = req.body;
    db.query('UPDATE habitaciones SET numero=?, tipo=?, precio=? WHERE id=?', [numero, tipo, precio, req.params.id], (err) => {
        if (err) return res.status(500).send(err); res.json({ mensaje: 'Habitación actualizada' });
    });
});
router.delete('/habitaciones/:id', (req, res) => {
    db.query('DELETE FROM habitaciones WHERE id=?', [req.params.id], (err) => {
        if (err) return res.status(500).send(err); res.json({ mensaje: 'Habitación eliminada' });
    });
});

// RESERVAS
router.get('/reservas', (req, res) => {
    db.query('SELECT * FROM reservas', (err, results) => { if (err) return res.status(500).send(err); res.json(results); });
});
router.post('/reservas', (req, res) => {
    const { id_usuario, id_habitacion, fecha_inicio, fecha_fin } = req.body;
    db.query('INSERT INTO reservas (id_usuario, id_habitacion, fecha_inicio, fecha_fin) VALUES (?, ?, ?, ?)', [id_usuario, id_habitacion, fecha_inicio, fecha_fin], (err, result) => {
        if (err) return res.status(500).send(err); res.json({ id: result.insertId, mensaje: 'Reserva creada' });
    });
});
router.put('/reservas/:id', (req, res) => {
    const { id_usuario, id_habitacion, fecha_inicio, fecha_fin } = req.body;
    db.query('UPDATE reservas SET id_usuario=?, id_habitacion=?, fecha_inicio=?, fecha_fin=? WHERE id=?', [id_usuario, id_habitacion, fecha_inicio, fecha_fin, req.params.id], (err) => {
        if (err) return res.status(500).send(err); res.json({ mensaje: 'Reserva actualizada' });
    });
});
router.delete('/reservas/:id', (req, res) => {
    db.query('DELETE FROM reservas WHERE id=?', [req.params.id], (err) => {
        if (err) return res.status(500).send(err); res.json({ mensaje: 'Reserva eliminada' });
    });
});

// PAGOS
router.get('/pagos', (req, res) => {
    db.query('SELECT * FROM pagos', (err, results) => { if (err) return res.status(500).send(err); res.json(results); });
});
router.post('/pagos', (req, res) => {
    const { id_reserva, monto, fecha_pago } = req.body;
    db.query('INSERT INTO pagos (id_reserva, monto, fecha_pago) VALUES (?, ?, ?)', [id_reserva, monto, fecha_pago], (err, result) => {
        if (err) return res.status(500).send(err); res.json({ id: result.insertId, mensaje: 'Pago creado' });
    });
});
router.put('/pagos/:id', (req, res) => {
    const { id_reserva, monto, fecha_pago } = req.body;
    db.query('UPDATE pagos SET id_reserva=?, monto=?, fecha_pago=? WHERE id=?', [id_reserva, monto, fecha_pago, req.params.id], (err) => {
        if (err) return res.status(500).send(err); res.json({ mensaje: 'Pago actualizado' });
    });
});
router.delete('/pagos/:id', (req, res) => {
    db.query('DELETE FROM pagos WHERE id=?', [req.params.id], (err) => {
        if (err) return res.status(500).send(err); res.json({ mensaje: 'Pago eliminado' });
    });
});

module.exports = router;
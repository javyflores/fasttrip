// backend/controllers/userController.js
const db = require('../models/db');
const { registerUser } = require('../models/userModel');

// 1. Obtener todos los usuarios (opcional)
async function getUsers(req, res) {
  try {
    const result = await db.query('SELECT * FROM usuarios');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener usuarios:', err.message);
    res.status(500).json({ error: err.message });
  }
}

// 2. Registrar usuario directamente (opcional para otros flujos)
async function register(req, res) {
  const userData = req.body;

  try {
    const newUser = await registerUser(userData);
    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.error('Error al registrar usuario:', error.message);
    res.status(500).json({ success: false, message: 'Error al registrar usuario', error: error.message });
  }
}

// 3. Generar solicitud de registro público (usado por RegisterUser.jsx)
async function requestRegistration(req, res) {
  const { nombre, apellido, email, telefono, tipo_usuario } = req.body;

  if (!nombre || !apellido || !email || !telefono || !tipo_usuario) {
    return res.status(400).json({
      success: false,
      message: 'Todos los campos son obligatorios'
    });
  }

  try {
    const response = await registerUser({
      nombre,
      apellido,
      email,
      telefono,
      tipo_usuario
    });

    if (response.success) {
      return res.status(201).json({
        success: true,
        message: 'Solicitud enviada. Será revisada por el administrador.',
        data: response.data
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'No se pudo procesar la solicitud'
      });
    }
  } catch (error) {
    console.error('Error al procesar solicitud:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Hubo un problema al enviar tu solicitud',
      error: error.message
    });
  }
}

module.exports = {
  getUsers,
  register,
  requestRegistration
};
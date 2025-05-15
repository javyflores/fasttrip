// backend/controllers/userController.js
const db = require('../models/db');
const { registerUser } = require('../models/user.model');

// Función para obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM usuarios');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Función para registrar un nuevo usuario
const register = async (req, res) => {
  const userData = req.body;

  try {
    const newUser = await registerUser(userData);
    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al registrar usuario' });
  }
};

// Exportamos ambas funciones en el mismo module.exports
module.exports = {
  getUsers,
  register
};
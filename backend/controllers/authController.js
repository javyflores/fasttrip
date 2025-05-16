// backend/controllers/authController.js
const { findUserByEmail } = require('../models/user');

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Faltan credenciales' });
  }

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    // En producción usa bcrypt.compare()
    if (user.password !== password) {
      return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
    }

    res.json({
      success: true,
      user
    });

  } catch (error) {
    console.error('Error al iniciar sesión:', error.message);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
}

module.exports = { login };
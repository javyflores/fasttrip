// backend/controllers/authController.js
const { findUserByEmail } = require('../models/user');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    
    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, message: 'Email o contraseña incorrectos' });
    }

    // En un futuro usar JWT aquí
    res.json({
      success: true,
      user: {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        tipo_usuario: user.tipo_usuario
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
};

module.exports = { login };
// backend/controllers/adminController.js

const { pool } = require('../models/db');
const { getRegistrationRequests } = require('../models/userModel');

// 1. Obtener todas las solicitudes pendientes
const fetchRegistrationRequests = async (req, res) => {
  const { success, data, message } = await getRegistrationRequests();

  if (!success) {
    return res.status(500).json({ success: false, message });
  }

  res.json({ success: true, requests: data });
};

// 2. Aprobar una solicitud y crear el usuario en la tabla 'usuarios'
async function requestRegistration(req, res) {
  const { id_registro } = req.params;

  try {
    const solicitud = await pool.query(
      'SELECT * FROM newregistro WHERE id_registro = $1 AND estado_registro = $2',
      [id_registro, 'pendiente']
    );

    if (!solicitud.rows.length) {
      return res.status(404).json({
        success: false,
        message: 'Solicitud no encontrada o ya procesada'
      });
    }

    const userData = solicitud.rows[0];

    // Insertar en tabla usuarios
    const newUser = await pool.query(
      'INSERT INTO usuarios (nombre, apellido, email, password, telefono, tipo_usuario) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [
        userData.nombre,
        userData.apellido,
        userData.email,
        'contraseña_temporal_123', // En producción usa bcrypt.hash()
        userData.telefono,
        userData.tipo_usuario
      ]
    );

    // Actualizar estado en newregistro
    await pool.query(
      'UPDATE newregistro SET estado_registro = $1 WHERE id_registro = $2',
      ['aprobado', id_registro]
    );

    res.json({
      success: true,
      message: `Usuario ${userData.nombre} ha sido registrado.`,
      user: newUser.rows[0]
    });

  } catch (error) {
    console.error('Error al aprobar usuario:', error.message);
    res.status(500).json({ success: false, message: 'Error al aprobar registro' });
  }
}

module.exports = {
  fetchRegistrationRequests,
  approveRegistration: requestRegistration // Exportamos con el nuevo nombre
};